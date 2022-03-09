import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { Typography, Grid, Box } from "@mui/material";
import UserMenu from "../UserMenu";
import Rooms from "../Rooms";
import { appName, appIconName } from "../../config/constants";
import "./SidePanel.css";

const SidePanel = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          gap: "5px",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <ChatIcon />
        </div>
        <div style={{ flexGrow: 2 }}>
          <Typography variant="h5">{appName}</Typography>
        </div>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <UserMenu />
        <Rooms />
      </Box>
    </React.Fragment>
  );
};

export default SidePanel;
