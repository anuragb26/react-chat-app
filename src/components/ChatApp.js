import React, { useState } from "react";
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import UserContext from "../context/UserContext";
import CurrentRoomContext from "../context/CurrentRoomContext";
import "./ChatApp.css";

const ChatApp = () => {
  // use null in production after user login
  const [user, setUser] = useState({
    displayName: "Anurag",
    photoURL: "",
    uid: "id anurag"
  });
  // use null in production after Room Selected Logic
  const [currentRoom, setCurrentRoom] = useState({
    id: "idroom1",
    name: "room1",
    description: "Room 1"
  });

  return (
    <div className="ChatApp">
      <UserContext.Provider value={{ user, setUser }}>
        <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
          <SidePanel />
          <ChatPanel />
        </CurrentRoomContext.Provider>
      </UserContext.Provider>
    </div>
  );
};

export default ChatApp;
