import React from "react";
import firebase from "../config/firebase";
import "./ChatPanel.css";

const ChatPanel = () => {
  const messagesRefFirebase = firebase.database().ref("messages");
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
        <button
          onClick={() => {
            messagesRefFirebase
              .child("id2")
              .set({ text: "Some text" })
              .then(msg => console.log(`set success: ${msg}`))
              .catch(err => console.log(`set error: ${err}`));
          }}
        >
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatPanel;
