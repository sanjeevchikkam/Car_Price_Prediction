from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.user_predict import router as predict_router
from routes.model_accuracy import router as accuracy_router



app = FastAPI(
    title="Car Price Prediction API",
    description=(
        "Predicts automobile prices using Linear Regression, "
        "Decision Tree, and Random Forest models trained on the "
        "UCI Automobile dataset.\n\n"
        "**First time setup:** Run `python -m ml.train` to train and save models."
    ),
    version="1.0.0",
    contact={"name": "ML Engineer"},
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router)
app.include_router(accuracy_router)

@app.get("/", tags=["Health"])
def root():
    return {
        "status": "ok",
        "message": "Car Price Prediction API is running.",
    }
