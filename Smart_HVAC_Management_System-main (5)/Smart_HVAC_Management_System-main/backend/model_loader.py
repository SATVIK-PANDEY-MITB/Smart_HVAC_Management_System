import joblib
from backend.config import FAULT_MODEL_PATH, ENERGY_MODEL_PATH

print("Loading trained models...")
print("-" * 50)

fault_model = joblib.load(FAULT_MODEL_PATH)
print("✓ Fault Detection Model Loaded")

energy_model = joblib.load(ENERGY_MODEL_PATH)
print("✓ Energy Prediction Model Loaded")

print("-" * 50)
print("✓ All Models Loaded Successfully")


def get_fault_model():
    return fault_model


def get_energy_model():
    return energy_model