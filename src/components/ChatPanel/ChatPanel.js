import React, { useContext, useState, useEffect, useRef } from "react";
import CurrentRoom from "./CurrentRoom";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import CurrentRoomContext from "../../context/CurrentRoomContext";
import firebase from "../../config/firebase";
import "./ChatPanel.css";

const ChatPanel = () => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();
  const { currentRoom } = useContext(CurrentRoomContext);
  messagesRef.current = messages;
  const messagesRefFirebase = firebase.database().ref("messages");

  const messagesRefFirebasePerRoom = messagesRefFirebase.child(currentRoom.id);
  const addMessageListener = () => {
    // This is set only once during use effect so it needs ref to get the latest state
    messagesRefFirebasePerRoom.on("child_added", snap => {
      // console.log("addMessageListener");
      //  console.log("snap", snap.val());
      //console.log("messages", messages);
      setMessages([...messagesRef.current, snap.val()]);
      // setMessages([...messages, snap.val()]);
    });
  };
  const removeMessageListener = () => {
    messagesRefFirebasePerRoom.off();
  };

  useEffect(() => {
    // console.log("in use effect making empty state");
    setMessages([]);
    addMessageListener();
    return () => {
      removeMessageListener();
    };
  }, [currentRoom.id]);

  return (
    <div className="ChatPanel">
      <CurrentRoom messages={messages} />
      <Messages messages={messages} />
      <SendMessage messagesRefFirebasePerRoom={messagesRefFirebasePerRoom} />
    </div>
  );
};

export default ChatPanel;
