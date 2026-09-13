import { motion, AnimatePresence } from "framer-motion";
import { Bell, Sparkles, AlertCircle, CheckCircle2, Check, X } from "lucide-react";

export function NotificationPopover({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onActionClick,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* TRANSPARENT CLICK-OUTSIDE BACKDROP */}
          <div key="notif-backdrop" className="popover-backdrop" onClick={onClose} />

          <motion.div
            key="notif-popover"
            className="notification-popover"
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 450, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
        <div className="notif-header">
          <div className="notif-title-row">
            <Bell size={16} className="notif-bell-icon" />
            <h4>Notifications & AI Alerts</h4>
            <span className="notif-count">
              {notifications.filter((n) => n.unread).length} new
            </span>
          </div>
          <div className="notif-header-actions">
            <button className="notif-mark-read-btn" onClick={onMarkAllRead}>
              <Check size={12} />
              <span>Mark read</span>
            </button>
            <button className="notif-close-icon-btn" onClick={onClose} aria-label="Close">
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="notif-list">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`notif-item ${notif.unread ? "unread" : ""}`}
              onClick={() => onActionClick && onActionClick(notif)}
            >
              <div className={`notif-icon ${notif.type}`}>
                {notif.type === "ai" && <Sparkles size={15} />}
                {notif.type === "task" && <AlertCircle size={15} />}
                {notif.type === "success" && <CheckCircle2 size={15} />}
              </div>
              <div className="notif-content">
                <div className="notif-item-top">
                  <span className="notif-item-title">{notif.title}</span>
                  <span className="notif-time">{notif.time}</span>
                </div>
                <p className="notif-msg">{notif.message}</p>
              </div>
              {notif.unread && <span className="unread-dot" />}
            </div>
          ))}
        </div>

        <div className="notif-footer">
          <button className="view-all-notifs" onClick={onClose}>
            Dismiss
          </button>
        </div>
      </motion.div>
      </>
    )}
  </AnimatePresence>
);
}
