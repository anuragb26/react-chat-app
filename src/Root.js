import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import ChatApp from "./components/ChatApp";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UserContext from "./context/UserContext";
import firebase from "./config/firebase";

const Root = () => {
  const history = useHistory();
  const [user, setUser] = useState({ displayName: "", uid: "", photoURL: "" });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { displayName, uid, photoURL } = user;
        setUser({ displayName, uid, photoURL });
        history.push("/");
        // navigate to /
      } else {
        history.push("/login");
        // navigate to login
      }
    });
  }, [history]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Switch>
        <Route exact path="/" component={ChatApp} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </UserContext.Provider>
  );
};

export default Root;
