import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ChevronDown, Sparkles } from "lucide-react";
import { PRODUCTIVITY_DATA } from "../../data/mockData";
import { CustomTooltip } from "../ui/CustomTooltip";

export function ProductivityChart({
  analyticsPeriod,
  setAnalyticsPeriod,
  showAnalyticsMenu,
  setShowAnalyticsMenu,
}) {
  const [metricMode, setMetricMode] = useState("efficiency"); // "efficiency" | "velocity"
  const currentData = PRODUCTIVITY_DATA[analyticsPeriod] || PRODUCTIVITY_DATA["Last 30 days"];

  return (
    <section className="panel productivity-panel">
      <div className="panel-header">
        <div>
          <div className="panel-title-row">
            <h2>Productivity & Velocity Trajectory</h2>
            <span className="ai-benchmark-badge">
              <Sparkles size={12} /> AI Predictive Trend
            </span>
          </div>
          <p>Historical sprint momentum against team baseline target</p>
        </div>

        <div className="chart-header-actions">
          <div className="metric-toggle-group">
            <button
              className={`metric-btn ${metricMode === "efficiency" ? "active" : ""}`}
              onClick={() => setMetricMode("efficiency")}
            >
              Efficiency (%)
            </button>
            <button
              className={`metric-btn ${metricMode === "velocity" ? "active" : ""}`}
              onClick={() => setMetricMode("velocity")}
            >
              Velocity (pts)
            </button>
          </div>

          <div className="dropdown-wrapper">
            <button
              className="date-button"
              onClick={() => setShowAnalyticsMenu(!showAnalyticsMenu)}
              aria-label="Select analytics timeframe"
            >
              <span>{analyticsPeriod}</span>
              <ChevronDown
                size={14}
                style={{
                  transform: showAnalyticsMenu ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 150ms ease",
                }}
              />
            </button>

            {showAnalyticsMenu && (
              <>
                <div
                  className="dropdown-backdrop"
                  onClick={() => setShowAnalyticsMenu(false)}
                />
                <div className="dropdown-menu analytics-menu">
                  {["Last 7 days", "Last 30 days", "Last 3 months"].map((item) => (
                    <button
                      key={item}
                      className={analyticsPeriod === item ? "active" : ""}
                      onClick={() => {
                        setAnalyticsPeriod(item);
                        setShowAnalyticsMenu(false);
                      }}
                    >
                      <span>{item}</span>
                      {analyticsPeriod === item && <span className="dropdown-check">✓</span>}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="chart-meta-row">
        <div className="chart-highlight-stat">
          <span className="highlight-label">Rolling Average</span>
          <div className="highlight-val-wrap">
            <strong>81.4%</strong>
            <span className="trend-indicator positive">
              <TrendingUp size={14} />
              +18.4% this cycle
            </span>
          </div>
        </div>

        <div className="chart-legend-horizontal">
          <span className="legend-chip">
            <span className="legend-chip-dot primary" /> Delivered Score
          </span>
          <span className="legend-chip">
            <span className="legend-chip-dot baseline" /> Sprint Baseline
          </span>
        </div>
      </div>

      <div className="large-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 15, right: 15, left: -20, bottom: 5 }}>
            <defs>
              <linearGradient id="productivityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c084fc" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="benchmarkFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.06)" />

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255, 255, 255, 0.4)" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "rgba(255, 255, 255, 0.4)" }}
              domain={[50, 100]}
            />

            <Tooltip content={<CustomTooltip unit="%" />} />

            <Area
              type="monotone"
              name="Baseline Target"
              dataKey="benchmark"
              stroke="#34d399"
              strokeWidth={1.75}
              strokeDasharray="4 4"
              fill="url(#benchmarkFill)"
            />

            <Area
              type="monotone"
              name="Delivered Output"
              dataKey="value"
              stroke="#c084fc"
              strokeWidth={3}
              fill="url(#productivityFill)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
