import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { getStats } from "../api/stats";
import { StatsResult } from "../types";
import { InlineLoading } from "./LoadingState";

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card p-4">
      <p className="font-mono text-2xl font-semibold text-text-primary">
        {value.toLocaleString()}
      </p>
      <p className="mt-1 text-xs text-text-muted">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const [stats, setStats] = useState<StatsResult | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getStats(controller.signal)
      .then(setStats)
      .catch(() => setError(true));
    return () => controller.abort();
  }, []);

  if (error) return null;
  if (!stats) return <InlineLoading message="Loading statistics..." />;

  const chartData = stats.skillsByCategory.map((s) => ({ category: s.category, count: s.count }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[repeat(4,minmax(0,1fr))_2fr]">
      <StatCard label="Graph Entities" value={stats.totalNodes} />
      <StatCard label="Relationships" value={stats.totalRelationships} />
      <StatCard label="Skills" value={stats.nodesByLabel.find((n) => n.label === "Skill")?.count ?? 0} />
      <StatCard
        label="Job Roles"
        value={stats.nodesByLabel.find((n) => n.label === "JobRole")?.count ?? 0}
      />
      <div className="card p-4 lg:row-span-1">
        <p className="mb-2 label-mono">Skills by Category</p>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2430" vertical={false} />
            <XAxis
              dataKey="category"
              tick={{ fill: "#8A93A6", fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: "#1E2430" }}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={40}
            />
            <YAxis tick={{ fill: "#8A93A6", fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: "#11151D",
                border: "1px solid #1E2430",
                borderRadius: 8,
                fontSize: 12,
              }}
              cursor={{ fill: "rgba(79,209,197,0.08)" }}
            />
            <Bar dataKey="count" fill="#4FD1C5" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
