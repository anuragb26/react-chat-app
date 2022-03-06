import React, { useState, useContext } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Input,
  FormControl,
  Button,
  Alert,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import { Link } from "react-router-dom";
import { appName } from "../../config/constants";
import UserContext from "../../context/UserContext";
import { validateLogin } from "../../validators/authValidator";
import useForm from "../../customHooks/useForm";
import firebase from "../../config/firebase";
import "./Login.css";

const INITIAL_VALUES = {
  email: { value: "", touched: false },
  password: { value: "", touched: false },
};
const Login = ({ history }) => {
  const { setUser } = useContext(UserContext);
  const { values, errors, handleChange, handleSubmit } = useForm(
    INITIAL_VALUES,
    validateLogin,
    login
  );

  const [firebaseError, setFirebaseError] = useState("");
  async function login() {
    try {
      const {
        email: { value: emailVal },
        password: { value: passwordVal },
      } = values;
      const loggedInUser = await firebase
        .auth()
        .signInWithEmailAndPassword(emailVal, passwordVal);

      setUser({
        displayName: loggedInUser.user.displayName,
        uid: loggedInUser.user.uid,
        photoURL: loggedInUser.user.photoURL,
      });
      history.push("/");
    } catch (err) {
      setFirebaseError(err.message);
    }
  }
  return (
    <Container maxWidth="sm" sx={{ display: "flex" }} className="login">
      <div>
        <Paper
          elevation={12}
          sx={{ paddingTop: "16px", paddingBottom: "16px" }}
        >
          <Container maxWidth="sm">
            <Grid container={true} sx={{ marginBottom: "8px" }}>
              <Grid
                item={true}
                xs={1}
                sx={{ position: "relative", top: "8px" }}
              >
                <ChatIcon />
              </Grid>
              <Grid item={true} xs={11}>
                <Typography variant="h4" component="h4">
                  {appName}
                </Typography>
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              <Grid container={true}>
                <Grid
                  item={true}
                  xs={1}
                  sx={{ mb: "8px", position: "relative", top: "4px" }}
                >
                  <EmailIcon />
                </Grid>
                <Grid item={true} xs={11} sx={{ mb: "8px" }}>
                  <FormControl fullWidth={true}>
                    <Input
                      placeholder="E-mail address"
                      value={values.email.value}
                      type="email"
                      name="email"
                      onChange={handleChange}
                      fullWidth={true}
                    />
                  </FormControl>
                </Grid>
                <Grid
                  item={true}
                  xs={1}
                  sx={{ mb: "8px", position: "relative", top: "4px" }}
                >
                  <PasswordIcon />
                </Grid>
                <Grid item={true} xs={11} sx={{ mb: "8px" }}>
                  <FormControl fullWidth={true}>
                    <Input
                      value={values.password.value}
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                      fullWidth={true}
                    />
                  </FormControl>
                </Grid>
                <Grid item={true} xs={12} sx={{ mb: "8px" }}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      bgcolor: "black",
                      ":hover": {
                        backgroundColor: "black",
                      },
                    }}
                    disabled={
                      Object.keys(errors).length > 0 ||
                      Object.keys(values)
                        .map((val) => values[val].touched)
                        .every((touched) => !touched)
                    }
                    fullWidth={true}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </form>
            {firebaseError ? (
              <Alert severity="error">{firebaseError}</Alert>
            ) : null}
          </Container>
        </Paper>
        <Alert
          severity="info"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          New to us ?<Link to="/register"> Register</Link>
        </Alert>
      </div>
    </Container>
  );
};

export default Login;
