from fastapi import APIRouter, HTTPException, Path
from schemas import AccuracyResponse, ModelMetrics
from ml.accuracy import get_accuracy_report

router = APIRouter(prefix="/accuracy", tags=["Model Accuracy"])


@router.get(
    "/all",
    response_model=AccuracyResponse,
    summary="Get accuracy metrics for ALL models",
    description="Returns MAE, MSE, and R² score for all three trained models.",
)
def all_accuracy():
    try:
        report = get_accuracy_report()
        return AccuracyResponse(
            linear_regression=ModelMetrics(**report["linear_regression"]),
            decision_tree=ModelMetrics(**report["decision_tree"]),
            random_forest=ModelMetrics(**report["random_forest"]),
        )
    except FileNotFoundError as e:
        raise HTTPException(status_code=503, detail=str(e))
