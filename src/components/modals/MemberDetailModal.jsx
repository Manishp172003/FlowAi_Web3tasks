import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  Award,
  ArrowRight,
  AlertTriangle,
  Sparkles,
  Zap,
  CheckCircle2,
  TrendingDown,
} from "lucide-react";

export function MemberDetailModal({ member, isOpen, onClose, onReassignTask }) {
  if (!isOpen || !member) return null;

  const isOverloaded = member.capacity >= 90;
  const capacityColor = isOverloaded
    ? "#ec4899"
    : member.capacity > 75
    ? "#f59e0b"
    : "#34d399";

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
          className="modal-card member-modal"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* TOP ACCENT LINE */}
          <div
            className="modal-top-accent"
            style={{
              background: isOverloaded
                ? "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)"
                : "linear-gradient(90deg, #a855f7, #34d399)",
            }}
          />

          {/* HEADER */}
          <div className="modal-header member-modal-header">
            <div className="member-modal-profile">
              <div
                className="member-avatar-large"
                style={{
                  background: member.avatarBg || "rgba(236, 72, 153, 0.2)",
                  color: member.avatarColor || "#f472b6",
                  border: `2px solid ${member.avatarColor || "#f472b6"}`,
                }}
              >
                <span>{member.initials}</span>
                <span className="online-indicator" />
              </div>

              <div className="member-info-col">
                <div className="member-name-row">
                  <h2>{member.name}</h2>
                  <span className={`status-pill ${member.status?.toLowerCase() || "active"}`}>
                    <span className="dot" /> {member.status || "Active"}
                  </span>
                </div>
                <p className="member-modal-role">{member.role}</p>

                <div className="member-status-row">
                  <span className={`risk-pill ${member.burnoutRisk?.toLowerCase() || "high"}`}>
                    <AlertTriangle size={12} />
                    AI Risk: {member.burnoutRisk}
                  </span>
                  <span className="telemetry-pill">
                    <Zap size={12} />
                    Flow Velocity: {member.score}%
                  </span>
                </div>
              </div>
            </div>

            <button className="icon-button close-btn" onClick={onClose} aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          {/* BODY */}
          <div className="modal-body member-modal-body">
            {/* WORKLOAD GAUGE */}
            <div className="workload-summary-box">
              <div className="workload-header">
                <div>
                  <span className="section-eyebrow">CURRENT CAPACITY LOAD</span>
                  <div className="capacity-title-row">
                    <h3 className="capacity-stat-number" style={{ color: capacityColor }}>
                      {member.capacity}%
                    </h3>
                    <span className="capacity-stat-label">Active Workload</span>
                  </div>
                </div>

                <div className="workload-stat-chip" style={{ borderColor: capacityColor }}>
                  <span className="pulse-dot" style={{ backgroundColor: capacityColor }} />
                  {100 - member.capacity}% bandwidth available
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="capacity-bar-large">
                <motion.div
                  className="capacity-fill-large"
                  initial={{ width: 0 }}
                  animate={{ width: `${member.capacity}%` }}
                  transition={{ duration: 0.85, ease: "easeOut" }}
                  style={{
                    background: isOverloaded
                      ? "linear-gradient(90deg, #a855f7 0%, #ec4899 70%, #ef4444 100%)"
                      : "linear-gradient(90deg, #a855f7 0%, #34d399 100%)",
                  }}
                />
              </div>

              <div className="capacity-benchmarks">
                <span>0%</span>
                <span>50% Optimal</span>
                <span className="benchmark-danger">85% Limit</span>
                <span>100%</span>
              </div>

              {/* 3 METRIC TILES */}
              <div className="capacity-metrics-row">
                <div className="c-metric-card">
                  <span className="c-label">Tasks in Flight</span>
                  <strong className="c-value">{member.tasks}</strong>
                  <span className="c-subtext">Active sprint tickets</span>
                </div>
                <div className="c-metric-card">
                  <span className="c-label">Quality Score</span>
                  <strong className="c-value text-emerald">{member.score}%</strong>
                  <span className="c-subtext">+4% vs peer baseline</span>
                </div>
                <div className="c-metric-card">
                  <span className="c-label">Cycle Time</span>
                  <strong className="c-value text-violet">2.1 Days</strong>
                  <span className="c-subtext">-18% faster delivery</span>
                </div>
              </div>
            </div>

            {/* AI PRESCRIPTIVE REBALANCE RECOMMENDATION */}
            {isOverloaded && (
              <div className="ai-rebalance-alert-box">
                <div className="alert-icon-wrap">
                  <Sparkles size={16} />
                </div>
                <div className="alert-text-wrap">
                  <h4>AI Workload Rebalance Recommendation</h4>
                  <p>
                    {member.name} is tracking at <strong>{member.capacity}% capacity</strong> with high bottleneck risk.
                    Rebalancing 1 ticket to <strong>Priya Sharma</strong> reduces load to <strong>84%</strong> and averts delivery delays.
                  </p>
                </div>
                <button
                  className="ai-quick-action-btn"
                  onClick={() => {
                    if (onReassignTask) onReassignTask(member);
                    onClose();
                  }}
                >
                  <TrendingDown size={14} />
                  <span>Auto-Balance</span>
                </button>
              </div>
            )}

            {/* ACTIVE SPRINT TICKETS */}
            <div className="member-section">
              <div className="section-header-row">
                <span className="section-eyebrow">ACTIVE SPRINT TICKETS</span>
                <span className="section-count-badge">{member.activeTickets?.length || 0} tickets</span>
              </div>

              <div className="modal-ticket-list">
                {member.activeTickets?.map((ticket) => {
                  const isUrgent = ticket.priority?.toLowerCase() === "urgent";
                  return (
                    <div key={ticket.id} className={`modal-ticket-item ${isUrgent ? "urgent-border" : ""}`}>
                      <div className="ticket-left">
                        <span className="ticket-id-badge">{ticket.id}</span>
                        <div className="ticket-title-wrap">
                          <span className="ticket-title">{ticket.title}</span>
                          <span className="ticket-lane">Sprint 24 • High Priority Lane</span>
                        </div>
                      </div>

                      <div className="ticket-meta">
                        <span className={`priority-tag ${ticket.priority?.toLowerCase()}`}>
                          {ticket.priority}
                        </span>
                        <span className="ticket-due">
                          <Clock size={12} />
                          {ticket.due}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* VERIFIED SKILLS */}
            <div className="member-section">
              <div className="section-header-row">
                <span className="section-eyebrow">VERIFIED SKILLS & STACK</span>
                <span className="section-verified-label">
                  <CheckCircle2 size={12} /> Peer Verified
                </span>
              </div>

              <div className="skills-pill-group">
                {member.skills?.map((skill, idx) => (
                  <span key={idx} className="skill-pill">
                    <Award size={13} className="skill-icon" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer member-modal-footer">
            <button className="ref-modal-btn secondary" onClick={onClose}>
              Dismiss
            </button>
            <button
              className="ref-modal-btn primary-gradient"
              onClick={() => {
                if (onReassignTask) onReassignTask(member);
                onClose();
              }}
            >
              <Sparkles size={15} />
              <span>Simulate AI Smart Balance</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
