import React from "react";
import ReactDOM from "react-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import DvrIcon from "@material-ui/icons/Dvr";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import Panel from "./Panel";
import SignUp from "./SignUp";
import hex_hmac_md5 from "../Lib/MD5";

const fs = window.require("fs");
const request = window.require("request");
const settingPath = "./data/setting.json";
let globalSetting = JSON.parse(fs.readFileSync(settingPath));

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
    width: "100%",
    marginTop: theme.spacing(1)
  },
  buttonGroup: {
    margin: theme.spacing(2, 0, 2)
  },
  snack: {
    maxWidth: "40vw",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function checkURL(stringURL, callback) {
  if (stringURL.charAt(stringURL.length - 1) !== "/")
    stringURL += "/";
  request({
    url: `${stringURL}who`,
    timeout: 10000
  }, (err, res, body) => {
    if (!err && res.statusCode === 200 && body === "utage")
      callback(null, stringURL);
    else callback(err, null);
  });
}

function saveSetting(callback) {
  fs.writeFile(settingPath, JSON.stringify(globalSetting), callback);
}

export default function SignIn(props) {
  // using style defined in the front
  const styleClass = useStyles();

  // proxyWindowStatus: is window of setting IP on?
  // proxyNow: the value of input in the window of setting IP.
  const [proxyWindow, setProxyWindow] = React.useState(false);
  const [proxyInput, setProxyInput] = React.useState(globalSetting.proxy);
  const proxyWindowToggle = () => {
    setProxyWindow(true);
  };
  const proxyWindowCancel = () => {
    setProxyWindow(false);
  };
  const proxyWindowSubmit = (newValue) => {
    checkURL(newValue, (err, newString) => {
      if (!err) {
        var proxyHasChanged = globalSetting.proxy !== newValue;
        setProxyWindow(false);
        globalSetting.proxy = newString;
        saveProxySetting(proxyHasChanged);
      } else
      snackWindowToggle("error", "Cannot connect to server. Please recheck your input.");
    });
  };
  const proxyUpdateInput = (event) => {
    setProxyInput(event.target.value);
  };
  const saveProxySetting = (changed) => {
    saveSetting((err) => {
      if (err)
        snackWindowToggle(
          "error",
          "An error occurred when saving server value. Please try again later."
        );
      else if (changed)
        snackWindowToggle(
          "success",
          "The server domain/IP has been changed successfully."
        );
    });
  };

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

  // special snack
  const [specialSnack, setSpecialSnack] = React.useState(props.snack);
  const handleSpecialSnackClose = () => {
    setSpecialSnack(false);
  };

  // checkbox of remember account
  const [rememberAccount, setRememberAccount] = React.useState(
    globalSetting.remember
  );
  const rememberAccountChange = (event) => {
    setRememberAccount(event.target.checked);
    globalSetting.remember = event.target.checked;
    saveSetting(() => {
      if (globalSetting.remember)
        snackWindowToggle("success", "The account will be remembered.");
    });
  };

  // dialogue of copyright infomation
  const [copyrightInfoWindow, setCopyrightInfoWindow] = React.useState(false);
  const copyrightInfoToggle = () => {
    setCopyrightInfoWindow(true);
  };
  const copyrightInfoClose = () => {
    setCopyrightInfoWindow(false);
  };

  // when sign in button are pressed
  const [email, setEmail] = React.useState(
    props.account
      ? props.account
      : globalSetting.remember
      ? globalSetting.account
      : ""
  );
  const [password, setPassword] = React.useState("");
  const emailInput = (event) => {
    setEmail(event.target.value);
  };
  const passwordInput = (event) => {
    setPassword(event.target.value);
  };
  const signInClick = () => {
    if (email === "" || password === "") {
      snackWindowToggle("error", "Please enter the account and password.");
      return;
    } else if (globalSetting.remember) {
      globalSetting.account = email;
      saveSetting(() => {});
    }
    backdropToggle();
    checkURL(globalSetting.proxy, (err) => {
      if (err)
      {
        backdropClose();
        snackWindowToggle("error", `${err}`);
      }
      else connectServer(email, password);
    });
  };

  const connectServer = (account, password) => {
    // TODO: change sign in behavior here
    initDB({
      email: account,
      password: hex_hmac_md5(account, password)
    }, () => {
      backdropClose();
      ReactDOM.render(<Panel />, document.getElementById("root"));
    });
  };

  // the backdrop when communicate with server
  const [backdrop, setBackdrop] = React.useState(false);
  const backdropToggle = () => {
    setBackdrop(true);
  };
  const backdropClose = () => {
    setBackdrop(false);
  };

  const initDB = (info, callback) => {
  };

  const handleSignUp = () => {
    ReactDOM.render(<SignUp />, document.getElementById("root"));
  };

  return (
    <Container component="main" maxWidth="xs" className={styleClass.noneSelect}>
      <CssBaseline />
      <div className={styleClass.paper}>
        <Avatar className={styleClass.avatar}>
          <DvrIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in to Utage
        </Typography>
        <form className={styleClass.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="E-mail Address"
            name="email"
            autoComplete="email"
            autoFocus
            defaultValue={email}
            onChange={emailInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            defaultValue={password}
            onChange={passwordInput}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberAccount}
                color="primary"
                onChange={rememberAccountChange}
              />
            }
            label="Remember my E-mail Address"
          />
          <Grid container>
            <ButtonGroup
              fullWidth
              className={styleClass.buttonGroup}
              variant="contained"
              color="primary"
              aria-label="contained primary button group"
            >
              <Button onClick={proxyWindowToggle}>Switch Server</Button>
              <Button onClick={signInClick}>Sign In</Button>
            </ButtonGroup>
            <Dialog
              className={styleClass.noneSelect}
              open={proxyWindow}
              onClose={proxyWindowCancel}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Switch Server</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To connect to our server, please enter the domain or IP of the
                  server. The defualt value of the IP is http://localhost:8080/.
                </DialogContentText>
                <TextField
                  autoFocus
                  defaultValue={globalSetting.proxy}
                  onChange={proxyUpdateInput}
                  margin="dense"
                  id="name"
                  label="Server Domain/IP"
                  type="url"
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={proxyWindowCancel} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => proxyWindowSubmit(proxyInput)}
                  color="primary"
                  type="submit"
                >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            <Snackbar
              open={snackWindow}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              autoHideDuration={globalSetting.snackWindowDuration}
              onClose={snackWindowClose}
              className={styleClass.snack}
            >
              <Alert onClose={snackWindowClose} severity={snackWindowType}>
                {snackWindowMessage}
              </Alert>
            </Snackbar>
          </Grid>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">{"Forgot password?"}</Link> */}
            </Grid>
            <Grid item>
              <Link href="#!" onClick={handleSignUp} variant="body2">
                {"Don't have an account? Sign Up"}
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
          className={styleClass.noneSelect}
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
        <Snackbar
          open={specialSnack}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={globalSetting.snackWindowDuration}
          onClose={handleSpecialSnackClose}
        >
          <Alert onClose={snackWindowClose} severity="success">
            {"Your account has been created successfully. You can sign in now."}
          </Alert>
        </Snackbar>
        <Backdrop className={styleClass.backdrop} open={backdrop}>
          <CircularProgress color="inherit" size={56} />
        </Backdrop>
      </Box>
    </Container>
  );
}
