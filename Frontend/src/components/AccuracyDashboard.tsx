import { useEffect, useState } from "react";
import { getAccuracy, type ModelAccuracy } from "@/lib/api";
import { TrendingUp, GitBranch, Trees, Loader2, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const modelMeta = [
  { key: "linear_regression" as const, label: "Linear Regression", icon: TrendingUp, color: "hsl(217, 91%, 50%)" },
  { key: "decision_tree" as const, label: "Decision Tree", icon: GitBranch, color: "hsl(160, 84%, 39%)" },
  { key: "random_forest" as const, label: "Random Forest", icon: Trees, color: "hsl(280, 65%, 55%)" },
];

export default function AccuracyDashboard() {
  const [data, setData] = useState<ModelAccuracy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAccuracy()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 text-muted-foreground">
        <Loader2 className="animate-spin mr-2" /> Loading metrics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
        <AlertCircle className="w-5 h-5" />
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  const r2Data = modelMeta.map((m) => ({
    name: m.label.split(" ").map(w => w[0]).join(""),
    fullName: m.label,
    value: data[m.key]?.R2 ?? 0,
    color: m.color,
  }));

  return (
    <div className="space-y-6">
      {/* R² Chart */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">R² Score Comparison</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={r2Data} barSize={40}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip
                formatter={(val: number) => [val.toFixed(4), "R²"]}
                labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName || ""}
                contentStyle={{ borderRadius: 8, border: "1px solid hsl(220,15%,90%)", fontSize: 13 }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {r2Data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modelMeta.map(({ key, label, icon: Icon, color }) => {
          const m = data[key];
          if (!m) {
            console.warn(`Missing data for ${key}`, data);
            return null;
          }
          return (
            <div key={key} className="glass-card rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5" style={{ color }} />
                <span className="font-semibold text-sm">{label}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MAE</span>
                  <span className="font-mono font-medium">{(m.MAE ?? 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">MSE</span>
                  <span className="font-mono font-medium">{(m.MSE ?? 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">R² Score</span>
                  <span className="font-mono font-medium">{(m.R2 ?? 0).toFixed(4)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
