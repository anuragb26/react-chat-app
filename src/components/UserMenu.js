import React, { useContext } from "react";
import { Avatar, Select, MenuItem, Box } from "@mui/material";
import UserContext from "../context/UserContext";
import CurrentRoomContext from "../context/CurrentRoomContext";
import firebase from "../config/firebase";
import "./UserMenu.css";

const UserMenu = () => {
  const { user } = useContext(UserContext);
  const { setCurrentRoom } = useContext(CurrentRoomContext);
  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logout success");
        setCurrentRoom("");
      })
      .catch(() => {});
  };
  const handleChange = (event) => {
    if (event.target.value === "logout") {
      logout();
    }
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "row" }}>
      <Avatar
        src={user.photoURL}
        alt="avatar"
        sx={{ width: "30px", height: "30px" }}
      />
      <Select
        value={user.displayName}
        label={user.displayName}
        sx={{
          color: "white",
          "& .MuiSelect-select": {
            border: "0px",
            paddingRight: "4px",
            paddingLeft: "8px",
            paddingTop: "0px",
            paddingBottom: "0px",
          },
          "& fieldset": {
            border: "0",
          },
          "& svg": {
            color: "white",
          },
        }}
        onChange={handleChange}
        MenuProps={{
          PaperProps: { sx: { "& .MuiList-root": {} } },
        }}
      >
        <MenuItem
          value={user.displayName}
          label={user.displayName}
          style={{ display: "none" }}
        >
          {user.displayName}
        </MenuItem>
        <MenuItem value="logout">Logout</MenuItem>
      </Select>
    </Box>
  );
};

export default UserMenu;
