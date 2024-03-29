import React, { useContext } from "react";
import CurrentRoomContext from "../../context/CurrentRoomContext";
import "./CurrentRoom.css";

const CurrentRoom = ({ messages }) => {
  const { currentRoom } = useContext(CurrentRoomContext);
  const distinctUsers = [...new Set(messages.map((m) => m.user.id))].length;

  return (
    <div className="current-room">
      <h4>{currentRoom.name}</h4>
      <p>{distinctUsers} users</p>
    </div>
  );
};

export default CurrentRoom;
