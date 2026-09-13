import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function TeamGrid({ team, onSelectMember, onNavigateToTeam }) {
  return (
    <section className="panel team-panel">
      <div className="panel-header">
        <div>
          <div className="panel-title-row">
            <h2>Team Roster & Live Capacity</h2>
            <span className="live-pulse-badge">
              <span className="pulsing-circle" /> Live Bandwidth
            </span>
          </div>
          <p>Real-time availability and sprint load per contributor</p>
        </div>

        <button className="text-button" onClick={onNavigateToTeam}>
          View all 12 members
        </button>
      </div>

      <div className="team-list">
        {team.map((member) => {
          const isOverloaded = member.capacity >= 90;
          const capacityColor = isOverloaded
            ? "var(--red)"
            : member.capacity >= 80
            ? "var(--amber)"
            : "var(--green)";

          return (
            <motion.div
              key={member.id}
              className="team-member-card"
              whileHover={{ y: -2, borderColor: "var(--primary)" }}
              onClick={() => onSelectMember(member)}
            >
              <div className="team-member-top">
                <div
                  className="member-avatar"
                  style={{ backgroundColor: member.avatarBg, color: member.avatarColor }}
                >
                  {member.initials}
                </div>

                <div className="member-info">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>

                <div className="member-status-chip">
                  <span className={`status-dot ${member.status.toLowerCase()}`} />
                  <span>{member.status}</span>
                </div>
              </div>

              <div className="member-capacity-section">
                <div className="capacity-label-row">
                  <span className="cap-label">Workload</span>
                  <span className="cap-val" style={{ color: capacityColor }}>
                    {member.capacity}%
                  </span>
                </div>
                <div className="capacity-track">
                  <motion.div
                    className="capacity-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${member.capacity}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{ backgroundColor: capacityColor }}
                  />
                </div>
              </div>

              <div className="member-card-footer">
                <span className="member-task-count">{member.tasks} active tasks</span>
                <span className="inspect-link">
                  Inspect <ChevronRight size={13} />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
