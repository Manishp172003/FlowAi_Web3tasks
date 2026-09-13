import { useState } from "react";
import { ChevronLeft, Maximize2, Search, Send } from "lucide-react";
import { INBOX_MESSAGES } from "../../data/mockData";

export function InboxesFeed({ onSendMessage, onSelectMessage, onSelectMember }) {
  const [query, setQuery] = useState("");
  const [replyText, setReplyText] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    if (onSendMessage) onSendMessage(replyText);
    setReplyText("");
  };

  const filtered = INBOX_MESSAGES.filter(
    (m) =>
      m.sender.toLowerCase().includes(query.toLowerCase()) ||
      m.topic.toLowerCase().includes(query.toLowerCase()) ||
      m.message.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="ref-card inboxes-card">
      {/* HEADER */}
      <div className="inbox-header">
        <div className="inbox-title-row">
          <button className="inbox-back-btn" aria-label="Back">
            <ChevronLeft size={16} />
          </button>
          <h3>Inboxes</h3>
          <span className="inbox-count-badge">16</span>
        </div>

        <button className="ref-expand-btn" aria-label="Expand inboxes">
          <Maximize2 size={15} />
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="inbox-search-bar">
        <Search size={15} />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* MESSAGES LIST */}
      <div className="inbox-messages-list">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`inbox-item-card ${item.unread ? "unread" : ""}`}
            onClick={() => onSelectMessage && onSelectMessage(item)}
          >
            <div className="inbox-item-top">
              <div
                className="inbox-author"
                title={`Inspect ${item.sender}'s contributor profile`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectMember) onSelectMember(item.sender.toLowerCase().includes("rahul") ? "rahul" : "priya");
                }}
              >
                <img src={item.avatar} alt={item.sender} className="author-img" />
                <div>
                  <strong>{item.sender}</strong>
                  <span>Topic: {item.topic}</span>
                </div>
              </div>
              <span className="inbox-work-tag">• {item.tag}</span>
            </div>

            <p className="inbox-preview">{item.message}</p>

            {/* QUICK REPLY BOX FOR FIRST ITEM */}
            {item.id === "inbox-1" && (
              <form className="quick-reply-box" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Send letter / prompt..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button type="submit" className="reply-send-btn" aria-label="Send reply">
                  <Send size={13} />
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
