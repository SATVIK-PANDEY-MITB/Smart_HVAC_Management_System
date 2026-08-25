import pandas as pd
from pathlib import Path
import json

# ============================================================
# Project Paths
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent
DATASET_DIR = BASE_DIR / "datasets" / "Building_Genome"

# ============================================================
# Load Datasets
# ============================================================

electricity = pd.read_csv(DATASET_DIR / "electricity_cleaned.csv")
metadata = pd.read_csv(DATASET_DIR / "metadata.csv")
weather = pd.read_csv(DATASET_DIR / "weather.csv")

print("Datasets Loaded Successfully")

# ============================================================
# Clean Electricity Dataset
# ============================================================

electricity = electricity.dropna(axis=1, how="all")

valid_counts = electricity.notna().sum()
keep_columns = valid_counts[valid_counts >= 100].index
electricity = electricity[keep_columns]

# ============================================================
# Convert to Long Format
# ============================================================

electricity_long = electricity.melt(
    id_vars="timestamp",
    var_name="building_id",
    value_name="meter_reading"
)

electricity_long = electricity_long.dropna(subset=["meter_reading"])

# ============================================================
# Merge Metadata
# ============================================================

master_df = electricity_long.merge(
    metadata,
    on="building_id",
    how="left"
)

master_df["timestamp"] = pd.to_datetime(master_df["timestamp"], dayfirst=True)
weather["timestamp"] = pd.to_datetime(weather["timestamp"])

master_df = master_df.merge(
    weather,
    on=["timestamp", "site_id"],
    how="left"
)

# ============================================================
# Feature Engineering
# ============================================================

master_df["hour"] = master_df["timestamp"].dt.hour
master_df["day"] = master_df["timestamp"].dt.day
master_df["month"] = master_df["timestamp"].dt.month
master_df["day_of_week"] = master_df["timestamp"].dt.dayofweek
master_df["week_of_year"] = master_df["timestamp"].dt.isocalendar().week.astype(int)
master_df["is_weekend"] = master_df["day_of_week"].isin([5, 6]).astype(int)

# ============================================================
# Pick One Valid Sample
# ============================================================

sample = master_df.iloc[0]

request = {
    "building_id": sample["building_id"],
    "site_id": sample["site_id"],
    "building_id_kaggle": sample["building_id_kaggle"],
    "site_id_kaggle": sample["site_id_kaggle"],
    "primaryspaceusage": sample["primaryspaceusage"],
    "sub_primaryspaceusage": sample["sub_primaryspaceusage"],
    "sqm": float(sample["sqm"]),
    "sqft": float(sample["sqft"]),
    "lat": float(sample["lat"]),
    "lng": float(sample["lng"]),
    "timezone": sample["timezone"],
    "electricity": sample["electricity"],
    "airTemperature": float(sample["airTemperature"]),
    "dewTemperature": float(sample["dewTemperature"]),
    "precipDepth1HR": float(sample["precipDepth1HR"]),
    "seaLvlPressure": float(sample["seaLvlPressure"]),
    "windDirection": float(sample["windDirection"]),
    "windSpeed": float(sample["windSpeed"]),
    "hour": int(sample["hour"]),
    "day": int(sample["day"]),
    "month": int(sample["month"]),
    "day_of_week": int(sample["day_of_week"]),
    "week_of_year": int(sample["week_of_year"]),
    "is_weekend": int(sample["is_weekend"])
}

print("\n========== COPY THIS INTO SWAGGER ==========\n")
print(json.dumps(request, indent=4))