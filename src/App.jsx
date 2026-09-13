import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import "./App.css";

// Mock Data
import {
  INITIAL_TEAM,
  INITIAL_TASKS,
  NOTIFICATIONS,
} from "./data/mockData";

// Layout Components
import { Sidebar } from "./components/layout/Sidebar";
import { Topbar } from "./components/layout/Topbar";
import { CommandPalette } from "./components/layout/CommandPalette";
import { Toast } from "./components/ui/Toast";

// Modals
import { DesignRationaleModal } from "./components/modals/DesignRationaleModal";
import { MemberDetailModal } from "./components/modals/MemberDetailModal";
import { AvatarsModal } from "./components/modals/AvatarsModal";
import { ReportGeneratorModal } from "./components/analytics/ReportGeneratorModal";

// Dashboard Components (Matching Reference Design)
import { AiReportsDonut } from "./components/dashboard/AiReportsDonut";
import { PassingRateWave } from "./components/dashboard/PassingRateWave";
import { ProjectTimeChart } from "./components/dashboard/ProjectTimeChart";
import { TaskManagerTimeline } from "./components/dashboard/TaskManagerTimeline";
import { InboxesFeed } from "./components/dashboard/InboxesFeed";
import { AiTeamPulse } from "./components/dashboard/AiTeamPulse";

// Analytics Components
import { AnalyticsStatGrid } from "./components/analytics/AnalyticsStatGrid";
import { ProductivityChart } from "./components/analytics/ProductivityChart";
import { TeamPerformanceTable } from "./components/analytics/TeamPerformanceTable";
import { AiInsightDrawer } from "./components/analytics/AiInsightDrawer";
import { ReportsView } from "./components/reports/ReportsView";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [team, setTeam] = useState(INITIAL_TEAM);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  // AI State
  const [isRebalanced, setIsRebalanced] = useState(false);
  const [aiExpanded, setAiExpanded] = useState(false);
  const [showInsight, setShowInsight] = useState(false);

  // Filters & Dropdowns
  const [analyticsPeriod, setAnalyticsPeriod] = useState("Last 30 days");
  const [showAnalyticsMenu, setShowAnalyticsMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isRationaleOpen, setIsRationaleOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAvatarsModalOpen, setIsAvatarsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleSelectMember = (idOrMember) => {
    if (typeof idOrMember === "string") {
      const found = team.find((m) => m.id === idOrMember) || team[0];
      setSelectedMember(found);
    } else if (idOrMember) {
      setSelectedMember(idOrMember);
    }
  };

  // Sidebar & Squad Selection State
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState("development");

  // Toast
  const [toast, setToast] = useState(null);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showToastNotification = (toastData) => {
    setToast(toastData);
  };

  // 1-Click AI Workload Rebalance Handler
  const handleApplyRebalance = () => {
    setIsRebalanced(true);
    setTeam((prev) =>
      prev.map((m) => {
        if (m.id === "rahul") {
          return { ...m, capacity: 84, tasks: m.tasks - 1, burnoutRisk: "Moderate" };
        }
        if (m.id === "priya") {
          return { ...m, capacity: 86, tasks: m.tasks + 1 };
        }
        return m;
      })
    );

    showToastNotification({
      type: "success",
      title: "Workload Rebalanced by AI",
      message: "API Integration shifted to Priya. Rahul's load reduced to 84%.",
      undoAction: true,
    });
  };

  const handleUndoRebalance = () => {
    setIsRebalanced(false);
    setTeam(INITIAL_TEAM);
    showToastNotification({
      type: "info",
      title: "Rebalance Reverted",
      message: "Original team workload distribution restored.",
    });
  };

  const handleAddTask = () => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: "Flowio - New AI Motion Sprint",
      subtitle: "Sprint 25 Planning",
      description: "Standardize Framer Motion spring physics across team workspace.",
      progress: 25,
      priority: "High",
      timeSlot: "14:00 - 15:30",
      day: "Mon",
      completed: false,
      assignee: "Manish (Lead)",
      teamAvatars: ["MP", "PS"],
      comments: 3,
      attachments: 2,
      tag: "Design",
    };
    setTasks((prev) => [newTask, ...prev]);
    showToastNotification({
      type: "success",
      title: "Task Created",
      message: "New AI motion sprint ticket added to timeline.",
    });
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToastNotification({
      type: "info",
      title: "Notifications Cleared",
      message: "All alerts marked as read.",
    });
  };

  const handleSelectTeam = (t) => {
    if (t.isNew) {
      showToastNotification({
        type: "info",
        title: "Squad Creator",
        message: "Opening squad creation wizard & role assignments.",
      });
      return;
    }
    const nextSelected = selectedTeamId === t.id ? null : t.id;
    setSelectedTeamId(nextSelected);
    if (nextSelected) {
      showToastNotification({
        type: t.status === "warning" ? "warning" : "success",
        title: `${t.name} Squad Filtered`,
        message: t.status === "warning"
          ? "Workload bottleneck detected in backend API tickets (Rahul at 94%). Review AI rebalancing."
          : `${t.members} contributors active • ${t.tickets} sprint stories tracking smoothly.`,
      });
    } else {
      showToastNotification({
        type: "info",
        title: "Squad Filter Cleared",
        message: "Showing all squads and contributors across FlowAI.",
      });
    }
  };

  return (
    <div className="ref-app-shell">
      {/* LEFT SIDEBAR (EXACT REFERENCE DESIGN) */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onOpenRationale={() => setIsRationaleOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
        selectedTeamId={selectedTeamId}
        onSelectTeam={handleSelectTeam}
        onOpenAvatars={() => setIsAvatarsModalOpen(true)}
      />

      {/* MAIN VIEWPORT */}
      <main className={`ref-main-content ${isSidebarCollapsed ? "collapsed" : ""}`}>
        {/* TOPBAR WITH GREETING & CAPSULES */}
        <Topbar
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          unreadCount={notifications.filter((n) => n.unread).length}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
          onMarkAllRead={handleMarkAllRead}
          onOpenRationale={() => setIsRationaleOpen(true)}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenUserProfile={() => handleSelectMember("manish")}
        />

        <div className="ref-page-body">
          <AnimatePresence mode="wait">
            {activePage === "Dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="ref-dashboard-view"
              >
                {/* TOP 3 METRICS ROW (MATCHING REFERENCE EXACTLY) */}
                <section className="ref-top-metrics-grid">
                  <AiReportsDonut onExpand={() => setIsReportModalOpen(true)} />
                  <PassingRateWave onExpand={() => handleApplyRebalance()} />
                  <ProjectTimeChart />
                </section>

                {/* AMBIENT AI WORKLOAD REBALANCER HUD */}
                <AiTeamPulse
                  aiExpanded={aiExpanded}
                  setAiExpanded={setAiExpanded}
                  isRebalanced={isRebalanced}
                  onApplyRebalance={handleApplyRebalance}
                  onUndoRebalance={handleUndoRebalance}
                  onSelectMember={handleSelectMember}
                />

                {/* BOTTOM SPLIT SECTION (TASK MANAGER & INBOXES) */}
                <section className="ref-bottom-split-grid">
                  <TaskManagerTimeline
                    tasks={tasks}
                    onAddTask={handleAddTask}
                    onTriggerAiRebalance={handleApplyRebalance}
                    onSelectTask={() => handleSelectMember(team[0])}
                    selectedTeamId={selectedTeamId}
                    onClearTeam={() => setSelectedTeamId(null)}
                    onSelectMember={handleSelectMember}
                    onOpenAvatars={() => setIsAvatarsModalOpen(true)}
                  />

                  <InboxesFeed
                    onSendMessage={(msg) =>
                      showToastNotification({
                        type: "success",
                        title: "AI Response Sent",
                        message: `Queued prompt: "${msg}"`,
                      })
                    }
                    onSelectMessage={() => handleSelectMember(team[1])}
                    onSelectMember={handleSelectMember}
                  />
                </section>
              </motion.div>
            )}

            {activePage === "Analytics" && (
              <motion.div
                key="analytics"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="ref-analytics-view"
              >
                <div className="page-heading">
                  <div>
                    <p className="eyebrow">INSIGHTS & PERFORMANCE TELEMETRY</p>
                    <h1>Team Velocity & Analytics</h1>
                    <p className="page-subtitle">
                      Understand engineering throughput, team velocity trends, and contributor capacity.
                    </p>
                  </div>

                  <div className="page-heading-actions">
                    <button
                      className="report-cta-btn"
                      onClick={() => setIsReportModalOpen(true)}
                    >
                      <Sparkles size={15} />
                      <span>Generate AI Sprint Report</span>
                    </button>
                  </div>
                </div>

                <AnalyticsStatGrid />

                <ProductivityChart
                  analyticsPeriod={analyticsPeriod}
                  setAnalyticsPeriod={setAnalyticsPeriod}
                  showAnalyticsMenu={showAnalyticsMenu}
                  setShowAnalyticsMenu={setShowAnalyticsMenu}
                />

                <div className="analytics-grid">
                  <TeamPerformanceTable
                    team={team}
                    onSelectMember={setSelectedMember}
                  />

                  <AiInsightDrawer
                    showInsight={showInsight}
                    setShowInsight={setShowInsight}
                    onOpenReportGenerator={() => setIsReportModalOpen(true)}
                  />
                </div>
              </motion.div>
            )}

            {activePage === "Reports" && (
              <motion.div
                key="reports"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="ref-reports-page-wrapper"
              >
                <ReportsView
                  onOpenReportGenerator={() => setIsReportModalOpen(true)}
                  onShowToast={showToastNotification}
                />
              </motion.div>
            )}

            {activePage !== "Dashboard" && activePage !== "Analytics" && activePage !== "Reports" && (
              <motion.div
                key="other"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="coming-soon-panel"
              >
                <h2>{activePage} View</h2>
                <p>
                  This view is part of the FlowAI workspace. As required by Web3Task, the core focus
                  is centered on the <strong>Home/Dashboard</strong> and <strong>Analytics/Reports</strong> screens.
                </p>
                <button className="primary-button" onClick={() => setActivePage("Dashboard")}>
                  Back to Dashboard
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* MODALS & OVERLAYS */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={(page) => setActivePage(page)}
        onTriggerAiRebalance={handleApplyRebalance}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onOpenRationale={() => setIsRationaleOpen(true)}
      />

      <DesignRationaleModal
        isOpen={isRationaleOpen}
        onClose={() => setIsRationaleOpen(false)}
      />

      <MemberDetailModal
        member={selectedMember}
        isOpen={Boolean(selectedMember)}
        onClose={() => setSelectedMember(null)}
        onReassignTask={() => handleApplyRebalance()}
      />

      <AvatarsModal
        isOpen={isAvatarsModalOpen}
        onClose={() => setIsAvatarsModalOpen(false)}
        team={team}
        onSelectMember={handleSelectMember}
      />

      <ReportGeneratorModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onShowToast={showToastNotification}
      />

      {/* TOAST STACK */}
      <Toast
        toast={toast}
        onClose={() => setToast(null)}
        onUndo={handleUndoRebalance}
      />
    </div>
  );
}

export default App;