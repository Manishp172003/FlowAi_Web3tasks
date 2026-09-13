import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function TeamPerformanceTable({ team, onSelectMember }) {
  return (
    <section className="panel performance-panel">
      <div className="panel-header">
        <div>
          <h2>Individual Contribution & Burnout Matrix</h2>
          <p>Contributor velocity, sprint output, and AI workload assessment</p>
        </div>

        <span className="matrix-subhead-pill">4 Core Contributors</span>
      </div>

      <div className="performance-list">
        {team.map((member) => {
          const scoreColor = member.score >= 85 ? "var(--green)" : "var(--primary)";

          return (
            <motion.div
              key={member.id}
              className="performance-row"
              whileHover={{ backgroundColor: "var(--bg)" }}
              onClick={() => onSelectMember(member)}
            >
              <div className="performance-person">
                <div
                  className="member-avatar"
                  style={{ backgroundColor: member.avatarBg, color: member.avatarColor }}
                >
                  {member.initials}
                </div>

                <div className="person-details">
                  <strong>{member.name}</strong>
                  <span>{member.role}</span>
                </div>
              </div>

              <div className="performance-tasks">
                <strong>{member.tasks}</strong>
                <span>tasks</span>
              </div>

              <div className="performance-risk">
                <span className={`risk-badge ${member.burnoutRisk.toLowerCase()}`}>
                  {member.burnoutRisk} Risk
                </span>
              </div>

              <div className="performance-score">
                <div className="score-top">
                  <span className="score-label">Efficiency</span>
                  <strong style={{ color: scoreColor }}>{member.score}%</strong>
                </div>

                <div className="progress-track">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${member.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      background:
                        member.score >= 85
                          ? "linear-gradient(90deg, #635bff, #19a974)"
                          : "var(--primary)",
                    }}
                  />
                </div>
              </div>

              <button
                className="icon-button inspect-row-btn"
                aria-label={`Inspect ${member.name}`}
              >
                <ArrowUpRight size={15} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
