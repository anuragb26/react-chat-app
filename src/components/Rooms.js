import React, { useContext, useEffect, useState, useRef } from "react";
import CurrentRoomContext from "../context/CurrentRoomContext";
import firebase from "../config/firebase";
const Rooms = () => {
  const { setCurrentRoom } = useContext(CurrentRoomContext);
  const [rooms, setRooms] = useState([]);
  const currentRoomRef = useRef();
  currentRoomRef.current = rooms;
  // currentRoomRef.current =
  const roomsRefFireBase = firebase.database().ref("rooms");
  const addRoom = () => {
    const roomId = roomsRefFireBase.push().key;
    const newRoom = {
      id: roomId,
      name: "room2",
      description: "desc2"
    };
    roomsRefFireBase
      .child(roomId)
      .set(newRoom)
      .then(() => console.log("new room"))
      .catch(err => console.log(err));
  };
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
    <li key={index}>{room.name}</li>
  ));
  return (
    <div>
      <p>rooms: (...)</p>
      <button onClick={() => addRoom()}>Add Room</button>
      <ul>{roomElements}</ul>
    </div>
  );
};

export default Rooms;
