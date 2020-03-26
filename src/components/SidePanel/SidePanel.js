import React from "react";
import User from "../User";
import Rooms from "../Rooms";

import "./SidePanel.css";

const SidePanel = () => {
  return (
    <div className="SidePanel">
      <div>Chat App Header</div>
      <User />
      <Rooms />
    </div>
  );
};

export default SidePanel;
