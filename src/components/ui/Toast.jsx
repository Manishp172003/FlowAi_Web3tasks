import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Info, X } from "lucide-react";

export function Toast({ toast, onClose, onUndo }) {
  if (!toast) return null;

  const iconMap = {
    success: <CheckCircle2 size={18} className="toast-icon success" />,
    warning: <AlertTriangle size={18} className="toast-icon warning" />,
    info: <Info size={18} className="toast-icon info" />,
  };

  return (
    <AnimatePresence>
      <motion.div
        className="toast-container"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <div className="toast-body">
          {iconMap[toast.type || "success"]}
          <div className="toast-content">
            <p className="toast-title">{toast.title}</p>
            {toast.message && <p className="toast-message">{toast.message}</p>}
          </div>
        </div>

        <div className="toast-actions">
          {toast.undoAction && (
            <button
              className="toast-undo-btn"
              onClick={() => {
                if (onUndo) onUndo();
                onClose();
              }}
            >
              Undo
            </button>
          )}
          <button className="toast-close-btn" onClick={onClose} aria-label="Dismiss">
            <X size={15} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
