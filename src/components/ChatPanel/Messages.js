import React from "react";
import moment from "moment";
import "./Messages.css";

const Messages = ({ messages }) => {
  const messageElements = (
    <ul>
      {messages.map((item, index) => (
        <li key={index}>
          {item.text} {item.user.displayName} {moment(item.timestamp).fromNow()}
        </li>
      ))}
    </ul>
  );
  return <div className={"Messages"}>{messageElements}</div>;
};

export default Messages;
