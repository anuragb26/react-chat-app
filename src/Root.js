import React from "react";
import { Switch, Route } from "react-router-dom";
import ChatApp from "./components/ChatApp";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

const Root = () => {
  return (
    <Switch>
      <Route exact path="/" component={ChatApp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

export default Root;
