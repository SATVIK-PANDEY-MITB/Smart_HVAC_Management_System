from fastapi import APIRouter

from backend.schemas import FaultPredictionRequest
from backend.services.fault_service import predict_fault

router = APIRouter()


@router.post("/predict/fault")
def fault_prediction(request: FaultPredictionRequest):

    result = predict_fault(request.model_dump())

    return result