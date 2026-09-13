import { Maximize2 } from "lucide-react";
import { PASSING_RATE_WAVE } from "../../data/mockData";

export function PassingRateWave({ onExpand }) {
  return (
    <div className="ref-card passing-rate-card">
      <div className="ref-card-header">
        <h3>Passing Rate</h3>
        <button className="ref-expand-btn" onClick={onExpand} aria-label="Expand Passing Rate">
          <Maximize2 size={15} />
        </button>
      </div>

      <div className="passing-rate-body">
        {/* TOP STAT */}
        <div className="passing-stat-top">
          <strong className="rate-val fail">28%</strong>
          <span className="rate-label">Failed</span>
        </div>

        {/* SOUNDWAVE / FREQUENCY BARS */}
        <div className="waveform-container">
          <svg className="waveform-svg" viewBox="0 0 250 50" preserveAspectRatio="none">
            {PASSING_RATE_WAVE.map((bar, index) => {
              const x = index * 10 + 5;
              const height = (bar.val / 100) * 44;
              const y = 25 - height / 2;
              const isAccent = index >= 8 && index <= 16;
              const color = isAccent ? "#f472b6" : index % 2 === 0 ? "#e9d5ff" : "#a855f7";

              return (
                <rect
                  key={index}
                  x={x}
                  y={y}
                  width="2.5"
                  height={Math.max(6, height)}
                  rx="1.25"
                  fill={color}
                  opacity={index % 3 === 0 ? 0.95 : 0.75}
                />
              );
            })}
          </svg>
        </div>

        {/* BOTTOM METRICS */}
        <div className="passing-bottom-row">
          <div className="passing-stat-bottom">
            <strong className="rate-val complete">61%</strong>
            <span className="rate-label">Complete</span>
          </div>

          <div className="passing-stat-bottom right">
            <strong className="rate-val partial">11%</strong>
            <span className="rate-label">Partial</span>
          </div>
        </div>
      </div>
    </div>
  );
}
