import React, { useContext, useEffect, useState, useRef } from "react";
import CurrentRoomContext from "../context/CurrentRoomContext";
import AddRoomModal from "./AddRoomModal";
import firebase from "../config/firebase";
import "./Rooms.css";

const Rooms = () => {
  const { setCurrentRoom } = useContext(CurrentRoomContext);
  const [rooms, setRooms] = useState([]);
  const currentRoomRef = useRef();
  currentRoomRef.current = rooms;
  // currentRoomRef.current =
  const roomsRefFireBase = firebase.database().ref("rooms");
  const addRoomListener = () => {
    roomsRefFireBase.on("child_added", snap => {
      setRooms([...currentRoomRef.current, snap.val()]);
    });
  };
  const removeRoomListener = () => {
    roomsRefFireBase.off();
  };
  useEffect(() => {
    addRoomListener();
    return () => removeRoomListener();
  }, []);
  const roomElements = rooms.map((room, index) => (
    <li
      onClick={() => {
        setCurrentRoom(rooms[index]);
      }}
      key={index}
    >
      {room.name}
    </li>
  ));
  return (
    <div className="Rooms">
      <div className="RoomsHeader">
        <h4>rooms: ({rooms.length})</h4>
        <AddRoomModal roomsRefFireBase={roomsRefFireBase} />
      </div>
      <ul>{roomElements}</ul>
    </div>
  );
};

export default Rooms;
