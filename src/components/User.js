import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const User = () => {
  const { user } = useContext(UserContext);
  return <h4>{user.displayName}</h4>;
};

export default User;
