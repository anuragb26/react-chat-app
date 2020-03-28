import React, { useState, useContext } from "react";
import { Header, Icon, Form, Button, Segment } from "semantic-ui-react";
import { appName, appIconName } from "../../config/constants";
import UserContext from "../../context/UserContext";
import firebase from "../../config/firebase";
import "./Login.css";

const Login = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = event => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(loggedInUser => {
        console.log("loggedInUser", loggedInUser);
        setUser({
          displayName: loggedInUser.user.displayName,
          uid: loggedInUser.user.uid,
          photoURL: loggedInUser.user.photoURL
        });
        history.push("/");
      })
      .catch(err => {
        console.log("err", err);
      });
  };
  return (
    <div className="Login">
      <Segment stacked>
        <Header as="h2" color="black">
          <Icon name={appIconName} />
          Login to {appName}
        </Header>
        <Form onSubmit={login}>
          <Form.Input
            icon="mail"
            placeholder="E-mail address"
            value={email}
            iconPosition="left"
            type="email"
            onChange={evt => setEmail(evt.target.value)}
          />
          <Form.Input
            icon="lock"
            value={password}
            iconPosition="left"
            type="password"
            placeholder="Password"
            onChange={evt => setPassword(evt.target.value)}
          />
          <Button size="large" fluid color="black" type="submit">
            Login
          </Button>
        </Form>
      </Segment>
    </div>
  );
};

export default Login;
