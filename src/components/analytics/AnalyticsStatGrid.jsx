import { Activity, CheckSquare, Zap, Clock3 } from "lucide-react";
import { StatCard } from "../dashboard/StatCard";

export function AnalyticsStatGrid() {
  return (
    <section className="stats-grid analytics-stats">
      <StatCard
        icon={<Activity size={18} />}
        label="Team Productivity"
        value="84%"
        change="8.4%"
        positive
        extra="Peak delivery efficiency"
      />

      <StatCard
        icon={<CheckSquare size={18} />}
        label="Tasks Completed"
        value="126"
        change="14%"
        positive
        extra="38 stories in Sprint 24"
      />

      <StatCard
        icon={<Zap size={18} />}
        label="Sprint Velocity"
        value="+18.4%"
        change="6.2 pts"
        positive
        extra="Ahead of Q3 projection"
      />

      <StatCard
        icon={<Clock3 size={18} />}
        label="Avg. Cycle Time"
        value="2.4 days"
        change="0.6 days"
        positive
        extra="Handoff latency reduced 22%"
      />
    </section>
  );
}
