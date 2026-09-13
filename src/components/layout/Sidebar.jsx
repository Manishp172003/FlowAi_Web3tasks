import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  BarChart3,
  FileText,
  Settings,
  Search,
  ChevronsUpDown,
  FolderKanban,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  AlertTriangle,
} from "lucide-react";

import { SIDEBAR_TEAMS } from "../../data/mockData";

export function Sidebar({
  activePage,
  onNavigate,
  onOpenRationale,
  onOpenCommandPalette,
  isCollapsed,
  onToggleCollapse,
  selectedTeamId,
  onSelectTeam,
}) {
  const mainMenu = [
    { id: "Dashboard", label: "Home", icon: <LayoutDashboard size={17} /> },
    { id: "My Tasks", label: "Templates", icon: <CheckSquare size={17} /> },
    { id: "Analytics", label: "Analytics & Video", icon: <BarChart3 size={17} /> },
    { id: "Reports", label: "Reports", icon: <FileText size={17} /> },
  ];

  const teams = SIDEBAR_TEAMS;

  return (
    <aside className={`ref-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* TOP HEADER: WORKSPACE CAPSULE & COLLAPSE TOGGLE */}
      <div className="ref-sidebar-top">
        <div
          className="ref-workspace-capsule"
          onClick={onOpenRationale}
          title={isCollapsed ? "FlowAI Team (Pro Workspace)" : "Workspace settings"}
        >
          <div className="ref-workspace-icon">
            <div className="workspace-ring" />
          </div>
          {!isCollapsed && (
            <>
              <div className="ref-workspace-info">
                <strong>FlowAI Team</strong>
                <span>Pro Workspace</span>
              </div>
              <ChevronsUpDown size={14} className="workspace-chevrons" />
            </>
          )}
        </div>

        <button
          className="ref-collapse-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* SEARCH BAR WITH CMD+K */}
      <div
        className="ref-sidebar-search"
        onClick={onOpenCommandPalette}
        title={isCollapsed ? "Search & Assistant (⌘ K)" : undefined}
      >
        <Search size={15} />
        {!isCollapsed && (
          <>
            <span>Search</span>
            <kbd className="ref-cmd-k">⌘ K</kbd>
          </>
        )}
      </div>

      {/* MAIN MENU */}
      <div className="ref-menu-group">
        {!isCollapsed ? (
          <span className="ref-group-label">MAIN MENU</span>
        ) : (
          <div className="ref-collapsed-divider" />
        )}
        {mainMenu.map((item) => {
          const isActive = activePage === item.id || (item.id === "Dashboard" && activePage === "Home");
          return (
            <button
              key={item.id}
              className={`ref-nav-item ${isActive ? "active" : ""}`}
              onClick={() => onNavigate(item.id)}
              title={isCollapsed ? item.label : undefined}
            >
              {isActive && (
                <motion.div
                  layoutId="ref-active-pill"
                  className="ref-active-pill"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="ref-item-icon">{item.icon}</span>
              {!isCollapsed && <span className="ref-item-label">{item.label}</span>}
            </button>
          );
        })}
      </div>

      {/* ASSETS */}
      <div className="ref-menu-group">
        {!isCollapsed ? (
          <span className="ref-group-label">ASSETS</span>
        ) : (
          <div className="ref-collapsed-divider" />
        )}
        <button
          className="ref-nav-item"
          onClick={() => onNavigate("Team")}
          title={isCollapsed ? "Library" : undefined}
        >
          <span className="ref-item-icon"><FolderKanban size={16} /></span>
          {!isCollapsed && <span className="ref-item-label">Library</span>}
        </button>
        <button
          className="ref-nav-item"
          onClick={() => onNavigate("Team")}
          title={isCollapsed ? "Avatars" : undefined}
        >
          <span className="ref-item-icon"><Users size={16} /></span>
          {!isCollapsed && <span className="ref-item-label">Avatars</span>}
        </button>
      </div>

      {/* TEAMS & SQUADS */}
      <div className="ref-menu-group teams-group">
        {!isCollapsed ? (
          <div className="ref-group-header-row">
            <span className="ref-group-label">TEAMS & SQUADS</span>
            <button
              className="ref-add-team-btn"
              onClick={() => onSelectTeam && onSelectTeam({ name: "New Squad", isNew: true })}
              title="Add new squad or invite contributors"
              aria-label="Add squad"
            >
              <Plus size={12} />
            </button>
          </div>
        ) : (
          <div className="ref-collapsed-divider" />
        )}

        {teams.map((t) => {
          const isSelected = selectedTeamId === t.id;
          return (
            <div
              key={t.name}
              className={`ref-team-item ${isSelected ? "selected" : ""}`}
              onClick={() => onSelectTeam && onSelectTeam(t)}
              title={
                isCollapsed
                  ? `${t.name} • ${t.members} members • ${t.status === "warning" ? "High workload warning" : "Optimal velocity"}`
                  : undefined
              }
            >
              <div className="team-badge-circle" style={{ backgroundColor: t.color }}>
                {t.letter}
              </div>

              {!isCollapsed && (
                <>
                  <div className="team-text-col">
                    <span className="team-title">{t.name}</span>
                    <span className="team-subtext">{t.members} members</span>
                  </div>

                  <div className="team-right-status">
                    {t.status === "warning" ? (
                      <span className="team-alert-pill" title="AI detected bottleneck risk">
                        <AlertTriangle size={9} />
                        {t.riskLabel}
                      </span>
                    ) : (
                      <span className="team-health-dot optimal" title="Velocity optimal" />
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* BOTTOM UTILITY ACTIONS: SETTINGS & COLLAPSE */}
      <div className="ref-sidebar-bottom">
        <button
          className={`ref-nav-item bottom-settings-btn ${activePage === "Settings" ? "active" : ""}`}
          onClick={() => onNavigate("Settings")}
          title={isCollapsed ? "Settings" : undefined}
        >
          <span className="ref-item-icon"><Settings size={16} /></span>
          {!isCollapsed && <span className="ref-item-label">Settings</span>}
        </button>

        <button
          className="ref-bottom-collapse-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={15} /> : <PanelLeftClose size={15} />}
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}

