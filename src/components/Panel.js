import React from "react";
import { Box } from "@mui/system";
import ChatPanel from "./ChatPanel/ChatPanel";
import RoomSelectMessage from "./RoomSelectMessage";
import useTheme from "../customHooks/useTheme";

const Panel = ({ currentRoom }) => {
  const { theme } = useTheme();
  return (
    <Box
      item={true}
      sx={{
        height: "100%",
        minHeight: 0,
        minWidth: 0,
        ...theme.chatPanel,
      }}
    >
      {currentRoom ? <ChatPanel /> : <RoomSelectMessage />}
    </Box>
  );
};

export default Panel;
