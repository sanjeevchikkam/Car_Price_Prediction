import type { PredictionResult } from "@/lib/api";
import { TrendingUp, GitBranch, Trees } from "lucide-react";

const models = [
  { key: "linear_regression" as const, label: "Linear Regression", icon: TrendingUp, colorClass: "text-chart-linear border-chart-linear/30 bg-chart-linear/5" },
  { key: "decision_tree" as const, label: "Decision Tree", icon: GitBranch, colorClass: "text-chart-tree border-chart-tree/30 bg-chart-tree/5" },
  { key: "random_forest" as const, label: "Random Forest", icon: Trees, colorClass: "text-chart-forest border-chart-forest/30 bg-chart-forest/5" },
];

interface Props {
  results: PredictionResult;
}

export default function PredictionResults({ results }: Props) {
  return (
    <div className="space-y-4 animate-fade-in">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Predicted Prices</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {models.map(({ key, label, icon: Icon, colorClass }) => (
          <div key={key} className={`rounded-xl border-2 p-5 ${colorClass} transition-all`}>
            <div className="flex items-center gap-2 mb-3">
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </div>
            <p className="text-3xl font-bold font-mono tracking-tight">
              ${results[key].toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
