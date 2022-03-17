import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import CurrentRoom from "./CurrentRoom";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import CurrentRoomContext from "../../context/CurrentRoomContext";
import firebase from "../../config/firebase";
import ThemeContext from "../../context/ThemeContext";
import "./ChatPanel.css";
const messagesRefFirebase = firebase.database().ref("messages");

const ChatPanel = () => {
  const { theme } = useContext(ThemeContext);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef();
  const messagesRefFirebasePerRoom = useRef();

  const { currentRoom } = useContext(CurrentRoomContext);
  messagesRef.current = messages;
  // const messagesRefFirebasePerRoom = messagesRefFirebase.child(currentRoom.id);
  messagesRefFirebasePerRoom.current = messagesRefFirebase.child(
    currentRoom.id
  );
  const addMessageListener = useCallback(() => {
    // This is set only once during use effect so it needs ref to get the latest state
    messagesRefFirebasePerRoom.current.on("child_added", (snap) => {
      // console.log("addMessageListener");
      //  console.log("snap", snap.val());
      //console.log("messages", messages);
      setMessages([...messagesRef.current, snap.val()]);
      // setMessages([...messages, snap.val()]);
    });
  }, [messagesRefFirebasePerRoom]);
  const removeMessageListener = useCallback(() => {
    messagesRefFirebasePerRoom.current.off();
  }, [messagesRefFirebasePerRoom]);

  useEffect(() => {
    // console.log("in use effect making empty state");
    setMessages([]);
    addMessageListener();
    return () => {
      removeMessageListener();
    };
  }, [currentRoom.id, setMessages, addMessageListener, removeMessageListener]);

  return (
    <div className="chat-panel" style={theme.chatPanel}>
      <CurrentRoom messages={messages} />
      <Messages messages={messages} />
      <SendMessage messagesRefFirebasePerRoom={messagesRefFirebasePerRoom} />
    </div>
  );
};

export default ChatPanel;
