import React, { useContext, useState } from "react";
import {
  Header,
  Icon,
  Form,
  Button,
  Segment,
  Message
} from "semantic-ui-react";
import { appName, appIconName } from "../../config/constants";
import UserContext from "../../context/UserContext";
import firebase from "../../config/firebase";
import { validateRegister } from "../../validators/authValidator";
import useForm from "../../customHooks/useForm";
import "./Register.css";

const INITIAL_VALUES = {
  email: { value: "", touched: false },
  password: { value: "", touched: false },
  displayName: { value: "", touched: false }
};

const getRandomLegoDisplayPic = () =>
  `https://randomuser.me/api/portraits/lego/${Math.floor(
    Math.random() * 9
  )}.jpg`;

const Register = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const { values, errors, handleChange, handleSubmit } = useForm(
    INITIAL_VALUES,
    validateRegister,
    register
  );

  const [firebaseError, setFirebaseError] = useState("");
  async function register() {
    const {
      email: { value: emailVal },
      password: { value: passwordVal },
      displayName: { value: displayNameVal }
    } = values;

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailVal, passwordVal);
      const photoURL = getRandomLegoDisplayPic();
      await createdUser.user.updateProfile({
        displayName: displayNameVal,
        photoURL
      });
      setUser({
        displayName: displayNameVal,
        photoURL,
        uid: createdUser.user.uid
      });
      history.push("/");
    } catch (err) {
      setFirebaseError(err);
    }
    /*
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(createdUser => {
        createdUser.user.updateProfile({ displayName, photoURL }).then(() => {
          setUser({ displayName, photoURL, uid: createdUser.user.uid });
          history.push("/");
        });
        // add user to firebase
      });
      */
  }

  const showError = (error, key) =>
    values[key].touched && error[key] ? (
      <Message negative>{error[key]}</Message>
    ) : null;

  return (
    <div className="Register">
      <Segment stacked>
        <Header as="h2" color="black">
          <Icon name={appIconName} />
          Register to {appName}
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Input
            icon="user"
            placeholder="Display Name"
            iconPosition="left"
            value={values.displayName.value}
            type="text"
            name="displayName"
            onChange={handleChange}
          />
          {showError(errors, "displayName")}
          <Form.Input
            icon="mail"
            placeholder="E-mail address"
            value={values.email.value}
            iconPosition="left"
            type="email"
            name="email"
            onChange={handleChange}
          />
          {showError(errors, "email")}
          <Form.Input
            icon="lock"
            value={values.password.value}
            iconPosition="left"
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          {showError(errors, "password")}

          <Button
            size="large"
            fluid
            color="black"
            type="submit"
            disabled={
              Object.keys(errors).length > 0 ||
              Object.keys(values)
                .map(val => values[val].touched)
                .every(touched => !touched)
            }
          >
            Register
          </Button>
          {firebaseError ? <Message>{firebaseError}</Message> : null}
        </Form>
      </Segment>
    </div>
  );
};

export default Register;
