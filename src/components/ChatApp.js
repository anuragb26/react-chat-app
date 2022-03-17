import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import SidePanel from "./SidePanel/SidePanel";
import CurrentRoomContext from "../context/CurrentRoomContext";
import ThemeProvider from "../Providers/ThemeProviders";
import Panel from "./Panel";
import "./ChatApp.css";

const ChatApp = () => {
  // use null in production after Room Selected Logic
  const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <ThemeProvider>
      <React.Fragment>
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
            <Panel currentRoom={currentRoom} />
          </CurrentRoomContext.Provider>
        </Grid>
      </React.Fragment>
    </ThemeProvider>
  );
};

export default ChatApp;
