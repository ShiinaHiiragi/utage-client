import React from "react";
import ReactDOM from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import SignIn from "./SignIn";

const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: "none"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  snack: {
    userSelect: "none",
    maxWidth: "40vw",
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SignUp() {
  const classes = useStyles();
  const [formContent, setFormContent] = React.useState({
    email: "",
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = React.useState(false);

  // snack windows of any hints
  const [snackWindow, setSnackWindow] = React.useState(false);
  const [snackWindowType, setSnackWindowType] = React.useState("");
  const [snackWindowMessage, setSnackWindowMessage] = React.useState("");
  const snackWindowToggle = (type, message) => {
    setSnackWindowType(type);
    setSnackWindowMessage(message);
    setSnackWindow(true);
  };
  const snackWindowClose = () => {
    setSnackWindow(false);
  };

  // handle of form input
  const handlePasswordInput = (event, prop) => {
    setFormContent((formContent) => ({
      ...formContent,
      password: event.target.value
    }));
  };
  const handleEmailInput = (event, prop) => {
    setFormContent((formContent) => ({
      ...formContent,
      email: event.target.value
    }));
  };
  const handleUsernameInput = (event, prop) => {
    setFormContent((formContent) => ({
      ...formContent,
      username: event.target.value
    }));
  };

  // handle of buttons
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleButtonClick = () => {
    if (
      formContent.email === "" ||
      formContent.password === "" ||
      formContent.username === ""
    ) {
      snackWindowToggle("error", "Please enter all the information needed.");
      return;
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(formContent.email)) {
      snackWindowToggle("error", "Unsupported E-mail Address.");
      return;
    } else if (!/^[\x0-\x7F]*$/.test(formContent.username)) {
      snackWindowToggle("error", "Your username contains illegal characters.");
      return;
    } else if (formContent.password.length < 8) {
      snackWindowToggle("error", "Your password is too short.");
      return;
    }

    backdropToggle();
    // TODO: complete sign in behavior here
    // TEMP: delete setTimeout later
    setTimeout(() => {
      backdropClose();
      ReactDOM.render(
        <SignIn snack={true} account={formContent.email} />,
        document.getElementById("root")
      );
    }, 2000);
  };

  // the backdrop when communicate with server
  const [backdrop, setBackdrop] = React.useState(false);
  const backdropToggle = () => {
    setBackdrop(true);
  };
  const backdropClose = () => {
    setBackdrop(false);
  };

  // dialogue of copyright infomation
  const [copyrightInfoWindow, setCopyrightInfoWindow] = React.useState(false);
  const copyrightInfoToggle = () => {
    setCopyrightInfoWindow(true);
  };
  const copyrightInfoClose = () => {
    setCopyrightInfoWindow(false);
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.noneSelect}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <OpenInBrowserIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up to Utage
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                onChange={handleEmailInput}
                label="Email Address"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Username</InputLabel>
                <OutlinedInput
                  id="username"
                  onChange={handleUsernameInput}
                  fullWidth
                  labelWidth={70}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  We only support ASCII characters in usernames.
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={formContent.password}
                  onChange={handlePasswordInput}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
                <FormHelperText id="outlined-weight-helper-text">
                  The password should contain at least eight characters.
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleButtonClick}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="#!"
                onClick={() => {
                  ReactDOM.render(<SignIn />, document.getElementById("root"));
                }}
                variant="body2"
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="#!" onClick={copyrightInfoToggle}>
            Utage
          </Link>
          {" " + new Date().getFullYear() + "."}
        </Typography>

        <Dialog
          open={copyrightInfoWindow}
          onClose={copyrightInfoClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={classes.noneSelect}
        >
          <DialogTitle id="alert-dialog-title">{`MIT License\nCopyright ${new Date().getFullYear()} Utage`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Permission is hereby granted, free of charge, to any person
              obtaining a copy of this software and associated documentation
              files (the "Software"), to deal in the Software without
              restriction, including without limitation the rights to use, copy,
              modify, merge, publish, distribute, sublicense, and/or sell copies
              of the Software, and to permit persons to whom the Software is
              furnished to do so, subject to the following conditions:
              <br />
              <br />
              The above copyright notice and this permission notice shall be
              included in all copies or substantial portions of the Software.
              <br />
              <br />
              THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={copyrightInfoClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Snackbar
        open={snackWindow}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={snackWindowClose}
        className={classes.snack}
      >
        <Alert onClose={snackWindowClose} severity={snackWindowType}>
          {snackWindowMessage}
        </Alert>
      </Snackbar>
      <Backdrop className={classes.backdrop} open={backdrop}>
        <CircularProgress color="inherit" size={56} />
      </Backdrop>
    </Container>
  );
}
