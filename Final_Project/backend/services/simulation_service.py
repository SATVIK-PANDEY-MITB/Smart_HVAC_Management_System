from pathlib import Path

import pandas as pd

from backend.model_loader import get_fault_model

# ============================================================
# Project Paths
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent.parent

STREAM_PATH = (
    BASE_DIR
    / "datasets"
    / "demo"
    / "fault_stream.csv"
)

# ============================================================
# Load Demo Dataset
# ============================================================

fault_stream = pd.read_csv(STREAM_PATH)

print("=" * 60)
print("Demo Fault Stream Loaded")
print("=" * 60)
print(f"Rows Loaded : {len(fault_stream)}")

# ============================================================
# Load Fault Detection Model
# ============================================================

fault_model = get_fault_model()

print("✓ Fault Detection Model Loaded")

# ============================================================
# Fault Label Mapping
# ============================================================

FAULT_LABELS = {
    0: "Healthy",
    1: "Fault Detected"
}

# ============================================================
# Global Stream Pointer
# ============================================================

current_index = 0


# ============================================================
# Get Next Sensor Reading
# ============================================================

def get_next_fault_record():

    global current_index

    # --------------------------------------------------------
    # Read Current Row
    # --------------------------------------------------------

    row = fault_stream.iloc[current_index].copy()

    # Save timestamp before removing extra columns
    timestamp = row["Datetime"]

    # Move pointer
    current_index += 1

    if current_index >= len(fault_stream):
        current_index = 0

    # --------------------------------------------------------
    # Prepare Model Input
    # --------------------------------------------------------

    input_df = pd.DataFrame([row])

    # Keep only the features used while training
    input_df = input_df[fault_model.feature_names_in_]

    # --------------------------------------------------------
    # AI Prediction
    # --------------------------------------------------------

    prediction_id = int(fault_model.predict(input_df)[0])

    prediction = FAULT_LABELS[prediction_id]

    # --------------------------------------------------------
    # Prediction Confidence
    # --------------------------------------------------------

    confidence = round(
        float(fault_model.predict_proba(input_df).max()) * 100,
        2
    )

    # --------------------------------------------------------
    # Response
    # --------------------------------------------------------

    return {
        "timestamp": timestamp,
        "prediction": prediction,
        "confidence": confidence,
        "sensor_data": input_df.iloc[0].to_dict(),
    }


# ============================================================
# Local Testing
# ============================================================

if __name__ == "__main__":

    print("\nTesting Simulation Stream...\n")

    for _ in range(5):

        result = get_next_fault_record()

        print("-" * 60)
        print(f"Timestamp  : {result['timestamp']}")
        print(f"Prediction : {result['prediction']}")
        print(f"Confidence : {result['confidence']}%")