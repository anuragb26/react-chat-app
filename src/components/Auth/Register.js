import React, { useContext, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Input,
  FormControl,
  Alert,
  Button,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import { StyledPaper } from "../common/Paper";
import { appName } from "../../config/constants";
import UserContext from "../../context/UserContext";
import firebase from "../../config/firebase";
import { validateRegister } from "../../validators/authValidator";
import useForm from "../../customHooks/useForm";
import "./Register.css";

const INITIAL_VALUES = {
  email: { value: "", touched: false },
  password: { value: "", touched: false },
  displayName: { value: "", touched: false },
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
      displayName: { value: displayNameVal },
    } = values;

    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(emailVal, passwordVal);
      const photoURL = getRandomLegoDisplayPic();
      await createdUser.user.updateProfile({
        displayName: displayNameVal,
        photoURL,
      });
      setUser({
        displayName: displayNameVal,
        photoURL,
        uid: createdUser.user.uid,
      });
      history.push("/");
    } catch (err) {
      setFirebaseError(err.message);
    }
  }

  return (
    <Container sx={{ display: "flex" }} className="register">
      <StyledPaper elevation={12} color={"red"}>
        <Container maxWidth="sm">
          <Grid container={true} sx={{ marginBottom: "8px" }}>
            <Grid item={true} xs={1} sx={{ position: "relative", top: "4px" }}>
              <ChatIcon />
            </Grid>
            <Grid item={true} xs={11}>
              <Typography variant="h5" component="h5">
                Register to {appName}
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
              <Grid
                item={true}
                xs={1}
                sx={{ mb: "8px", position: "relative", top: "4px" }}
              >
                {<PersonIcon />}
              </Grid>
              <Grid item={true} xs={11} sx={{ mb: "8px" }}>
                <FormControl fullWidth={true}>
                  <Input
                    placeholder="Display Name"
                    value={values.displayName.value}
                    type="text"
                    name="displayName"
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
                  fullWidth={true}
                  disabled={
                    Object.keys(errors).length > 0 ||
                    Object.keys(values)
                      .map((val) => values[val].touched)
                      .every((touched) => !touched)
                  }
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
          {firebaseError ? (
            <Alert severity="error">{firebaseError}</Alert>
          ) : null}
        </Container>
      </StyledPaper>
    </Container>
  );
};

export default Register;
