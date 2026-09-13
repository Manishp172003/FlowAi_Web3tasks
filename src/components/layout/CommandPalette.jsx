import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  LayoutDashboard,
  BarChart3,
  Users,
  CheckSquare,
  FileText,
  Zap,
  CornerDownLeft,
} from "lucide-react";

export function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  onTriggerAiRebalance,
  onOpenReportModal,
  onOpenRationale,
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const actions = [
    {
      id: "ai-rebalance",
      category: "AI Actions",
      icon: <Sparkles size={16} className="cmd-icon-ai" />,
      title: "Simulate AI Workload Rebalance",
      subtitle: "Reassign blocked API task from Rahul to Priya",
      badge: "AI Action",
      handler: () => {
        onTriggerAiRebalance();
        onClose();
      },
    },
    {
      id: "ai-report",
      category: "AI Actions",
      icon: <FileText size={16} className="cmd-icon-ai" />,
      title: "Generate AI Sprint 24 Health Report",
      subtitle: "Synthesize velocity, risks, and cycle time",
      badge: "AI Synthesizer",
      handler: () => {
        onOpenReportModal();
        onClose();
      },
    },
    {
      id: "rationale",
      category: "Design Submission",
      icon: <Zap size={16} className="cmd-icon-primary" />,
      title: "View 80-120 Word Design Rationale",
      subtitle: "Read architectural decisions & product philosophy",
      badge: "Evaluation",
      handler: () => {
        onOpenRationale();
        onClose();
      },
    },
    {
      id: "nav-dash",
      category: "Navigation",
      icon: <LayoutDashboard size={16} />,
      title: "Go to Dashboard",
      subtitle: "Home overview & daily focus tasks",
      handler: () => {
        onNavigate("Dashboard");
        onClose();
      },
    },
    {
      id: "nav-analytics",
      category: "Navigation",
      icon: <BarChart3 size={16} />,
      title: "Go to Analytics & Reports",
      subtitle: "Productivity trend, team velocity, & AI insights",
      handler: () => {
        onNavigate("Analytics");
        onClose();
      },
    },
    {
      id: "nav-tasks",
      category: "Navigation",
      icon: <CheckSquare size={16} />,
      title: "View My Tasks",
      subtitle: "Sprint tickets and individual backlogs",
      handler: () => {
        onNavigate("My Tasks");
        onClose();
      },
    },
    {
      id: "nav-team",
      category: "Navigation",
      icon: <Users size={16} />,
      title: "View Team Roster",
      subtitle: "Check member availability & skill matrix",
      handler: () => {
        onNavigate("Team");
        onClose();
      },
    },
  ];

  const filtered = actions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay cmd-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="cmd-palette-box"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -15 }}
          transition={{ type: "spring", stiffness: 450, damping: 32 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cmd-search-bar">
            <Search size={18} className="cmd-search-icon" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or ask AI anything... (e.g. 'rebalance', 'analytics')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
                if (e.key === "Enter" && filtered.length > 0) {
                  filtered[0].handler();
                }
              }}
            />
            <span className="cmd-esc-tag" onClick={onClose}>
              ESC
            </span>
          </div>

          <div className="cmd-list-wrap">
            {filtered.length === 0 ? (
              <div className="cmd-empty-state">
                <Sparkles size={24} />
                <p>No matching commands found for "{query}"</p>
                <span>Try "rebalance", "analytics", or "report"</span>
              </div>
            ) : (
              <div className="cmd-items-list">
                {filtered.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`cmd-item ${idx === 0 ? "highlighted" : ""}`}
                    onClick={item.handler}
                  >
                    <div className="cmd-item-icon">{item.icon}</div>
                    <div className="cmd-item-text">
                      <div className="cmd-item-title-row">
                        <strong>{item.title}</strong>
                        {item.badge && <span className="cmd-badge">{item.badge}</span>}
                      </div>
                      <span>{item.subtitle}</span>
                    </div>
                    <div className="cmd-item-enter">
                      <CornerDownLeft size={13} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cmd-footer">
            <div className="cmd-footer-keys">
              <span>
                <kbd>↑</kbd> <kbd>↓</kbd> to navigate
              </span>
              <span>
                <kbd>↵</kbd> to select
              </span>
              <span>
                <kbd>esc</kbd> to dismiss
              </span>
            </div>
            <div className="cmd-footer-brand">
              <Sparkles size={13} /> FlowAI Intelligence
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
