import React from "react";
import "./Messages.css";

const Messages = ({ messages }) => {
  const messageElements = (
    <ul>
      {messages.map((item, index) => (
        <li key={index}>{item.text}</li>
      ))}
    </ul>
  );
  return <div className={"Messages"}>{messageElements}</div>;
};

export default Messages;
