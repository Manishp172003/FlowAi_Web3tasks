import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Send,
  Zap,
  ShieldCheck,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import { PAST_REPORTS, REPORT_SCHEDULES } from "../../data/mockData";

export function ReportsView({ onOpenReportGenerator, onShowToast }) {
  const [filter, setFilter] = useState("all"); // "all" | "published" | "archived"
  const [copiedId, setCopiedId] = useState(null);

  const filteredReports = PAST_REPORTS.filter((rep) => {
    if (filter === "published") return rep.status === "Published";
    if (filter === "archived") return rep.status === "Archived";
    return true;
  });

  const handleCopySummary = (rep) => {
    const summary = `${rep.sprint} - ${rep.title}\nScore: ${rep.score} (${rep.scoreChange})\nSummary: ${rep.summary}\nDelivered: ${rep.storiesDelivered}`;
    navigator.clipboard.writeText(summary);
    setCopiedId(rep.id);
    setTimeout(() => setCopiedId(null), 2000);
    if (onShowToast) {
      onShowToast({
        type: "success",
        title: "Summary Copied",
        message: `${rep.sprint} executive summary copied to clipboard.`,
      });
    }
  };

  const handleDownloadReport = (rep) => {
    if (onShowToast) {
      onShowToast({
        type: "success",
        title: "Report Exported",
        message: `${rep.sprint}_Executive_Summary.pdf generated.`,
      });
    }
  };

  return (
    <div className="ref-reports-view">
      {/* PAGE HEADER */}
      <div className="page-heading">
        <div>
          <p className="eyebrow">AUTOMATED SPRINT INTELLIGENCE ARCHIVE</p>
          <h1>Sprint Reports & Executive Audits</h1>
          <p className="page-subtitle">
            Review AI-synthesized sprint velocity, retrospective findings, and export board-ready reports.
          </p>
        </div>

        <div className="page-heading-actions">
          <button
            className="report-cta-btn"
            onClick={onOpenReportGenerator}
          >
            <Sparkles size={15} />
            <span>Generate New AI Report</span>
          </button>
        </div>
      </div>

      {/* TOP 4 REPORT KPI METRICS */}
      <div className="stats-grid reports-stats-grid">
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon" style={{ color: "#c084fc", background: "rgba(192, 132, 252, 0.15)" }}>
              <FileText size={18} />
            </div>
            <span className="stat-change positive">
              <CheckCircle2 size={12} /> 100% Automated
            </span>
          </div>
          <div className="stat-value">24</div>
          <div className="stat-label">Reports Generated</div>
          <div className="stat-extra">Continuous sprint telemetry</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon" style={{ color: "#34d399", background: "rgba(52, 211, 153, 0.15)" }}>
              <Zap size={18} />
            </div>
            <span className="stat-change positive">
              <ArrowUpRight size={12} /> +14% vs Q2
            </span>
          </div>
          <div className="stat-value">88 / 100</div>
          <div className="stat-label">Avg. Velocity Score</div>
          <div className="stat-extra">Highest engineering cycle</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon" style={{ color: "#ec4899", background: "rgba(236, 72, 153, 0.15)" }}>
              <ShieldCheck size={18} />
            </div>
            <span className="stat-change positive">
              <CheckCircle2 size={12} /> 0 Regressions
            </span>
          </div>
          <div className="stat-value">17</div>
          <div className="stat-label">Blockers Averted by AI</div>
          <div className="stat-extra">Workload rebalancing actions</div>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon" style={{ color: "#38bdf8", background: "rgba(56, 189, 248, 0.15)" }}>
              <Download size={18} />
            </div>
            <span className="stat-change positive">Multi-format</span>
          </div>
          <div className="stat-value">PDF • CSV</div>
          <div className="stat-label">Export Formats</div>
          <div className="stat-extra">Board-ready Linear sync</div>
        </div>
      </div>

      {/* FEATURED LATEST SPRINT BANNER */}
      <div className="featured-report-banner">
        <div className="featured-badge-row">
          <span className="featured-pill">
            <Sparkles size={13} /> LATEST EXECUTIVE REPORT
          </span>
          <span className="featured-time">
            <Clock size={12} /> Generated 2 hours ago • Sprint 24 Cycle
          </span>
        </div>

        <div className="featured-report-main">
          <div className="featured-report-info">
            <h2>Sprint 24: Engineering Velocity Uplift & Token Handoff</h2>
            <p>
              Engineering velocity surged by <strong>14%</strong> propelled by Figma component token handoffs.
              AI workload rebalancing successfully diverted a payment API bottleneck away from Rahul Mehta.
            </p>

            <div className="featured-chips-grid">
              <div className="featured-metric-chip">
                <span className="chip-lbl">Cycle Time</span>
                <strong>2.4 Days (-18%)</strong>
              </div>
              <div className="featured-metric-chip">
                <span className="chip-lbl">Stories Delivered</span>
                <strong>38 / 41 (92.6%)</strong>
              </div>
              <div className="featured-metric-chip">
                <span className="chip-lbl">Burnout Risk</span>
                <strong className="text-emerald">Mitigated via Rebalance</strong>
              </div>
              <div className="featured-metric-chip">
                <span className="chip-lbl">Handoff Latency</span>
                <strong>4.2 Hours (-22%)</strong>
              </div>
            </div>
          </div>

          <div className="featured-actions-col">
            <div className="featured-score-box">
              <span className="score-lbl">Velocity Score</span>
              <div className="score-num-row">
                <strong className="score-num">88</strong>
                <span className="score-max">/100</span>
              </div>
              <span className="score-trend-tag">
                <TrendingUp size={12} /> +14% vs Sprint 23
              </span>
            </div>

            <div className="featured-btn-group">
              <button
                className="ref-modal-btn primary-gradient"
                onClick={onOpenReportGenerator}
              >
                <FileText size={15} />
                <span>View Full AI Report</span>
              </button>
              <button
                className="ref-modal-btn secondary"
                onClick={() => handleDownloadReport(PAST_REPORTS[0])}
              >
                <Download size={14} />
                <span>Export PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SPRINT REPORTS ARCHIVE LIST */}
      <div className="reports-archive-card">
        <div className="archive-header">
          <div>
            <h3>Historical Sprint Reports</h3>
            <p>Complete historical retrospective audit trail synthesized by FlowAI</p>
          </div>

          <div className="archive-filters">
            <button
              className={`archive-filter-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All Cycles ({PAST_REPORTS.length})
            </button>
            <button
              className={`archive-filter-btn ${filter === "published" ? "active" : ""}`}
              onClick={() => setFilter("published")}
            >
              Published (3)
            </button>
            <button
              className={`archive-filter-btn ${filter === "archived" ? "active" : ""}`}
              onClick={() => setFilter("archived")}
            >
              Archived (1)
            </button>
          </div>
        </div>

        <div className="reports-table-wrap">
          {filteredReports.map((rep) => (
            <motion.div
              key={rep.id}
              className="report-row-card"
              whileHover={{ x: 3, transition: { duration: 0.12 } }}
            >
              <div className="report-row-left">
                <div className="sprint-tag-box">
                  <span className="sprint-tag-name">{rep.sprint}</span>
                  <span className="sprint-tag-status">{rep.status}</span>
                </div>

                <div className="report-title-col">
                  <h4>{rep.title}</h4>
                  <div className="report-meta-sub">
                    <span>
                      <Calendar size={12} /> {rep.cycle}
                    </span>
                    <span>• Stories: {rep.storiesDelivered}</span>
                    <span>• Cycle Time: {rep.cycleTime}</span>
                    <span className="burnout-tag">• {rep.burnoutMitigated}</span>
                  </div>
                </div>
              </div>

              <div className="report-row-right">
                <div className="report-score-pill">
                  <span className="rep-score-val">{rep.score}</span>
                  <span className="rep-score-change">{rep.scoreChange}</span>
                </div>

                <div className="report-row-actions">
                  <button
                    className="report-icon-action-btn"
                    onClick={() => handleCopySummary(rep)}
                    title="Copy executive summary"
                  >
                    {copiedId === rep.id ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                  </button>

                  <button
                    className="report-icon-action-btn"
                    onClick={() => handleDownloadReport(rep)}
                    title="Download report PDF"
                  >
                    <Download size={14} />
                  </button>

                  <button
                    className="report-primary-row-btn"
                    onClick={onOpenReportGenerator}
                  >
                    <span>Inspect</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AUTOMATED REPORT DISPATCH SCHEDULES */}
      <div className="report-schedules-card">
        <div className="schedules-header">
          <div>
            <span className="eyebrow">CONTINUOUS STANDING DISPATCH</span>
            <h3>Automated Intelligence Subscriptions</h3>
            <p>Standing AI jobs that synthesize telemetry and dispatch executive summaries</p>
          </div>
        </div>

        <div className="schedules-grid">
          {REPORT_SCHEDULES.map((sch) => (
            <div key={sch.id} className="schedule-item-card">
              <div className="schedule-card-top">
                <div className="schedule-status-badge">
                  <span className="active-dot-emerald" />
                  <span>{sch.status}</span>
                </div>
                <span className="schedule-model-tag">{sch.aiModel}</span>
              </div>

              <h4>{sch.name}</h4>
              <div className="schedule-details">
                <div className="schedule-detail-row">
                  <Clock size={13} />
                  <span>{sch.cadence}</span>
                </div>
                <div className="schedule-detail-row">
                  <Send size={13} />
                  <span>{sch.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
