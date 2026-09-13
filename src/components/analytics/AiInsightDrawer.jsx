import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check, TrendingUp, ChevronDown, FileText } from "lucide-react";

export function AiInsightDrawer({
  showInsight,
  setShowInsight,
  onOpenReportGenerator,
}) {
  return (
    <section className={`panel insight-panel ${showInsight ? "insight-expanded" : ""}`}>
      <div className="insight-top">
        <div className="insight-icon">
          <Sparkles size={21} />
        </div>

        <div className="insight-top-text">
          <span className="ai-label">AI PREDICTIVE INTELLIGENCE</span>
          <h2>Efficiency inflection detected in Sprint 24</h2>
          <span className="insight-confidence">Confidence: 96.4% • Based on 148 commits</span>
        </div>

        <button
          className="icon-button insight-toggle-btn"
          onClick={() => setShowInsight(!showInsight)}
          aria-label="Toggle details"
        >
          <ChevronDown
            size={18}
            style={{
              transform: showInsight ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 250ms ease",
            }}
          />
        </button>
      </div>

      <div className="insight-body">
        <p>
          Team output surged by <strong>18.4%</strong> over the rolling 30-day window. Automated
          git flow tracking indicates task handoff latency between Design and Frontend dropped from 6.8h to 4.2h.
        </p>

        <div className="insight-highlight">
          <TrendingUp size={18} />
          <div>
            <strong>Primary Driver: Design System Tokens</strong>
            <p>Direct export from Figma tokens into CSS variables eliminated 85% of visual QA back-and-forth.</p>
          </div>
        </div>

        <AnimatePresence>
          {showInsight && (
            <motion.div
              className="insight-details"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div className="detail-item">
                <Check size={16} />
                <span>Code review cycle time contracted by 22% across 38 PRs.</span>
              </div>

              <div className="detail-item">
                <Check size={16} />
                <span>Backend API timeout bottlenecks resolved with zero regression.</span>
              </div>

              <div className="detail-item">
                <Check size={16} />
                <span>Priya Sharma maintained a 92% quality score with zero bug returns.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="insight-action-row">
          <button
            className="text-button inline-toggle"
            onClick={() => setShowInsight(!showInsight)}
          >
            {showInsight ? "Collapse telemetry details" : "Expand telemetry details"}
          </button>

          <button
            className="primary-button ai-report-trigger-btn"
            onClick={onOpenReportGenerator}
          >
            <FileText size={14} />
            <span>Generate Executive Report</span>
          </button>
        </div>
      </div>
    </section>
  );
}
