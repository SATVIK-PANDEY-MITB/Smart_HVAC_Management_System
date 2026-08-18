from fastapi import APIRouter

from backend.services.simulation_service import get_next_fault_record

router = APIRouter()


@router.get("/simulate/next")
def next_sensor_reading():

    return get_next_fault_record()