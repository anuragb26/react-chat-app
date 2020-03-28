import React, { useContext } from "react";
import { Dropdown } from "semantic-ui-react";
import UserContext from "../context/UserContext";
import CurrentRoomContext from "../context/CurrentRoomContext";
import { Image } from "semantic-ui-react";
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

  return (
    <div className="User">
      <Image src={user.photoURL} avatar />
      <Dropdown text={user.displayName} as="h4">
        <Dropdown.Menu>
          <Dropdown.Item onClick={logout} text="Logout" />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
