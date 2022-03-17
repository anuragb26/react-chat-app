import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import RoomSelectMessage from "./RoomSelectMessage";
import CurrentRoomContext from "../context/CurrentRoomContext";
import ThemeContext from "../context/ThemeContext";
import "./ChatApp.css";

const ChatApp = () => {
  // use null in production after Room Selected Logic
  const [currentRoom, setCurrentRoom] = useState(null);
  const [themeColor, setThemeColor] = useState("light");
  const theme = {
    light: {
      sidePanel: {
        backgroundColor: "#3c2f3e",
        color: "white",
      },
      chatPanel: { backgroundColor: "#e9e6ea", color: "black" },
      message: { backgroundColor: "white", color: "black" },
      chatInputText: { backgroundColor: "white", color: "black" },
    },
    dark: {
      sidePanel: {
        backgroundColor: "black",
        color: "white",
        opacity: "0.8",
      },
      chatPanel: {
        backgroundColor: "black",
        color: "white",
      },
      message: {
        backgroundColor: "black",
        color: "white",
      },
      chatInputText: {
        backgroundColor: "#808080",
        color: "white",
      },
    },
  };
  const toggleTheme = () => {
    setThemeColor(themeColor === "dark" ? "light" : "dark");
  };
  const providerValue = { theme: theme[themeColor], toggleTheme };
  return (
    <ThemeContext.Provider value={providerValue}>
      <Grid
        container={true}
        sx={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: {
            md: "1fr 8fr",
            xs: "3fr 6fr",
          },
        }}
      >
        <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
          <Box sx={{ height: "100%", flexGap: "10px" }}>
            <SidePanel />
          </Box>
          <Box
            item={true}
            sx={{
              height: "100%",
              minHeight: 0,
              minWidth: 0,
              ...theme[themeColor].chatPanel,
            }}
          >
            {currentRoom ? <ChatPanel /> : <RoomSelectMessage />}
          </Box>
        </CurrentRoomContext.Provider>
      </Grid>
    </ThemeContext.Provider>
  );
};

export default ChatApp;
