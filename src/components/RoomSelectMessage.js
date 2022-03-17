import ThemeContext from "../context/ThemeContext";
import React, { useContext } from "react";

const RoomSelectMessage = () => {
  const { theme = {} } = useContext(ThemeContext);
  return (
    <h3 style={{ padding: "1rem", ...theme.chatPanel }}>
      Please select a room
    </h3>
  );
};

export default RoomSelectMessage;
