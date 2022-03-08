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
    <Grid container={true} sx={{ height: "100vh" }}>
      <CurrentRoomContext.Provider value={{ currentRoom, setCurrentRoom }}>
        <Grid
          item={true}
          sx={{ height: "100%", flexGap: "10px" }}
          xs={3}
          sm={1}
        >
          <Box
            sx={{
              backgroundColor: "#3c2f3e",
              padding: { xs: "0", md: "1rem" },
              color: "white",
              height: "100%",
              display: "grid",
              gridTemplateRows: "1fr 9fr",
            }}
          >
            <SidePanel />
          </Box>
        </Grid>
        <Grid item={true} sx={{ height: "100%" }} xs={9} sm={11}>
          {currentRoom ? <ChatPanel /> : <h3>Please select a room</h3>}
        </Grid>
      </CurrentRoomContext.Provider>
    </Grid>
  );
};

export default ChatApp;
