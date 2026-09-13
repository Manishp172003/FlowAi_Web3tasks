import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChevronDown } from "lucide-react";
import { PROJECT_TIME_DATA } from "../../data/mockData";

export function ProjectTimeChart() {
  const [period, setPeriod] = useState("Last Week");
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="ref-card project-time-card">
      <div className="ref-card-header">
        <h3>Project Time</h3>
        <div className="dropdown-wrapper">
          <button
            className="ref-period-dropdown"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <span>{period}</span>
            <ChevronDown
              size={14}
              style={{
                transform: openMenu ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 150ms ease",
              }}
            />
          </button>
          {openMenu && (
            <>
              <div className="dropdown-backdrop" onClick={() => setOpenMenu(false)} />
              <div className="dropdown-menu">
                {["This Week", "Last Week", "Last Month"].map((item) => (
                  <button
                    key={item}
                    className={period === item ? "active" : ""}
                    onClick={() => {
                      setPeriod(item);
                      setOpenMenu(false);
                    }}
                  >
                    <span>{item}</span>
                    {period === item && <span className="dropdown-check">✓</span>}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="project-time-chart-wrap">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart
            data={PROJECT_TIME_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barSize={28}
          >
            <defs>
              <linearGradient id="barVioletGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d8b4fe" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
              <pattern id="barDiagonalHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#c084fc" strokeWidth="2" opacity="0.6" />
              </pattern>
            </defs>

            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#64748b" }}
              domain={[8, 20]}
              ticks={[10, 12, 14, 16, 18]}
              tickFormatter={(v) => `${v}:00`}
            />

            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="custom-chart-tooltip">
                      <div className="tooltip-label">{label}</div>
                      <div className="tooltip-row">
                        <span className="tooltip-name">Output:</span>
                        <span className="tooltip-value">
                          {payload[0].payload.total}h
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar
              dataKey="tracked"
              stackId="a"
              fill="url(#barVioletGradient)"
              radius={[0, 0, 8, 8]}
            />
            <Bar
              dataKey="planned"
              stackId="a"
              fill="url(#barDiagonalHatch)"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
