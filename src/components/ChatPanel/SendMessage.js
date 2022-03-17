import React, { useState, useContext } from "react";
import { Input } from "@mui/material";
import firebase from "../../config/firebase";
import UserContext from "../../context/UserContext";
import CurrentRoomContext from "../../context/CurrentRoomContext";
import useTheme from "../../customHooks/useTheme";
import "./SendMessage.css";

const SendMessage = ({ messagesRefFirebasePerRoom }) => {
  const { user } = useContext(UserContext);
  const { currentRoom } = useContext(CurrentRoomContext);
  const { theme } = useTheme();
  const [messageText, setMessageText] = useState("");
  const createMessage = (messageId) => ({
    id: messageId,
    text: messageText,
    roomId: currentRoom.id,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    user,
  });
  const messageId = messagesRefFirebasePerRoom.current.push().key;
  const message = createMessage(messageId);

  const sendMessage = (event) => {
    event.preventDefault();
    messagesRefFirebasePerRoom.current
      .child(messageId)
      .set(message)
      .then((msg) => {
        setMessageText("");
      })
      .catch((err) => console.log(`set error: ${err}`));
  };
  return (
    <div className="send-message" style={theme.chatInputText}>
      <form onSubmit={sendMessage}>
        <Input
          type="text"
          value={messageText}
          onChange={(event) => setMessageText(event.target.value)}
          placeholder="Enter message"
          fullWidth={true}
          sx={{ color: theme.chatInputText.color }}
        />
      </form>
    </div>
  );
};

export default SendMessage;
