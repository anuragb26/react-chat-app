import React, { useRef, useEffect, useContext } from "react";
import moment from "moment";
import { Avatar, Box } from "@mui/material";
import ThemeContext from "../../context/ThemeContext";
import "./Messages.css";

const Messages = ({ messages }) => {
  const { theme } = useContext(ThemeContext);
  const messageElements = messages.map((item, index) => (
    <Box
      key={index}
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        marginBottom: "0.5rem",
        marginTop: "0.5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Avatar
          src={item.user.photoURL}
          alt="avatar"
          sx={{ width: "40px", height: "40px" }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", flexGrow: "3" }}>
        <div className="display-name">{item.user.displayName}</div>
        <div className="time-stamp">{moment(item.timestamp).fromNow()}</div>
        <div className="text">{item.text}</div>
      </div>
    </Box>
  ));
  const messageEndRef = useRef();
  useEffect(() => {
    messageEndRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageElements]);

  return (
    <div className="message-wrapper" style={theme.message}>
      {messageElements}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default Messages;
