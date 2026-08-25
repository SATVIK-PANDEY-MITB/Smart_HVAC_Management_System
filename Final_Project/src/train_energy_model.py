import pandas as pd
import numpy as np
import joblib
import warnings

from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)

warnings.filterwarnings("ignore")


print("=" * 60)
print("Loading datasets...")
print("=" * 60)

from pathlib import Path

# Project root directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Datasets directory
DATASET_DIR = BASE_DIR / "datasets"

# Building Genome dataset directory
GENOME_DIR = DATASET_DIR / "Building_Genome"
electricity = pd.read_csv(GENOME_DIR / "electricity_cleaned.csv")
metadata = pd.read_csv(GENOME_DIR / "metadata.csv")
weather = pd.read_csv(GENOME_DIR / "weather.csv")

print("Electricity:", electricity.shape)
print("Metadata   :", metadata.shape)
print("Weather    :", weather.shape)

print(GENOME_DIR)

print("\nRemoving completely empty building columns...")

before_cols = electricity.shape[1]

electricity = electricity.dropna(axis=1, how="all")

after_cols = electricity.shape[1]

print(f"Columns before : {before_cols}")
print(f"Columns after  : {after_cols}")
print(f"Removed        : {before_cols - after_cols}")

print("\nRemoving sparse building columns...")

valid_counts = electricity.notna().sum()

keep_columns = valid_counts[valid_counts >= 100].index

electricity = electricity[keep_columns]

print("New Shape:", electricity.shape)

print("\nChecking remaining missing values...\n")

missing = electricity.isnull().sum().sort_values(ascending=False)

print(missing.head(10))

print("\nConverting electricity dataset to long format...")

electricity_long = electricity.melt(
    id_vars="timestamp",
    var_name="building_id",
    value_name="meter_reading"
)

print("✓ Conversion Completed")
print("Shape:", electricity_long.shape)
print(electricity_long.head())

print("\nRemoving rows with missing meter readings...")

before = electricity_long.shape[0]

electricity_long = electricity_long.dropna(subset=["meter_reading"])

after = electricity_long.shape[0]

print(f"Rows before : {before}")
print(f"Rows after  : {after}")
print(f"Rows removed: {before - after}")

print("\nConverting timestamps...")

electricity_long["timestamp"] = pd.to_datetime(
    electricity_long["timestamp"],
    dayfirst=True
)

weather["timestamp"] = pd.to_datetime(weather["timestamp"])

print("✓ Timestamp conversion completed")
print(electricity_long.dtypes)

print(electricity.isnull().sum().head())

# ============================================================
# STEP 7: Merge Electricity with Metadata
# ============================================================

print("\n" + "=" * 60)
print("Merging electricity data with metadata...")
print("=" * 60)

master_df = electricity_long.merge(
    metadata,
    on="building_id",
    how="left"
)

print("✓ Metadata merged successfully")
print(f"Master Dataset Shape : {master_df.shape}")

print("\nMissing Site IDs:", master_df["site_id"].isnull().sum())

# ============================================================
# STEP 8: Merge Weather Data
# ============================================================

print("\n" + "=" * 60)
print("Converting timestamps...")
print("=" * 60)

master_df["timestamp"] = pd.to_datetime(master_df["timestamp"], dayfirst=True)
weather["timestamp"] = pd.to_datetime(weather["timestamp"])

print("✓ Timestamp conversion completed")

print("\n" + "=" * 60)
print("Merging Weather Data...")
print("=" * 60)

master_df = master_df.merge(
    weather,
    on=["timestamp", "site_id"],
    how="left"
)

print("✓ Weather merged successfully")
print(f"Master Dataset Shape : {master_df.shape}")

# ============================================================
# STEP 9: Verify Merge
# ============================================================

print("\n" + "=" * 60)
print("Checking merged dataset...")
print("=" * 60)

print(f"Rows    : {master_df.shape[0]}")
print(f"Columns : {master_df.shape[1]}")

weather_columns = [
    "airTemperature",
    "cloudCoverage",
    "dewTemperature",
    "windSpeed"
]

print("\nMissing values in weather columns:")

for col in weather_columns:
    print(f"{col:<20}: {master_df[col].isnull().sum()}")


# ============================================================
# STEP 10: Feature Engineering
# ============================================================

print("\n" + "=" * 60)
print("Performing Feature Engineering...")
print("=" * 60)

# Convert timestamp to datetime (safety check)
master_df["timestamp"] = pd.to_datetime(master_df["timestamp"])

# Extract time-based features
master_df["hour"] = master_df["timestamp"].dt.hour
master_df["day"] = master_df["timestamp"].dt.day
master_df["month"] = master_df["timestamp"].dt.month
master_df["day_of_week"] = master_df["timestamp"].dt.dayofweek
master_df["week_of_year"] = master_df["timestamp"].dt.isocalendar().week.astype(int)

# Weekend Feature
master_df["is_weekend"] = master_df["day_of_week"].isin([5, 6]).astype(int)

# Building Age
master_df["building_age"] = 2026 - master_df["yearbuilt"]

print("✓ Feature Engineering Completed")

print("\nNew Features Added:")
print([
    "hour",
    "day",
    "month",
    "day_of_week",
    "week_of_year",
    "is_weekend",
    "building_age"
])

print("\nCurrent Dataset Shape:", master_df.shape)

# ============================================================
# STEP 11: Final Data Cleaning
# ============================================================

print("\n" + "=" * 60)
print("Performing Final Data Cleaning...")
print("=" * 60)

# Drop columns that are not useful for prediction
master_df.drop(columns=["timestamp", "yearbuilt"], inplace=True)

# Fill numerical missing values with median
numeric_columns = master_df.select_dtypes(include=["int64", "float64"]).columns

for col in numeric_columns:
    if master_df[col].isnull().sum() > 0:
        master_df[col].fillna(master_df[col].median(), inplace=True)

# Fill categorical missing values with "Unknown"
categorical_columns = master_df.select_dtypes(include=["object"]).columns

for col in categorical_columns:
    if master_df[col].isnull().sum() > 0:
        master_df[col].fillna("Unknown", inplace=True)

print("✓ Data Cleaning Completed")

# ============================================================
# STEP 12: Verify Dataset
# ============================================================

print("\n" + "=" * 60)
print("Verifying Dataset...")
print("=" * 60)

missing = master_df.isnull().sum()

print("Remaining Missing Values:")
print(missing[missing > 0])

print("\nFinal Shape:", master_df.shape)

print("\nDropping columns with more than 50% missing values...")

threshold = len(master_df) * 0.5

master_df = master_df.dropna(axis=1, thresh=threshold)

print("Remaining Columns:", len(master_df.columns))

print(master_df.isnull().sum()[master_df.isnull().sum() > 0])

# ============================================================
# STEP 13: Fill Remaining Missing Values
# ============================================================

print("\n" + "=" * 60)
print("Filling Remaining Missing Values...")
print("=" * 60)

# Numerical Columns
numeric_columns = master_df.select_dtypes(include=["int64", "float64"]).columns

for col in numeric_columns:
    if master_df[col].isnull().sum() > 0:
        master_df[col].fillna(master_df[col].median(), inplace=True)

# Categorical Columns
categorical_columns = master_df.select_dtypes(include=["object"]).columns

for col in categorical_columns:
    if master_df[col].isnull().sum() > 0:
        master_df[col].fillna("Unknown", inplace=True)

print("✓ Missing values filled successfully")

print("\nRemaining Missing Values:")
print(master_df.isnull().sum()[master_df.isnull().sum() > 0])

# ============================================================
# STEP 14: Define Features and Target
# ============================================================

print("\n" + "=" * 60)
print("Preparing Features and Target...")
print("=" * 60)

# Target Variable
y = master_df["meter_reading"]

# Feature Matrix
X = master_df.drop(columns=["meter_reading"])

print(f"Features Shape : {X.shape}")
print(f"Target Shape   : {y.shape}")

print("\nFeature Columns:")
print(X.columns.tolist())

# ============================================================
# STEP 15: Sample Dataset
# ============================================================

print("\n" + "=" * 60)
print("Sampling Dataset...")
print("=" * 60)

sample_size = 200000

sampled_df = master_df.sample(
    n=sample_size,
    random_state=42
)

X = sampled_df.drop(columns=["meter_reading"])
y = sampled_df["meter_reading"]

print(f"Sampled Dataset Shape : {sampled_df.shape}")
print(f"Training Rows         : {len(sampled_df)}")

# ============================================================
# STEP 16: Train-Test Split
# ============================================================

print("\n" + "=" * 60)
print("Splitting Dataset...")
print("=" * 60)

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print(f"Training Samples : {X_train.shape[0]}")
print(f"Testing Samples  : {X_test.shape[0]}")

# ============================================================
# STEP 17: Build Preprocessing Pipeline
# ============================================================

print("\n" + "=" * 60)
print("Building Preprocessing Pipeline...")
print("=" * 60)

from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OrdinalEncoder
from sklearn.impute import SimpleImputer

categorical_features = X_train.select_dtypes(include=["object"]).columns.tolist()
numerical_features = X_train.select_dtypes(exclude=["object"]).columns.tolist()

print("Categorical Features:", categorical_features)
print("Numerical Features  :", len(numerical_features))

# Numerical preprocessing
numeric_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="median"))
])

# Categorical preprocessing
categorical_transformer = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OrdinalEncoder(handle_unknown="use_encoded_value", unknown_value=-1))
])

# Combined preprocessing
preprocessor = ColumnTransformer([
    ("num", numeric_transformer, numerical_features),
    ("cat", categorical_transformer, categorical_features)
])

print("✓ Preprocessing Pipeline Created")

# ============================================================
# STEP 18: Build Random Forest Pipeline
# ============================================================

print("\n" + "=" * 60)
print("Building Machine Learning Pipeline...")
print("=" * 60)

from sklearn.ensemble import RandomForestRegressor

model = Pipeline([
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(
        n_estimators=100,
        max_depth=20,
        min_samples_leaf=5,
        random_state=42,
        n_jobs=-1
    ))
])

print("✓ Machine Learning Pipeline Created")

# ============================================================
# STEP 19: Train Model
# ============================================================

print("\n" + "=" * 60)
print("Training Random Forest Model...")
print("=" * 60)

model.fit(X_train, y_train)

print("✓ Model Training Completed")

# ============================================================
# STEP 20: Evaluate Model
# ============================================================

print("\n" + "=" * 60)
print("Evaluating Model...")
print("=" * 60)

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)
import numpy as np

# Predictions
y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

# Training Metrics
train_mae = mean_absolute_error(y_train, y_train_pred)
train_rmse = np.sqrt(mean_squared_error(y_train, y_train_pred))
train_r2 = r2_score(y_train, y_train_pred)

# Testing Metrics
test_mae = mean_absolute_error(y_test, y_test_pred)
test_rmse = np.sqrt(mean_squared_error(y_test, y_test_pred))
test_r2 = r2_score(y_test, y_test_pred)

print("\nTraining Results")
print("-" * 40)
print(f"MAE  : {train_mae:.4f}")
print(f"RMSE : {train_rmse:.4f}")
print(f"R²   : {train_r2:.4f}")

print("\nTesting Results")
print("-" * 40)
print(f"MAE  : {test_mae:.4f}")
print(f"RMSE : {test_rmse:.4f}")
print(f"R²   : {test_r2:.4f}")

# ============================================================
# STEP 21: Save Model
# ============================================================

print("\n" + "=" * 60)
print("Saving Model...")
print("=" * 60)

from pathlib import Path
import joblib

MODEL_DIR = BASE_DIR / "models"
MODEL_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODEL_DIR / "best_energy_predictor.pkl"

joblib.dump(model, MODEL_PATH)

print(f"✓ Model Saved Successfully")
print(f"Location: {MODEL_PATH}")

# ============================================================
# STEP 22: Verify Saved Model
# ============================================================

loaded_model = joblib.load(MODEL_PATH)

sample_prediction = loaded_model.predict(X_test.iloc[:5])

print("\nSample Predictions:")
print(sample_prediction)

print("\n✓ Saved model verified successfully")