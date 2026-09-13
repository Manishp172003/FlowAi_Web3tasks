import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Copy,
  Check,
  Download,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { AI_REPORT_PREVIEW } from "../../data/mockData";

export function ReportGeneratorModal({ isOpen, onClose, onShowToast }) {
  const [step, setStep] = useState("generating"); // "generating" | "ready"
  const [copied, setCopied] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  const loadingPhrases = [
    "Analyzing 38 closed sprint stories & pull requests...",
    "Computing cycle time delta vs Sprint 23 baseline...",
    "Evaluating contributor capacity & burnout risk factors...",
    "Synthesizing executive AI recommendations...",
  ];

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev < loadingPhrases.length - 1 ? prev + 1 : prev));
    }, 700);

    const timer = setTimeout(() => {
      setStep("ready");
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [isOpen, loadingPhrases.length]);

  if (!isOpen) return null;

  const handleCopy = () => {
    const reportText = `${AI_REPORT_PREVIEW.sprint}
Velocity Score: ${AI_REPORT_PREVIEW.velocityScore}
Summary: ${AI_REPORT_PREVIEW.summary}
Recommendations:
${AI_REPORT_PREVIEW.recommendations.map((r, i) => `${i + 1}. ${r}`).join("\n")}`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    if (onShowToast) {
      onShowToast({
        type: "success",
        title: "Report Copied",
        message: "Executive sprint summary copied to clipboard.",
      });
    }
  };

  const handleExport = () => {
    if (onShowToast) {
      onShowToast({
        type: "success",
        title: "Export Initiated",
        message: "FlowAI_Sprint24_Report.pdf prepared for download.",
      });
    }
    onClose();
  };

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
          className="modal-card report-modal"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", stiffness: 350, damping: 26 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <div className="report-header-left">
              <div className="report-badge">
                <Sparkles size={14} />
                <span>AI Automated Synthesis</span>
              </div>
              <h2>Sprint 24 Executive Intelligence Report</h2>
              <span className="report-subtext">Cycle: Sep 01 – Sep 14, 2026 • Real-time Git & Linear Sync</span>
            </div>
            <button className="icon-button close-btn" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>

          <div className="modal-body report-body">
            {step === "generating" ? (
              <div className="generating-container">
                <div className="generating-spinner">
                  <Sparkles size={28} className="spin-icon" />
                </div>
                <h3>Synthesizing Sprint Intelligence...</h3>
                <p className="generating-caption">{loadingPhrases[loadingTextIndex]}</p>
                <div className="generating-progress">
                  <motion.div
                    className="generating-progress-fill"
                    initial={{ width: "10%" }}
                    animate={{ width: "95%" }}
                    transition={{ duration: 2.3, ease: "easeInOut" }}
                  />
                </div>
              </div>
            ) : (
              <motion.div
                className="report-content-animated"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* EXECUTIVE SUMMARY */}
                <div className="report-summary-card">
                  <div className="summary-title-row">
                    <h4>Executive Summary</h4>
                    <span className="score-pill positive">{AI_REPORT_PREVIEW.velocityScore}</span>
                  </div>
                  <p>{AI_REPORT_PREVIEW.summary}</p>
                </div>

                {/* KEY FINDINGS GRID */}
                <div className="report-findings-grid">
                  {AI_REPORT_PREVIEW.keyFindings.map((finding, idx) => (
                    <div key={idx} className="finding-card">
                      <span className="finding-label">{finding.metric}</span>
                      <strong className="finding-val">{finding.value}</strong>
                      <span className={`finding-trend ${finding.status}`}>
                        {finding.status === "positive" ? <TrendingUp size={12} /> : <AlertTriangle size={12} />}
                        {finding.trend}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ACTIONABLE RECOMMENDATIONS */}
                <div className="report-recs-section">
                  <h4>AI Prescriptive Recommendations</h4>
                  <div className="report-recs-list">
                    {AI_REPORT_PREVIEW.recommendations.map((rec, idx) => (
                      <div key={idx} className="report-rec-item">
                        <span className="rec-num">0{idx + 1}</span>
                        <p>{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {step === "ready" && (
            <div className="modal-footer report-footer">
              <button className="ref-modal-btn secondary" onClick={handleCopy}>
                {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                <span>{copied ? "Copied!" : "Copy Summary"}</span>
              </button>

              <button className="ref-modal-btn primary-gradient" onClick={handleExport}>
                <Download size={14} />
                <span>Export PDF Report</span>
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
