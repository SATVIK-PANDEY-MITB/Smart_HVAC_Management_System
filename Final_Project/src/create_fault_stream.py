from pathlib import Path
import pandas as pd

# ============================================================
# Project Paths
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent

DATASET_DIR = BASE_DIR / "datasets" / "LBNL_RTU"
DEMO_DIR = BASE_DIR / "datasets" / "demo"

DEMO_DIR.mkdir(exist_ok=True)

# ============================================================
# Load Datasets
# ============================================================

healthy = pd.read_csv(DATASET_DIR / "Healthy" / "RTU_sim_baseline.csv")

cond_fouling = pd.read_csv(
    DATASET_DIR / "faults" / "RTU_sim_condfouling20.csv"
)

undercharge = pd.read_csv(
    DATASET_DIR / "faults" / "RTU_sim_undercharge15.csv"
)

evap_fouling = pd.read_csv(
    DATASET_DIR / "faults" / "RTU_sim_evapfouling20.csv"
)

print("✓ All datasets loaded")

# ============================================================
# Create Demo Stream
# ============================================================

fault_stream = pd.concat([
    healthy.iloc[:8],
    cond_fouling.iloc[:5],
    healthy.iloc[8:15],
    undercharge.iloc[:5],
    healthy.iloc[15:22],
    evap_fouling.iloc[:5],
    healthy.iloc[22:35]
], ignore_index=True)

# ============================================================
# Save
# ============================================================

fault_stream.to_csv(
    DEMO_DIR / "fault_stream.csv",
    index=False
)

print("\n✓ Demo fault stream created successfully")
print(f"Rows : {len(fault_stream)}")
print(f"Saved at : {DEMO_DIR / 'fault_stream.csv'}")