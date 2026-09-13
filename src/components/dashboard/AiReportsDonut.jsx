import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Maximize2 } from "lucide-react";
import { AI_DONUT_DATA } from "../../data/mockData";

export function AiReportsDonut({ onExpand }) {
  return (
    <div className="ref-card ai-reports-card">
      <div className="ref-card-header">
        <h3>AI Reports</h3>
        <button className="ref-expand-btn" onClick={onExpand} aria-label="Expand AI Reports">
          <Maximize2 size={15} />
        </button>
      </div>

      <div className="donut-content-row">
        {/* DONUT SVG CHART */}
        <div className="donut-chart-wrap">
          <ResponsiveContainer width={150} height={150}>
            <PieChart>
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#9333ea" />
                </linearGradient>
                <pattern id="diagonalHatch" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="6" stroke="#34d399" strokeWidth="2.5" />
                </pattern>
              </defs>
              <Pie
                data={AI_DONUT_DATA}
                cx="50%"
                cy="50%"
                innerRadius={46}
                outerRadius={68}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                <Cell key="c-0" fill="url(#purpleGradient)" />
                <Cell key="c-1" fill="#ec4899" />
                <Cell key="c-2" fill="url(#diagonalHatch)" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* METRICS BREAKDOWN */}
        <div className="donut-legend-col">
          <div className="donut-legend-item">
            <strong className="legend-percent purple">53%</strong>
            <span className="legend-label">Competitors</span>
          </div>

          <div className="donut-legend-item">
            <strong className="legend-percent pink">24%</strong>
            <span className="legend-label">Task Flow</span>
          </div>

          <div className="donut-legend-item">
            <strong className="legend-percent green">23%</strong>
            <span className="legend-label">User Journey</span>
          </div>
        </div>
      </div>
    </div>
  );
}
