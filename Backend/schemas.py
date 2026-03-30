from typing import Literal, Optional
from pydantic import BaseModel, Field



class CarFeatures(BaseModel):
    """All raw car features (mirrors the Automobile_data.csv columns)."""

    symboling: int = Field(..., example=1)
    normalized_losses: Optional[float] = Field(None, alias="normalized-losses", example=120)
    make: str = Field(..., example="toyota")
    fuel_type: str = Field(..., alias="fuel-type", example="gas")
    aspiration: str = Field(..., example="std")
    num_of_doors: str = Field(..., alias="num-of-doors", example="four")
    body_style: str = Field(..., alias="body-style", example="sedan")
    drive_wheels: str = Field(..., alias="drive-wheels", example="fwd")
    engine_location: str = Field(..., alias="engine-location", example="front")
    wheel_base: float = Field(..., alias="wheel-base", example=102.4)
    length: float = Field(..., example=176.6)
    width: float = Field(..., example=66.5)
    height: float = Field(..., example=54.3)
    curb_weight: int = Field(..., alias="curb-weight", example=2337)
    engine_type: str = Field(..., alias="engine-type", example="ohc")
    num_of_cylinders: str = Field(..., alias="num-of-cylinders", example="four")
    engine_size: int = Field(..., alias="engine-size", example=122)
    fuel_system: str = Field(..., alias="fuel-system", example="mpfi")
    bore: Optional[float] = Field(None, example=3.31)
    stroke: Optional[float] = Field(None, example=3.54)
    compression_ratio: float = Field(..., alias="compression-ratio", example=9.0)
    horsepower: Optional[float] = Field(None, example=102)
    peak_rpm: Optional[float] = Field(None, alias="peak-rpm", example=5500)
    city_mpg: int = Field(..., alias="city-mpg", example=24)
    highway_mpg: int = Field(..., alias="highway-mpg", example=30)

    model_config = {"populate_by_name": True}

    def to_raw_dict(self) -> dict:
        """Returns a dict with original hyphenated keys (matching training data)."""
        return {
            "symboling": self.symboling,
            "normalized-losses": self.normalized_losses,
            "make": self.make,
            "fuel-type": self.fuel_type,
            "aspiration": self.aspiration,
            "num-of-doors": self.num_of_doors,
            "body-style": self.body_style,
            "drive-wheels": self.drive_wheels,
            "engine-location": self.engine_location,
            "wheel-base": self.wheel_base,
            "length": self.length,
            "width": self.width,
            "height": self.height,
            "curb-weight": self.curb_weight,
            "engine-type": self.engine_type,
            "num-of-cylinders": self.num_of_cylinders,
            "engine-size": self.engine_size,
            "fuel-system": self.fuel_system,
            "bore": self.bore,
            "stroke": self.stroke,
            "compression-ratio": self.compression_ratio,
            "horsepower": self.horsepower,
            "peak-rpm": self.peak_rpm,
            "city-mpg": self.city_mpg,
            "highway-mpg": self.highway_mpg,
        }


ModelName = Literal["linear_regression", "decision_tree", "random_forest"]


# ── Responses ─────────────────────────────────────────────────────────────────

class PredictionResponse(BaseModel):
    model: str
    predicted_price: float
    currency: str = "USD"


class AllModelsPredictionResponse(BaseModel):
    linear_regression: float
    decision_tree: float
    random_forest: float
    currency: str = "USD"


class ModelMetrics(BaseModel):
    MAE: float
    MSE: float
    R2: float


class AccuracyResponse(BaseModel):
    linear_regression: ModelMetrics
    decision_tree: ModelMetrics
    random_forest: ModelMetrics


class SingleModelAccuracyResponse(BaseModel):
    model: str
    metrics: ModelMetrics