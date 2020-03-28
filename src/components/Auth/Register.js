import React, { useContext, useState } from "react";
import { Header, Icon, Form, Button } from "semantic-ui-react";
import { appName, appIconName } from "../../config/constants";
import UserContext from "../../context/UserContext";
import firebase from "../../config/firebase";
import "./Register.css";

const Register = () => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const register = evt => {
    evt.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        console.log("createdUser", createdUser);
        // add user to firebase
      });
  };
  return (
    <div className="Register">
      <Header as="h2" color="black">
        <Icon name={appIconName} />
        Register to {appName}
      </Header>
      <Form onSubmit={register}>
        <Form.Input
          icon="user"
          placeholder="Display Name"
          iconPosition="left"
          value={displayName}
          type="text"
          onChange={evt => setDisplayName(evt.target.value)}
        />
        <Form.Input
          icon="mail"
          placeholder="E-mail address"
          value={email}
          iconPosition="left"
          type="email"
          value={email}
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
        <Form.Input
          icon="file image"
          value={photoURL}
          iconPosition="left"
          placeholder="Avatar URL"
          type="url"
          onChange={evt => setPhotoURL(evt.target.value)}
        />
        <Button size="large" fluid color="black" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
