import React, { useContext, useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import { Typography, Box, FormControlLabel } from "@mui/material";
import { MaterialUISwitch } from "../ThemeSwitch";
import UserMenu from "../UserMenu";
import Rooms from "../Rooms";
import { appName } from "../../config/constants";
import ThemeContext from "../../context/ThemeContext";
import "./SidePanel.css";

const SidePanel = () => {
  const [checked, setChecked] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleChange = () => {
    setChecked(!checked);
    toggleTheme();
  };
  return (
    <Box
      sx={{
        padding: { xs: "0", md: "1rem" },
        height: "100%",
        display: "grid",
        gridTemplateRows: "1fr 1fr minmax(0,18fr)",
        minHeight: 0,
        minWidth: 0,
        ...theme.sidePanel,
      }}
    >
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          gap: "5px",
          flexDirection: "row",
        }}
      >
        <div className="switch-wrap">
          <FormControlLabel
            control={
              <MaterialUISwitch
                color="primary"
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label=""
          />
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          gap: "5px",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ChatIcon />
        </div>
        <div
          style={{
            flexGrow: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">{appName}</Typography>
        </div>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
      >
        <UserMenu />
        <Rooms />
      </Box>
    </Box>
  );
};

export default SidePanel;
