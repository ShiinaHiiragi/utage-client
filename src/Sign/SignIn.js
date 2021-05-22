import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const fs = window.require('fs');
var signInSetting = JSON.parse(fs.readFileSync('./file/SignInSetting.json'));

const useStyles = makeStyles((theme) => ({
  noneSelect: {
    userSelect: 'none',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  buttonGroup: {
    margin: theme.spacing(2, 0, 2),
  },
  snack: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// TODO: check the validity of the URL input if possible.
function checkURL(stringURL) {
  return true;
}

export default function SignIn() {
  const styleClass = useStyles();

  // proxyWindowStatus: is window of setting IP on?
  // proxyNow: the value of input in the window of setting IP.
  const [proxyWindowStatus, setProxyWindowStatus] = React.useState(false);
  const [proxyNow, setProxyNow] = React.useState(signInSetting.proxy);
  const proxyWindowOpen = () => { setProxyWindowStatus(true); };
  const proxyWindowCancel = () => { setProxyWindowStatus(false); };
  const proxyWindowSubmit = (newValue) => {
    if (checkURL(newValue))
    {
      setProxyWindowStatus(false);
      signInSetting.proxy = newValue;
      saveSetting();
    }
    else snackWindowToggle('error', 'Invalid URL, please recheck your input.');
  };
  const proxyUpdateInputValue = (event) => { setProxyNow(event.target.value); }
  const saveSetting = () => {
    fs.writeFile("./file/SignInSetting.json", JSON.stringify(signInSetting), (err) => {
      if (err) snackWindowToggle('error', 'An error occurred when saving server value. Please try again later.');
      else snackWindowToggle('success', 'The server domain/IP has been changed successfully.');
    })
  };

  const [snackWindow, setSnackWindow] = React.useState(false);
  const [snackWindowType, setSnackWindowType] = React.useState('');
  const [snackWindowMessage, setSnackWindowMessage] = React.useState('');
  const snackWindowToggle = (type, message) => {
    setSnackWindowType(type);
    setSnackWindowMessage(message);
    setSnackWindow(true);
  };
  const snackWindowClose = () => { setSnackWindow(false); };

  const [rememberAccountSwitch, setRememberAccountSwitch] = React.useState(signInSetting.remember);
  const rememberAccountMemoryChange = (event) => {
    setRememberAccountSwitch(event.target.checked);
    signInSetting.remember = event.target.checked;
    fs.writeFile("./file/SignInSetting.json", JSON.stringify(signInSetting), () => {
      if (signInSetting.remember) snackWindowToggle('success', 'The account will be remembered. Please do it on private PC.');
    })
  };

  return (
    <Container component="main" maxWidth="xs" className={styleClass.noneSelect}>
      <CssBaseline />
      <div className={styleClass.paper}>
        <Avatar className={styleClass.avatar}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">Sign in to Utage</Typography>
        <form className={styleClass.form} noValidate>
          <TextField variant="outlined" margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus defaultValue={signInSetting.remember ? signInSetting.account : ''}/>
          <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password"/>
          <FormControlLabel control={<Checkbox checked={rememberAccountSwitch} color="primary" onChange={rememberAccountMemoryChange} />} label="Remember my Account"/>
          <Grid container>
          <ButtonGroup fullWidth className={styleClass.buttonGroup} variant="contained" color="primary" aria-label="contained primary button group">
            <Button onClick={proxyWindowOpen}>Switch Server</Button>
            <Button type="submit">Sign In</Button>
          </ButtonGroup>
          <Dialog className={styleClass.noneSelect} open={proxyWindowStatus} onClose={proxyWindowCancel} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Switch Server</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To connect to our server, please enter the domain or IP of the server.
                The defualt value of the IP is http://localhost:8080/.
              </DialogContentText>
              <TextField autoFocus defaultValue={signInSetting.proxy} onChange={proxyUpdateInputValue} margin="dense" id="name" label="Server Domain/IP" type="url" fullWidth/>
            </DialogContent>
            <DialogActions>
              <Button onClick={proxyWindowCancel} color="primary">Cancel</Button>
              <Button onClick={() => proxyWindowSubmit(proxyNow)} color="primary" type="submit">OK</Button>
            </DialogActions>
          </Dialog>
          <Snackbar open={snackWindow} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} autoHideDuration={2000} onClose={snackWindowClose}>
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
              <Link href="#" variant="body2">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="#">Utage</Link>
          {' ' + new Date().getFullYear() + '.'}
        </Typography>
      </Box>
    </Container>
  );
}
