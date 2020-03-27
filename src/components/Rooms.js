import React, { useContext } from "react";
import CurrentRoomContext from "../context/CurrentRoomContext";
import firebase from "../config/firebase";
const Rooms = () => {
  const { setCurrentRoom } = useContext(CurrentRoomContext);
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
  return (
    <div>
      <p>rooms: (...)</p>
      <button onClick={() => addRoom()}>Add Room</button>
      <ul>
        {/*
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
        */}
      </ul>
    </div>
  );
};

export default Rooms;
