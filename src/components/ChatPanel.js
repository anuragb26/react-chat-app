import React from "react";
import "./ChatPanel.css";

const ChatPanel = () => {
  return (
    <div className="ChatPanel">
      <div>room1</div>
      <div style={{ flexGrow: 1, backgroundColor: "violet" }}>
        <ul>
          <li>Message 1</li>
          <li>Message 1</li>
          <li>Message 1</li>
        </ul>
      </div>
      <div style={{ display: "flex" }}>
        <input
          type="text"
          style={{ flexGrow: 1 }}
          placeholder="insert message"
        />
        <button>Send Message</button>
      </div>
    </div>
  );
};

export default ChatPanel;
