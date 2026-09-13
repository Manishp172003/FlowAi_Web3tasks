import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock3, AlertCircle, Plus } from "lucide-react";

export function FocusList({ tasks, onToggleTask, onAddTask }) {
  const [filter, setFilter] = useState("all");

  const filteredTasks = tasks.filter((t) => {
    if (filter === "urgent") return t.urgent && !t.completed;
    if (filter === "pending") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <section className="panel focus-panel">
      <div className="panel-header">
        <div>
          <div className="panel-title-row">
            <h2>Today's Focus</h2>
            <span className="task-progress-badge">
              {completedCount}/{tasks.length} Completed
            </span>
          </div>
          <p>Critical paths and sprint priorities requiring action</p>
        </div>

        <div className="task-filter-pills">
          {["all", "urgent", "pending", "completed"].map((type) => (
            <button
              key={type}
              className={`filter-pill ${filter === type ? "active" : ""}`}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="focus-list">
        <AnimatePresence mode="popLayout">
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`focus-item ${task.completed ? "task-done" : ""}`}
            >
              {/* INTERACTIVE CHECKBOX */}
              <button
                className={`task-checkbox ${task.completed ? "checked" : ""}`}
                onClick={() => onToggleTask(task.id)}
                aria-label={`Mark ${task.title} as ${task.completed ? "incomplete" : "complete"}`}
              >
                {task.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </motion.div>
                )}
              </button>

              <div className="focus-content">
                <strong className={task.completed ? "strikethrough" : ""}>
                  {task.title}
                </strong>
                <div className="task-subtext">
                  <span>{task.project}</span>
                  <span className="dot-divider">•</span>
                  <span className="task-assignee-text">{task.assignee}</span>
                </div>
              </div>

              <div className="focus-meta">
                {task.urgent && !task.completed && (
                  <span className="priority-pill urgent">
                    <AlertCircle size={11} /> Urgent
                  </span>
                )}
                <div className={`focus-time ${task.urgent && !task.completed ? "urgent-text" : ""}`}>
                  <Clock3 size={13} />
                  <span>{task.due}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="focus-footer">
        <button className="add-task-btn" onClick={onAddTask}>
          <Plus size={14} />
          <span>Add quick task</span>
        </button>
        <span className="focus-hint">Click checkbox to complete</span>
      </div>
    </section>
  );
}
