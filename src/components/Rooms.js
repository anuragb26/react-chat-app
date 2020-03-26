import React, { useContext } from "react";
import CurrentRoomContext from "../context/CurrentRoomContext";
const Rooms = () => {
  const { setCurrentRoom } = useContext(CurrentRoomContext);
  return (
    <ul>
      <li
        onClick={() =>
          setCurrentRoom({
            id: "idroom1",
            name: "room1",
            description: "desc 1"
          })
        }
      >
        Room 1
      </li>
      <li
        onClick={() =>
          setCurrentRoom({
            id: "idroom2",
            name: "room2",
            description: "desc 2"
          })
        }
      >
        Room 2
      </li>
    </ul>
  );
};

export default Rooms;
