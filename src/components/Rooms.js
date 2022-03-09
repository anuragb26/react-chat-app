import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import CurrentRoomContext from "../context/CurrentRoomContext";
import AddRoomModal from "./AddRoomModal";
import firebase from "../config/firebase";
import "./Rooms.css";
const roomsRefFireBase = firebase.database().ref("rooms");
const Rooms = () => {
  const { setCurrentRoom } = useContext(CurrentRoomContext);
  const [rooms, setRooms] = useState([]);
  const currentRoomRef = useRef();
  currentRoomRef.current = rooms;
  const addRoomListener = useCallback(() => {
    roomsRefFireBase.on("child_added", (snap) => {
      setRooms([...currentRoomRef.current, snap.val()]);
    });
  }, []);
  const removeRoomListener = useCallback(() => {
    roomsRefFireBase.off();
  }, []);
  useEffect(() => {
    addRoomListener();
    return () => removeRoomListener();
  }, [addRoomListener, removeRoomListener]);
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
    <div className="rooms">
      <div className="rooms-header">
        <h4>rooms: ({rooms.length})</h4>
        <AddRoomModal roomsRefFireBase={roomsRefFireBase} />
      </div>
      <ul>{roomElements}</ul>
    </div>
  );
};

export default Rooms;
