import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import SidePanel from "./SidePanel/SidePanel";
import ChatPanel from "./ChatPanel/ChatPanel";
import CurrentRoomContext from "../context/CurrentRoomContext";
import "./ChatApp.css";

const ChatApp = () => {
  // use null in production after Room Selected Logic
  const [currentRoom, setCurrentRoom] = useState(null);

  return (
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
          <Box
            sx={{
              backgroundColor: "#3c2f3e",
              padding: { xs: "0", md: "1rem" },
              color: "white",
              height: "100%",
              display: "grid",
              gridTemplateRows: "1fr minmax(0,9fr)",
              minHeight: 0,
              minWidth: 0,
            }}
          >
            <SidePanel />
          </Box>
        </Box>
        <Box item={true} sx={{ height: "100%", minHeight: 0, minWidth: 0 }}>
          {currentRoom ? (
            <ChatPanel />
          ) : (
            <h3 style={{ padding: "1rem" }}>Please select a room</h3>
          )}
        </Box>
      </CurrentRoomContext.Provider>
    </Grid>
  );
};

export default ChatApp;
