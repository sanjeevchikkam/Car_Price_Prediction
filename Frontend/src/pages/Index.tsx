import { useState } from "react";
import PredictionForm from "@/components/PredictionForm";
import PredictionResults from "@/components/PredictionResults";
import AccuracyDashboard from "@/components/AccuracyDashboard";
import { predictAllModels, type CarInput, type PredictionResult } from "@/lib/api";
import { AlertCircle, Car, BarChart3 } from "lucide-react";

export default function Index() {
  const [results, setResults] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"predict" | "accuracy">("predict");

  const handlePredict = async (data: CarInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await predictAllModels(data);
      setResults(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-primary-foreground">
        <div className="container max-w-6xl py-8 sm:py-12">
          <div className="flex items-center gap-3 mb-2">
            <Car className="w-8 h-8" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Car Price Predictor</h1>
          </div>
          <p className="text-primary-foreground/70 max-w-lg">
            Predict automobile prices using three ML models — Linear Regression, Decision Tree, and Random Forest.
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="container max-w-6xl">
        <div className="flex gap-1 -mt-5 relative z-10">
          {[
            { id: "predict" as const, label: "Prediction", icon: Car },
            { id: "accuracy" as const, label: "Model Accuracy", icon: BarChart3 },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-t-xl text-sm font-medium transition-colors ${
                activeTab === id
                  ? "bg-background text-foreground shadow-sm"
                  : "bg-background/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="container max-w-6xl py-8 space-y-8">
        {activeTab === "predict" && (
          <>
            <PredictionForm onSubmit={handlePredict} isLoading={loading} />

            {error && (
              <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive animate-fade-in">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {results && <PredictionResults results={results} />}
          </>
        )}

        {activeTab === "accuracy" && <AccuracyDashboard />}
      </main>
    </div>
  );
}
