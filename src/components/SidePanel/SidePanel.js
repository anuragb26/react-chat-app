import React from "react";
import User from "../User";
import Rooms from "../Rooms";

import "./SidePanel.css";

const SidePanel = () => {
  return (
    <div className="SidePanel">
      <h2>Chat App</h2>
      <User />
      <Rooms />
    </div>
  );
};

export default SidePanel;
