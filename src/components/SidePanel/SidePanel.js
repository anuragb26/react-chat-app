import React from "react";
import User from "../User";
import Rooms from "../Rooms";
import { Header, Icon } from "semantic-ui-react";
import "./SidePanel.css";

const SidePanel = () => {
  return (
    <div className="SidePanel">
      <Header inverted as="h2">
        <Icon name="wechat" />
        Chat App
      </Header>
      <User />
      <Rooms />
    </div>
  );
};

export default SidePanel;
