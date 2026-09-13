import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  AlertCircle,
  Zap,
  Check,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

export function AiTeamPulse({
  aiExpanded,
  setAiExpanded,
  isRebalanced,
  onApplyRebalance,
  onUndoRebalance,
  onSelectMember,
}) {
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = (e) => {
    e.stopPropagation();
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      onApplyRebalance();
    }, 450);
  };

  const handleUndo = (e) => {
    e.stopPropagation();
    onUndoRebalance();
  };

  return (
    <motion.section
      className={`ai-pulse ${aiExpanded ? "expanded" : ""} ${
        isRebalanced ? "pulse-rebalanced" : ""
      }`}
      layout
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      onClick={() => setAiExpanded(!aiExpanded)}
    >
      <div className="ai-main">
        <div className={`ai-icon ${isRebalanced ? "rebalanced" : ""}`}>
          {isRebalanced ? <ShieldCheck size={22} /> : <Sparkles size={22} />}
        </div>

        <div className="ai-content">
          <div className="ai-title-row">
            <span className="ai-label">
              <Sparkles size={12} className="ai-sparkle-inline" />
              AI TEAM PULSE
            </span>
            <span className={`ai-status ${isRebalanced ? "optimized" : "healthy"}`}>
              {isRebalanced ? "Workload Optimized" : "Sprint Velocity Healthy (82%)"}
            </span>
          </div>

          <h2>
            {isRebalanced
              ? "Bottleneck Resolved: Team workload successfully balanced"
              : "Sprint on track, but 1 critical backend bottleneck detected"}
          </h2>

          <p>
            {isRebalanced
              ? "API Integration was transferred from Rahul (94% load) to Priya (24% free bandwidth). Blocked risk mitigated."
              : "Overall team health is 82%. Most features progress on schedule, but 1 payment API task has been blocked for >48h on Rahul."}
          </p>

          <AnimatePresence>
            {aiExpanded && (
              <motion.div
                className="ai-expanded-content"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                <div className="ai-details-grid">
                  <div
                    className="ai-detail-card warning"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectMember) onSelectMember("rahul");
                    }}
                    title="Inspect Rahul Mehta's bottleneck profile"
                  >
                    <AlertCircle size={16} />
                    <div>
                      <strong>Rahul Mehta (Backend Lead)</strong>
                      <span>Overloaded at 94% capacity with 3 critical blockers. (Click to inspect)</span>
                    </div>
                  </div>

                  <div
                    className="ai-detail-card info"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectMember) onSelectMember("priya");
                    }}
                    title="Inspect Priya Sharma's available capacity profile"
                  >
                    <Zap size={16} />
                    <div>
                      <strong>Priya Sharma (Product Designer)</strong>
                      <span>Has 24% available bandwidth & completed Sprint 24 tokens early. (Click to inspect)</span>
                    </div>
                  </div>
                </div>

                <div className={`ai-recommendation-box ${isRebalanced ? "applied" : ""}`}>
                  <div className="rec-info">
                    <small>AI PROACTIVE REMEDY</small>
                    <div className="rec-title">
                      <strong>Reassign Payment API Integration</strong>
                      <span className="rec-flow">
                        <span>Rahul (94%)</span>
                        <ArrowRight size={13} />
                        <span>Priya (76%)</span>
                      </span>
                    </div>
                  </div>

                  <div className="recommendation-actions">
                    {isRebalanced ? (
                      <div className="rebalanced-status-group">
                        <span className="rebalance-applied-tag">
                          <Check size={14} /> Applied by AI
                        </span>
                        <button
                          className="secondary-button mini"
                          onClick={handleUndo}
                          title="Revert workload change"
                        >
                          <RotateCcw size={12} />
                          <span>Undo</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        className={`primary-button ai-action-btn ${isApplying ? "loading" : ""}`}
                        onClick={handleApply}
                        disabled={isApplying}
                      >
                        {isApplying ? (
                          <span>Rebalancing Workload...</span>
                        ) : (
                          <>
                            <Zap size={14} />
                            <span>Apply 1-Click Balance</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {isRebalanced && (
                  <motion.div
                    className="ai-impact-banner"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <TrendingUp size={14} />
                    <span>
                      Simulated Impact: <strong>+11% sprint completion likelihood</strong> and
                      Rahul's burnout score lowered from High to Moderate.
                    </span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          className={`ai-expand-button ${aiExpanded ? "rotated" : ""}`}
          aria-label="Toggle AI Details"
        >
          <ChevronDown size={19} />
        </button>
      </div>
    </motion.section>
  );
}
