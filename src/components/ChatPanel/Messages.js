import React, { useRef, useEffect } from "react";
import moment from "moment";
import { Comment } from "semantic-ui-react";
import "./Messages.css";

const Messages = ({ messages }) => {
  const messageElements = (
    <Comment.Group>
      {messages.map((item, index) => (
        <Comment key={index}>
          <Comment.Avatar src={item.user.photoURL} />
          <Comment.Content>
            <Comment.Author>{item.user.displayName}</Comment.Author>
            <Comment.Metadata>
              {moment(item.timestamp).fromNow()}
            </Comment.Metadata>
            <Comment.Text>{item.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
  const messageEndRef = useRef();
  useEffect(() => {
    messageEndRef.current.scrollIntoView({
      behavior: "smooth"
    });
  }, [messageElements]);

  return (
    <div className="MessageWrapper">
      <div className={"Messages"}>{messageElements}</div>
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default Messages;
