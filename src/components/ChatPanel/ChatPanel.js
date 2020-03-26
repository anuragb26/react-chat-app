import React, { useState, useEffect, useRef } from "react";
import CurrentRoom from "./CurrentRoom";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import firebase from "../../config/firebase";
import "./ChatPanel.css";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();
  messagesRef.current = messages;
  const messagesRefFirebase = firebase.database().ref("messages");

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
    // addMessageListener();
    return () => {
      removeMessageListener();
    };
  }, []);

  return (
    <div className="ChatPanel">
      <CurrentRoom />
      <Messages messages={messages} />
      <SendMessage messagesRefFirebase={messagesRefFirebase} />
    </div>
  );
};

export default ChatPanel;
