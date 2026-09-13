export function CustomTooltip({ active, payload, label, unit = "%" }) {
  if (active && payload && payload.length) {
    return (
      <div className="custom-chart-tooltip">
        <div className="tooltip-label">{label}</div>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="tooltip-row">
            <span
              className="tooltip-dot"
              style={{ backgroundColor: entry.color || entry.stroke || "#635bff" }}
            />
            <span className="tooltip-name">{entry.name || "Score"}:</span>
            <span className="tooltip-value">
              {entry.value}
              {unit}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}
