import React, { useState, useContext } from "react";
import {
  Header,
  Icon,
  Form,
  Button,
  Segment,
  Message
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { appName, appIconName } from "../../config/constants";
import UserContext from "../../context/UserContext";
import { validateLogin } from "../../validators/authValidator";
import useForm from "../../customHooks/useForm";
import firebase from "../../config/firebase";
import "./Login.css";

const INITIAL_VALUES = {
  email: { value: "", touched: false },
  password: { value: "", touched: false }
};
const Login = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const {
    values,
    errors,
    handleChange,
    // handleBlur,
    handleSubmit
  } = useForm(INITIAL_VALUES, validateLogin, login);

  const [firebaseError, setFirebaseError] = useState("");
  async function login() {
    try {
      const {
        email: { value: emailVal },
        password: { value: passwordVal }
      } = values;
      const loggedInUser = await firebase
        .auth()
        .signInWithEmailAndPassword(emailVal, passwordVal);
      setUser({
        displayName: loggedInUser.user.displayName,
        uid: loggedInUser.user.uid,
        photoURL: loggedInUser.user.photoURL
      });
      history.push("/");
    } catch (err) {
      setFirebaseError(err.message);
    }
  }

  const showError = (error, key) =>
    values[key].touched && error[key] ? (
      <Message negative>{error[key]}</Message>
    ) : null;

  return (
    <div className="Login">
      <div>
        <Segment stacked>
          <Header as="h2" color="black">
            <Icon name={appIconName} />
            Login to {appName}
          </Header>
          <Form onSubmit={handleSubmit}>
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
              name="password"
              placeholder="Password"
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
              Login
            </Button>
          </Form>
          {firebaseError ? <Message>{firebaseError}</Message> : null}
        </Segment>
        <Message>
          New to us ?<Link to="/register"> Register</Link>
        </Message>
      </div>
    </div>
  );
};

export default Login;
