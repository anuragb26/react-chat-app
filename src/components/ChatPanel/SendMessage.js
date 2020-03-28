import React, { useState, useContext } from "react";
import { Button } from "semantic-ui-react";
import firebase from "../../config/firebase";
import UserContext from "../../context/UserContext";
import CurrentRoomContext from "../../context/CurrentRoomContext";
import "./SendMessage.css";

/*
  text
  id(of the same message,unique id)
  user(some unique id)
  current room (some unique id)
  timestamp
*/

const SendMessage = ({ messagesRefFirebasePerRoom }) => {
  const { user } = useContext(UserContext);
  const { currentRoom } = useContext(CurrentRoomContext);
  const [messageText, setMessageText] = useState("");
  const createMessage = messageId => ({
    id: messageId,
    text: messageText,
    roomId: currentRoom.id,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    user
  });
  const messageId = messagesRefFirebasePerRoom.push().key;
  // console.log("messageId", messageId);
  const message = createMessage(messageId);
  return (
    <div className="SendMessage">
      <input
        type="text"
        value={messageText}
        onChange={event => setMessageText(event.target.value)}
        placeholder="insert message"
      />
      <Button
        size="medium"
        circular
        icon="arrow circle right"
        onClick={() => {
          messagesRefFirebasePerRoom
            .child(messageId)
            .set(message)
            .then(msg => {
              //    console.log(`set success: ${msg}`);
              setMessageText("");
            })
            .catch(err => console.log(`set error: ${err}`));
        }}
      ></Button>
    </div>
  );
};

export default SendMessage;
