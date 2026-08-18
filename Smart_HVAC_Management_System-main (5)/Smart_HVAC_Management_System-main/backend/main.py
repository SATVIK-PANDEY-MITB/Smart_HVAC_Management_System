from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes.fault_routes import router as fault_router
from backend.routes.energy_routes import router as energy_router
from backend.routes.simulation_routes import router as simulation_router

app = FastAPI(
    title="Smart HVAC Management System API",
    version="1.0.0"
)

# Allow Frontend to Access Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(fault_router)
app.include_router(energy_router)
app.include_router(simulation_router)

@app.get("/")
def home():
    return {
        "message": "Smart HVAC Management System API is running successfully!"
    }