from pathlib import Path

# Project Root Directory
BASE_DIR = Path(__file__).resolve().parent.parent

# Models Directory
MODELS_DIR = BASE_DIR / "models"

# Dataset Directory
DATASETS_DIR = BASE_DIR / "datasets"

# Model Paths
FAULT_MODEL_PATH = MODELS_DIR / "best_fault_detector.pkl"
ENERGY_MODEL_PATH = MODELS_DIR / "best_energy_predictor.pkl"