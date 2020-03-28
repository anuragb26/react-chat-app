import React from "react";
import { Header, Icon } from "semantic-ui-react";
import UserMenu from "../UserMenu";
import Rooms from "../Rooms";
import { appName, appIconName } from "../../config/constants";
import "./SidePanel.css";

const SidePanel = () => {
  return (
    <div className="SidePanel">
      <Header inverted as="h2">
        <Icon name={appIconName} />
        {appName}
      </Header>
      <UserMenu />
      <Rooms />
    </div>
  );
};

export default SidePanel;
