import React from "react";
import useTheme from "../customHooks/useTheme";

const RoomSelectMessage = () => {
  const { theme } = useTheme();
  return (
    <h3 style={{ padding: "1rem", ...theme.chatPanel }}>
      Please select a room
    </h3>
  );
};

export default RoomSelectMessage;
