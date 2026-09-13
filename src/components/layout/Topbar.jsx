import { Sparkles, FileText, Compass, Bell } from "lucide-react";
import { NotificationPopover } from "../modals/NotificationPopover";

export function Topbar({
  onOpenCommandPalette,
  unreadCount,
  showNotifications,
  setShowNotifications,
  notifications,
  onMarkAllRead,
  onOpenRationale,
  onOpenReportModal,
  onOpenUserProfile,
}) {
  return (
    <header className="ref-topbar">
      <div className="ref-topbar-welcome">
        <h1>Welcome, Manish</h1>
      </div>

      <div className="ref-topbar-actions">
        {/* ACTION CAPSULE 1 */}
        <div className="ref-action-capsule" onClick={onOpenCommandPalette}>
          <div className="capsule-icon">
            <Sparkles size={16} />
          </div>
          <div className="capsule-text">
            <strong>AI Sprint Assistant</strong>
            <span>Turn files & links into tickets</span>
          </div>
        </div>

        {/* ACTION CAPSULE 2 */}
        <div className="ref-action-capsule" onClick={onOpenReportModal}>
          <div className="capsule-icon">
            <FileText size={16} />
          </div>
          <div className="capsule-text">
            <strong>Import Sprint Stories</strong>
            <span>Synthesize executive AI report</span>
          </div>
        </div>

        {/* ACTION CAPSULE 3 (RATIONALE 108W) */}
        <div className="ref-action-capsule highlighted" onClick={onOpenRationale}>
          <div className="capsule-icon accent">
            <Compass size={16} />
          </div>
          <div className="capsule-text">
            <strong>Reviewer Rationale</strong>
            <span>108-word design submission</span>
          </div>
        </div>

        {/* NOTIFICATIONS & AVATAR */}
        <div className="notification-wrapper">
          <button
            className={`ref-icon-button ${showNotifications ? "active" : ""}`}
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={17} />
            {unreadCount > 0 && <span className="ref-notification-dot" />}
          </button>

          <NotificationPopover
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
            notifications={notifications}
            onMarkAllRead={onMarkAllRead}
            onActionClick={() => setShowNotifications(false)}
          />
        </div>

        <div
          className="ref-user-avatar"
          onClick={onOpenUserProfile}
          title="Manish Pawar (Product Lead) • Click to inspect profile"
          role="button"
          tabIndex={0}
        >
          <span>M</span>
        </div>
      </div>
    </header>
  );
}
