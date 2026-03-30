from fastapi import APIRouter, HTTPException, Query
from schemas import CarFeatures, AllModelsPredictionResponse
from ml.predict import predict_all_models

router = APIRouter(prefix="/predict", tags=["Prediction"])


@router.post("/allmodels",response_model=AllModelsPredictionResponse,)
def predict_all(car: CarFeatures):
    try:
        results = predict_all_models(car.to_raw_dict())
        return AllModelsPredictionResponse(**results, currency="USD")
    except FileNotFoundError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

