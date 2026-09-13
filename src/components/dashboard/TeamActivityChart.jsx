import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, ChevronDown } from "lucide-react";
import { ACTIVITY_DATA } from "../../data/mockData";
import { CustomTooltip } from "../ui/CustomTooltip";

export function TeamActivityChart({ period, setPeriod, showPeriodMenu, setShowPeriodMenu }) {
  const currentData = ACTIVITY_DATA[period] || ACTIVITY_DATA["This week"];

  return (
    <section className="panel chart-panel">
      <div className="panel-header">
        <div>
          <h2>Team Activity & Output</h2>
          <p>Real-time delivery momentum across repositories</p>
        </div>

        <div className="dropdown-wrapper">
          <button
            className="dropdown-button"
            onClick={() => setShowPeriodMenu(!showPeriodMenu)}
            aria-label="Select period"
          >
            {period}
            <ChevronDown size={14} />
          </button>

          {showPeriodMenu && (
            <div className="dropdown-menu">
              {["Today", "This week", "This month"].map((item) => (
                <button
                  key={item}
                  className={period === item ? "active" : ""}
                  onClick={() => {
                    setPeriod(item);
                    setShowPeriodMenu(false);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="chart-score-wrap">
        <div className="chart-score">
          <strong>84%</strong>
          <span className="trend-badge positive">
            <TrendingUp size={13} />
            +6.8% vs last cycle
          </span>
        </div>
        <div className="chart-legend">
          <span className="legend-item">
            <span className="legend-dot actual" /> Actual Output
          </span>
          <span className="legend-item">
            <span className="legend-dot planned" /> Benchmark
          </span>
        </div>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#635bff" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#635bff" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="plannedFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#19a974" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#19a974" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.7} />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "var(--muted)" }}
            />
            <YAxis hide domain={[0, 100]} />

            <Tooltip content={<CustomTooltip unit="%" />} />

            <Area
              type="monotone"
              name="Planned Target"
              dataKey="planned"
              stroke="#19a974"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              fill="url(#plannedFill)"
            />
            <Area
              type="monotone"
              name="Actual Output"
              dataKey="value"
              stroke="#635bff"
              strokeWidth={2.5}
              fill="url(#activityFill)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
