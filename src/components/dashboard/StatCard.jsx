import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function StatCard({
  icon,
  label,
  value,
  change,
  extra,
  positive,
  warning,
  danger,
  onClick,
}) {
  return (
    <motion.div
      className={`stat-card ${warning ? "stat-warning" : ""} ${danger ? "stat-danger" : ""}`}
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 25 } }}
      onClick={onClick}
    >
      <div className="stat-top">
        <div
          className={`stat-icon ${warning ? "warning" : ""} ${danger ? "danger" : ""} ${
            positive ? "positive" : ""
          }`}
        >
          {icon}
        </div>

        {change && (
          <span className={`stat-change ${positive ? "positive" : "negative"}`}>
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {change}
          </span>
        )}
      </div>

      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {extra && <div className="stat-extra">{extra}</div>}
    </motion.div>
  );
}
