import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, UserCheck, ShieldAlert, Sparkles, ArrowUpRight } from "lucide-react";

export function AvatarsModal({ isOpen, onClose, team = [], onSelectMember }) {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filtered = team.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      (m.skills && m.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-card avatars-modal"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", stiffness: 360, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div className="modal-header">
            <div className="modal-title-wrap">
              <div className="rationale-badge">
                <Sparkles size={14} />
                <span>Team Contributor Directory</span>
              </div>
              <h2>Team Avatars & Bandwidth</h2>
              <span className="word-count-tag">
                {team.length} Contributors active across FlowAI squads
              </span>
            </div>
            <button className="icon-button close-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          {/* SEARCH INPUT */}
          <div className="avatars-modal-search">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search by name, role, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>

          {/* ROSTER GRID */}
          <div className="avatars-grid-list">
            {filtered.map((member) => {
              const isOverloaded = member.capacity >= 90;
              return (
                <motion.div
                  key={member.id}
                  className={`avatar-member-card ${isOverloaded ? "overloaded" : ""}`}
                  whileHover={{ y: -2, borderColor: "rgba(192, 132, 252, 0.45)" }}
                  onClick={() => {
                    onSelectMember(member);
                    onClose();
                  }}
                >
                  <div className="am-top-row">
                    <div
                      className="am-avatar-circle"
                      style={{
                        background: member.avatarBg || "rgba(192, 132, 252, 0.2)",
                        color: member.avatarColor || "#ffffff",
                      }}
                    >
                      <span>{member.initials}</span>
                      <span className={`am-status-dot ${member.status.toLowerCase()}`} />
                    </div>

                    <div className="am-name-col">
                      <h4>{member.name}</h4>
                      <span className="am-role-text">{member.role}</span>
                    </div>

                    <div className="am-inspect-icon" title="View contributor profile">
                      <ArrowUpRight size={14} />
                    </div>
                  </div>

                  {/* CAPACITY & BURNOUT */}
                  <div className="am-capacity-row">
                    <div className="am-cap-label">
                      <span>Workload Capacity</span>
                      <strong style={{ color: isOverloaded ? "#f43f5e" : member.capacity > 75 ? "#fbbf24" : "#34d399" }}>
                        {member.capacity}%
                      </strong>
                    </div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${member.capacity}%`,
                          background: isOverloaded
                            ? "linear-gradient(90deg, #fb7185, #e11d48)"
                            : member.capacity > 75
                            ? "linear-gradient(90deg, #fbbf24, #f59e0b)"
                            : "linear-gradient(90deg, #34d399, #10b981)",
                        }}
                      />
                    </div>
                  </div>

                  {/* SKILLS CHIPS */}
                  {member.skills && (
                    <div className="am-skills-row">
                      {member.skills.slice(0, 3).map((sk) => (
                        <span key={sk} className="am-skill-pill">
                          {sk}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="am-skill-more">+{member.skills.length - 3}</span>
                      )}
                    </div>
                  )}

                  {/* ACTION FOOTER */}
                  <div className="am-footer">
                    <span className={`risk-badge ${member.burnoutRisk.toLowerCase()}`}>
                      {member.burnoutRisk === "High" ? <ShieldAlert size={11} /> : <UserCheck size={11} />}
                      {member.burnoutRisk} Burnout Risk
                    </span>
                    <button className="am-view-sheet-btn">
                      <span>Inspect</span>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
