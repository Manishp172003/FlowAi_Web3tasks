import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { INITIAL_TASKS, SIDEBAR_TEAMS } from "../../data/mockData";

export function TaskManagerTimeline({
  tasks: propTasks,
  onAddTask,
  onSelectTask,
  onTriggerAiRebalance,
  selectedTeamId,
  onClearTeam,
  onSelectMember,
  onOpenAvatars,
}) {
  const tasks = propTasks || INITIAL_TASKS;
  const [selectedDay, setSelectedDay] = useState("Mon");

  const activeSquad = SIDEBAR_TEAMS.find((s) => s.id === selectedTeamId);

  const days = [
    { key: "Mon", label: "Mon", date: "march, 09", count: 4 },
    { key: "Tue", label: "Tue", date: "march, 10", count: null },
    { key: "Wed", label: "Wed", date: "march, 11", count: 2 },
  ];

  return (
    <div className="ref-card task-manager-card">
      {/* HEADER */}
      <div className="task-manager-header">
        <h2>Task Manager</h2>

        <div className="tm-header-right">
          <div className="tm-date-pill">
            <Calendar size={14} />
            <span>March 2026</span>
            <div className="tm-arrows">
              <button aria-label="Previous month"><ChevronLeft size={13} /></button>
              <button aria-label="Next month"><ChevronRight size={13} /></button>
            </div>
          </div>

          <button className="tm-add-btn" onClick={onAddTask}>
            <Plus size={15} />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* SQUAD FILTER BANNER IF SELECTED */}
      {activeSquad && (
        <div className="tm-squad-filter-banner">
          <div className="tm-squad-filter-info">
            <span className="tm-squad-badge" style={{ backgroundColor: activeSquad.color }}>
              {activeSquad.letter}
            </span>
            <span className="tm-squad-filter-text">
              Active filter: <strong>{activeSquad.name} Squad</strong> • {activeSquad.members} contributors • {activeSquad.tickets} sprint stories
            </span>
            {activeSquad.status === "warning" && (
              <span className="tm-squad-warn-pill">
                ⚠️ {activeSquad.riskLabel} bottleneck
              </span>
            )}
          </div>
          <button className="tm-clear-filter-btn" onClick={onClearTeam} title="Clear filter">
            Clear filter ✕
          </button>
        </div>
      )}

      {/* DAYS SUBHEADER */}
      <div className="tm-days-row">
        {days.map((day) => (
          <div
            key={day.key}
            className={`tm-day-col-header ${selectedDay === day.key ? "active" : ""}`}
            onClick={() => setSelectedDay(day.key)}
          >
            <div className="tm-day-title">
              <strong>{day.label}</strong>
              <span>{day.date}</span>
            </div>
            {day.count && <span className="tm-day-badge">{day.count}</span>}
          </div>
        ))}
      </div>

      {/* TIMELINE GRID */}
      <div className="tm-timeline-grid">
        {/* HOURS COLUMN */}
        <div className="tm-hours-col">
          <span>10:00</span>
          <span>10:30</span>
          <span>11:00</span>
          <span>11:30</span>
          <span>12:00</span>
          <span>12:30</span>
        </div>

        {/* TASK CARDS CANVAS */}
        <div className="tm-cards-canvas">
          {/* TASK CARD 1 (HERO CARD) */}
          <motion.div
            className="tm-project-card hero"
            whileHover={{ y: -3, borderColor: "rgba(192, 132, 252, 0.5)" }}
            onClick={() => onSelectTask && onSelectTask(tasks[0])}
          >
            <div className="tm-card-top">
              <div>
                <h4>Flowio – Video App</h4>
                <span className="tm-card-sub">Dashboard Design</span>
              </div>
              <div className="tm-card-logo">N</div>
            </div>

            <p className="tm-card-desc">
              To design an intuitive, modern, and visually appealing interface for a web application.
            </p>

            <div className="tm-progress-section">
              <div className="tm-progress-labels">
                <span>Progress</span>
                <strong>75%</strong>
              </div>
              <div className="tm-progress-track">
                <div className="tm-progress-fill" style={{ width: "75%" }} />
              </div>
            </div>

            <div className="tm-card-footer">
              <div className="tm-avatar-stack">
                <div
                  className="stack-avatar a1"
                  title="Priya Sharma (Product Designer)"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectMember) onSelectMember("priya");
                  }}
                >
                  PS
                </div>
                <div
                  className="stack-avatar a2"
                  title="Rahul Mehta (Backend Lead • 94% load)"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectMember) onSelectMember("rahul");
                  }}
                >
                  RM
                </div>
                <div
                  className="stack-avatar count"
                  title="View all 5 team contributor avatars"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenAvatars) onOpenAvatars();
                  }}
                >
                  +3
                </div>
              </div>

              <div className="tm-meta-stats">
                <span><MessageSquare size={13} /> 12</span>
                <span><Paperclip size={13} /> 5</span>
              </div>
            </div>
          </motion.div>

          {/* TASK CARD 2 */}
          <motion.div
            className="tm-project-card secondary"
            whileHover={{ y: -3, borderColor: "rgba(192, 132, 252, 0.4)" }}
            onClick={() => onSelectTask && onSelectTask(tasks[1])}
          >
            <div className="tm-card-top">
              <div>
                <h4>Meeting – Alex B.</h4>
                <span className="tm-card-sub">Topic: Motion Design</span>
              </div>
              <div className="tm-card-spark">✦</div>
            </div>

            <p className="tm-card-desc">
              On this call we will discuss the changes made to the project. We will also discuss the further action plan!
            </p>

            <div className="tm-card-footer">
              <div className="tm-avatar-stack">
                <div
                  className="stack-avatar a3"
                  title="Yamini Bisen (Frontend Developer)"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectMember) onSelectMember("yamini");
                  }}
                >
                  YB
                </div>
                <div
                  className="stack-avatar a4"
                  title="Manish Pawar (Product Lead)"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectMember) onSelectMember("manish");
                  }}
                >
                  MP
                </div>
              </div>

              <div className="tm-meta-stats">
                <span><MessageSquare size={13} /> 8</span>
                <span><Paperclip size={13} /> 1</span>
              </div>
            </div>
          </motion.div>

          {/* TASK CARD 3 & 4 (COMPACT ROW) */}
          <div className="tm-compact-col">
            <div className="tm-project-card compact" onClick={() => onSelectTask && onSelectTask(tasks[2])}>
              <div className="tm-card-top">
                <div>
                  <h4>Meet with PM</h4>
                  <span className="tm-card-sub">Topic: New AI Workload</span>
                </div>
                <button
                  className="tm-ai-rebalance-mini-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onTriggerAiRebalance) onTriggerAiRebalance();
                  }}
                  title="Trigger AI Workload Balance"
                >
                  <Zap size={13} />
                </button>
              </div>
              <div className="tm-card-footer">
                <div className="tm-avatar-stack">
                  <div
                    className="stack-avatar a1"
                    title="Rahul Mehta (Backend Lead)"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectMember) onSelectMember("rahul");
                    }}
                  >
                    RM
                  </div>
                  <div
                    className="stack-avatar a2"
                    title="Priya Sharma (Product Designer)"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectMember) onSelectMember("priya");
                    }}
                  >
                    PS
                  </div>
                </div>
                <div className="tm-meta-stats">
                  <span><MessageSquare size={13} /> 7</span>
                </div>
              </div>
            </div>

            <div className="tm-project-card compact checklist">
              <div className="tm-card-top">
                <div>
                  <h4>Landing Page UI</h4>
                  <span className="tm-card-sub">Design System</span>
                </div>
                <div className="tm-card-spark">✦</div>
              </div>

              <div className="tm-checklist-items">
                <div className="tm-check-item">
                  <CheckCircle2 size={13} className="checked" />
                  <span>Define the color palette</span>
                </div>
                <div className="tm-check-item">
                  <div className="empty-check-dot" />
                  <span>Prepare a UI guide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
