import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const User = () => {
  const { user } = useContext(UserContext);
  return <div>{user.displayName}</div>;
};

export default User;
