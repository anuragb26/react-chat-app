import React, { useState, useEffect, useRef } from "react";
import firebase from "../config/firebase";
import "./ChatPanel.css";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();
  messagesRef.current = messages;
  const messagesRefFirebase = firebase.database().ref("messages");
  const messageElements = (
    <ul>
      {messages.map((item, index) => (
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  );
  const addMessageListener = () => {
    console.log("addMessageListener");
    messagesRefFirebase.on("child_added", snap => {
      console.log("snap", snap.val());
      console.log("messages", messages);
      setMessages([...messagesRef.current, snap.val()]);
    });
  };
  const removeMessageListener = () => {
    messagesRefFirebase.off();
  };

  useEffect(() => {
    addMessageListener();
    return () => {
      removeMessageListener();
    };
  }, []);

  return (
    <div className="ChatPanel">
      <div>room1</div>
      <div style={{ flexGrow: 1, backgroundColor: "violet" }}>
        {messageElements}
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
