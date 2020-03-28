import React, { useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import UserContext from "../context/UserContext";
import CurrentRoomContext from "../context/CurrentRoomContext";
import "./ChatApp.css";

const ChatApp = () => {
  // use null in production after Room Selected Logic
  const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <div className="ChatApp">
      <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
        <SidePanel />
        {currentRoom ? <ChatPanel /> : <h3>Please select a room</h3>}
      </CurrentRoomContext.Provider>
    </div>
  );
};

export default ChatApp;
