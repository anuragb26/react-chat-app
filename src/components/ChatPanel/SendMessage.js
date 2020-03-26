import React from "react";
import "./SendMessage.css";

const SendMessage = ({ messagesRefFirebase }) => {
  return (
    <div className="SendMessage">
      <input type="text" placeholder="insert message" />
      <button
        onClick={() => {
          messagesRefFirebase
            .child("id2")
            .set({ text: "Some text" })
            .then(msg => console.log(`set success: ${msg}`))
            .catch(err => console.log(`set error: ${err}`));
        }}
      >
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
