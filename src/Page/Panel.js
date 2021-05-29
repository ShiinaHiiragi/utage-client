import React from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import Markdown from "markdown-to-jsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
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
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PersonIcon from "@material-ui/icons/Person";
import GroupIcon from "@material-ui/icons/Group";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ImageIcon from "@material-ui/icons/Image";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import CodeIcon from "@material-ui/icons/Code";
import LinkIcon from "@material-ui/icons/Link";
import SendIcon from "@material-ui/icons/Send";
import AirplayIcon from "@material-ui/icons/Airplay";
import StrikethroughSIcon from "@material-ui/icons/StrikethroughS";
import SignIn from "./SignIn";

const electron = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");
const app = electron.remote.app;

const imgPath = app.isPackaged ? "./resources/app/build/" : "./build/";
const settingPath = "./data/setting.json";
const markdownOverride = {
  img: {
    props: {
      style: {
        maxWidth: "100%"
      }
    }
  }
};

// panelReading's record and log should be sorted chronologically
let panelReading = {
  usrInfo: {
    uid: "1024U",
    username: "Koishi",
    email: "abc@xyz.com",
    avatar: "png"
  },
  record: [
    {
      accessInfo: {
        id: "2048U",
        name: "chocomint",
        avatar: "png"
      },
      status: {
        unread: 2,
        all: true,
        textInput: ""
      },
      log: [
        {
          rid: 1,
          sender: "chocomint",
          senderID: "2048U",
          senderAvatar: "png",
          text:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. ![](https://ichinoe.github.io/img/header/domain.jpg)",
          time: "2021-05-23T04:20:44.733Z"
        },
        {
          rid: 2,
          sender: "Koishi",
          senderID: "1024U",
          senderAvatar: "png",
          text:
            "Nobis qui esse a distinctio rem sed vero quae repudiandae dolores, dolorem nostrum excepturi inventore consequuntur quo quisquam officiis, expedita hic sit.",
          time: "2021-05-23T04:21:25.401Z"
        },
        {
          rid: 5,
          sender: "chocomint",
          senderID: "2048U",
          senderAvatar: "png",
          text:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, exercitationem obcaecati? Accusantium voluptatem, dolores voluptatum voluptate tempora impedit aliquam labore doloribus nisi fugit sapiente. Libero consectetur quam corporis ducimus pariatur.",
          time: "2021-05-24T11:14:31.271Z"
        },
        {
          rid: 6,
          sender: "Koishi",
          senderID: "1024U",
          senderAvatar: "png",
          text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, ducimus. Sit error, repudiandae exercitationem alias asperiores odit officia possimus ducimus, esse amet praesentium, commodi quam aperiam quae maiores suscipit ipsa.",
          time: "2021-05-24T11:14:41.634Z"
        }
      ]
    },
    {
      accessInfo: {
        id: "16384G",
        name: "Miya Ouendan",
        avatar: "jpg"
      },
      status: {
        unread: 0,
        all: true,
        textInput: ""
      },
      log: [
        {
          rid: 3,
          sender: "Saki",
          senderID: "32768U",
          senderAvatar: "jpg",
          text:
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat ipsam, temporibus tempora corporis quod vero eligendi odio accusamus porro! Repudiandae iusto quam molestias, doloremque fugiat aliquam beatae similique! Beatae, corporis.",
          time: "2021-05-23T04:25:41.181Z"
        },
        {
          rid: 4,
          sender: "Koishi",
          senderID: "1024U",
          senderAvatar: "png",
          text: "Lorem ipsum dolor sit amet",
          time: "2021-05-23T04:28:46.995Z"
        }
      ]
    },
    {
      accessInfo: {
        id: "4096U",
        name: "Miku",
        avatar: "jpg"
      },
      status: {
        unread: 0,
        all: true,
        textInput: ""
      },
      log: []
    }
  ],
  state: {
    justSignIn: true,
    selectedRecord: "",
    selectedName: "Utage",
    focus: false,
    textIndex: [0, 0]
  }
};

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  noneSelect: {
    userSelect: "none"
  },
  appBar: {
    userSelect: "none",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  drawer: {
    userSelect: "none",
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    alignItems: "center",
    padding: theme.spacing(0, 0),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    height: "100vh",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  recordField: {
    overflowX: "auto",
    flexGrow: 1
  },
  card: {
    maxWidth: "64%",
    margin: theme.spacing(0, 2),
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  recordItemLeft: {
    display: "flex",
    padding: theme.spacing(1, 2),
    flexFlow: "row nowrap"
  },
  recordItemRight: {
    display: "flex",
    padding: theme.spacing(1, 2),
    flexFlow: "row-reverse nowrap"
  },
  recordAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6)
  },
  recordOffset: {
    paddingTop: theme.spacing(1)
  },
  cardTitle: {
    padding: theme.spacing(1, 2, 0, 2),
    userSelect: "none"
  },
  cardText: {
    // The markdown style
    fontSize: "16px"
  },
  cardPadding: {
    padding: theme.spacing(0, 2, 1, 2)
  },
  textField: {
    "& .MuiTextField-root": {
      width: "calc(100% - 24px)"
    },
    margin: theme.spacing(1, 0, 0, 2)
  },
  textButton: {
    display: "flex",
    width: "calc(100% - 32px)",
    padding: 0
  },
  textSpan: {
    flexGrow: 1
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  },
  snack: {
    userSelect: "none",
    maxWidth: "40vw"
  }
}));

// eslint-disable-next-line
Date.prototype.format = (formatString) => {
  var formatComponent = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  };

  if (/(y+)/.test(formatString))
    formatString = formatString.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );

  for (var index in formatComponent)
    if (new RegExp(`(${index})`).test(formatString))
      formatString = formatString.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? formatComponent[index]
          : ("00" + formatComponent[index]).substr(
              ("" + formatComponent[index]).length
            )
      );
  return formatString;
};

const formatSideTime = (timeString) => {
  let timeThen = new Date(timeString),
    timeNow = new Date();
  let sameYear = timeThen.getFullYear() === timeNow.getFullYear(),
    sameMonth = sameYear && timeThen.getMonth() === timeNow.getMonth(),
    sameDay = sameMonth && timeThen.getDay() === timeNow.getDay();
  let formatString =
    (sameYear ? "" : "yyyy-") + (sameDay ? "" : "MM-dd ") + "hh:mm:ss";
  return timeThen.format(formatString);
};

let emojiList = new Array(69)
  .fill()
  .map((item, index) =>
    String.fromCodePoint(`0x${(128512 + index).toString(16)}`)
  );

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Panel() {
  let globalSetting = JSON.parse(fs.readFileSync(settingPath));
  const classes = useStyles();

  // the state info need by user interface
  const [panelInfo, setPanelInfo] = React.useState(panelReading);
  const [panelPopup, setPanelPopup] = React.useState({
    sideListItem: true,
    moreAnchor: null,
    menuLogOut: false,
    backdrop: false,
    textEmoji: false,
    textPreview: false,
    snackWindow: false,
    snackWindowType: "",
    snackWindowMessage: ""
  });

  // about list item and info in app bar
  const handleToggleSideListItem = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      sideListItem: true
    }));
  };
  const handleCloseSideListItem = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      sideListItem: false
    }));
  };
  const handleMoreInfoClick = () => {
    // TODO: complete the functions
  };

  // about list item and more menu
  const handleListItemClick = (event, comb, name) => {
    setPanelInfo((panelInfo) => ({
      ...panelInfo,
      state: {
        ...panelInfo.state,
        selectedRecord: comb,
        selectedName: name,
        justSignIn: false,
        focus: false
      },
      record: panelInfo.record.map((value) =>
        value.accessInfo.id === comb
          ? { ...value, status: { ...value.status, unread: 0 } }
          : value
      )
    }));
  };
  const handleMoreClick = (event) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      moreAnchor: event.currentTarget
    }));
  };
  const handleMoreClose = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      moreAnchor: null
    }));
  };

  // menu of the more button
  const handleMenuProfileClick = () => {
    handleMoreClose();
    // TODO: complete the functions
  };
  const handleMenuAddClick = () => {
    handleMoreClose();
    // TODO: complete the functions
  };
  const handleMenuLogOutClick = () => {
    handleMoreClose();
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      menuLogOut: true
    }));
  };
  const handleMenuLogOutCalcelClick = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      menuLogOut: false
    }));
  };
  const handleMenuLogOutOKClick = () => {
    handleMenuLogOutCalcelClick();
    toggleBackdrop();
    setTimeout(() => {
      closeBackdrop();
      ReactDOM.render(<SignIn />, document.getElementById("root"));
    }, 1000);
  };

  // about text input
  const handleTextInput = (event) => {
    setPanelInfo((panelInfo) => ({
      ...panelInfo,
      record: panelInfo.record.map((value) =>
        value.accessInfo.id === panelInfo.state.selectedRecord
          ? {
              ...value,
              status: { ...value.status, textInput: event.target.value }
            }
          : value
      )
    }));
  };
  const handleTextSelect = () => {
    setPanelInfo((panelInfo) => ({
      ...panelInfo,
      state: {
        ...panelInfo.state,
        textIndex: [
          document.activeElement.selectionStart,
          document.activeElement.selectionEnd
        ]
      }
    }));
  };
  const handleTextFocus = () => {
    setPanelInfo((panelInfo) => ({
      ...panelInfo,
      state: {
        ...panelInfo.state,
        focus: true
      }
    }));
  };
  const handleTextBlur = () => {
    setPanelInfo((panelInfo) => ({
      ...panelInfo,
      state: {
        ...panelInfo.state,
        focus: false
      }
    }));
  };

  // about emoji and image
  const handleToggleTextEmoji = () => {
    if (panelInfo.state.focus)
      setPanelPopup((panelPopup) => ({
        ...panelPopup,
        textEmoji: true
      }));
    else
      toggleSnackWindow(
        "warning",
        "Please focus on text area to insert emoji."
      );
  };
  const handleCloseTextEmoji = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      textEmoji: false
    }));
  };
  const handleTextEmojiSelect = (event, index) => {
    handleCloseTextEmoji();
    handleRichTextMark(
      "",
      "",
      String.fromCodePoint(`0x${(128512 + index).toString(16)}`)
    );
  };
  const handleToggleImage = () => {
    // TODO: complete this function
  };

  // about text modifying buttons
  const handleRichTextMark = (left, right, middle) => {
    let { textInput } = panelInfo.record.find(
      (value) => value.accessInfo.id === panelInfo.state.selectedRecord
    ).status;
    let { textIndex } = panelInfo.state;
    let newTextInput =
      textInput.slice(0, textIndex[0]) +
      left +
      (middle === undefined
        ? textInput.slice(textIndex[0], textIndex[1])
        : middle) +
      right +
      textInput.slice(textIndex[1]);
    let newTextIndex = [textIndex[0] + left.length, textIndex[1] + left.length];
    setPanelInfo((panelInfo) => ({
      ...panelInfo,
      record: panelInfo.record.map((value) =>
        value.accessInfo.id === panelInfo.state.selectedRecord
          ? {
              ...value,
              status: {
                ...value.status,
                textInput: newTextInput,
                textIndex: newTextIndex
              }
            }
          : value
      )
    }));
  };
  const handlePreventBlur = (event) => {
    event.preventDefault();
  };
  const handleTextBold = () => {
    if (panelInfo.state.focus) handleRichTextMark("**", "**");
    else
      toggleSnackWindow(
        "warning",
        "Please focus on text area to insert bold tag."
      );
  };
  const handleTextItalic = () => {
    if (panelInfo.state.focus) handleRichTextMark("*", "*");
    else
      toggleSnackWindow(
        "warning",
        "Please focus on text area to insert italic tag."
      );
  };
  const handleTextStrikethrough = () => {
    if (panelInfo.state.focus) handleRichTextMark("~~", "~~");
    else
      toggleSnackWindow(
        "warning",
        "Please focus on text area to insert strikethrough."
      );
  };
  const handleTextLink = () => {
    if (panelInfo.state.focus) handleRichTextMark("[", "]()");
    else
      toggleSnackWindow("warning", "Please focus on text area to insert link.");
  };
  const handleTextCode = () => {
    if (panelInfo.state.focus) handleRichTextMark("`", "`");
    else
      toggleSnackWindow("warning", "Please focus on text area to insert code.");
  };

  // about preview and send
  const handleTextPreviewBack = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      textPreview: false
    }));
  };
  const handleTextPreviewToggle = () => {
    const checkInfo = handlePreCheck();
    if (checkInfo !== "") toggleSnackWindow("warning", checkInfo);
    else
      setPanelPopup((panelPopup) => ({
        ...panelPopup,
        textPreview: true
      }));
  };
  const handlePreCheck = () => {
    const nowTextInput = panelInfo.record.find(
      (value) => value.accessInfo.id === panelInfo.state.selectedRecord
    ).status.textInput;
    let pattern = /!\[(.*?)\]\((.*?)\)/gm,
      matcher;
    if (nowTextInput === "") return "The input panel is vacant.";
    while ((matcher = pattern.exec(nowTextInput)) !== null)
      try {
        fs.accessSync(path.join(imgPath, matcher[2]));
      } catch (err) {
        return `${err}`;
      }
    return "";
  };
  const handleTextSend = (hasChecked) => {
    // IMPORTANT: DO NOT WRITE AS `!hasChecked`
    // because hasChecked is either `true` or a event Object
    // TEMP: change the logic later
    const nowTextInput = panelInfo.record.find(
      (value) => value.accessInfo.id === panelInfo.state.selectedRecord
    ).status.textInput;
    let checkInfo = hasChecked === true ? "" : handlePreCheck();
    if (checkInfo !== "") {
      toggleSnackWindow("warning", checkInfo);
      return;
    }
    // TODO: complete this function
  };

  // about backdrop and snack window
  const toggleBackdrop = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      backdrop: true
    }));
  };
  const closeBackdrop = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      backdrop: false
    }));
  };
  const toggleSnackWindow = (type, message) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      snackWindow: true,
      snackWindowType: type,
      snackWindowMessage: message
    }));
  };
  const closeSnackWindow = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      snackWindow: false
    }));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: panelPopup.sideListItem
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            className={classes.menuButton}
            onClick={
              panelPopup.sideListItem
                ? handleCloseSideListItem
                : handleToggleSideListItem
            }
          >
            {panelPopup.sideListItem ? (
              <Tooltip title="Fold" placement="bottom">
                <ChevronLeftIcon />
              </Tooltip>
            ) : (
              <Tooltip title="Unfold" placement="bottom">
                <MenuIcon />
              </Tooltip>
            )}
          </IconButton>
          <Typography className={classes.textSpan} variant="h6" noWrap>
            {panelInfo.state.selectedName}
          </Typography>
          {!panelInfo.state.justSignIn && (
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleMoreInfoClick}
            >
              <Tooltip title="Info" placement="bottom">
                <InfoOutlinedIcon />
              </Tooltip>
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={panelPopup.sideListItem}
        classes={{ paper: classes.drawerPaper }}
      >
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={`static/avatar/avatar-${panelInfo.usrInfo.uid}.${panelInfo.usrInfo.avatar}`}
              >
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={panelInfo.usrInfo.username}
              secondary={panelInfo.usrInfo.email}
            />
            <Tooltip title="More" placement="top">
              <IconButton onClick={handleMoreClick}>
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={panelPopup.moreAnchor}
              keepMounted
              open={Boolean(panelPopup.moreAnchor)}
              onClose={handleMoreClose}
            >
              <MenuItem onClick={handleMenuProfileClick}>My Profile</MenuItem>
              <MenuItem onClick={handleMenuAddClick}>
                Add Friends/Groups
              </MenuItem>
              <MenuItem onClick={handleMenuLogOutClick}>Log Out</MenuItem>
              <Dialog
                open={panelPopup.menuLogOut}
                onClose={handleMenuLogOutCalcelClick}
                className={classes.noneSelect}
              >
                <DialogTitle id="alert-dialog-title">{"WARNING"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Do you really want to quit your Utage account?{" "}
                    {(function () {
                      let size = panelInfo.record.length;
                      for (let index = 0; index < size; index += 1)
                        if (panelInfo.record[index].status.textInput !== "")
                          return "The system will not save your input on the text field.";
                      return "Click OK to log out.";
                    })()}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleMenuLogOutCalcelClick}
                    color="primary"
                    autoFocus
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleMenuLogOutOKClick} color="secondary">
                    Yes
                  </Button>
                </DialogActions>
              </Dialog>
            </Menu>
          </ListItem>
        </List>
        <Divider />
        <List>
          {panelInfo.record.map((value) => {
            return (
              <ListItem
                button
                key={value.accessInfo.id}
                selected={
                  panelInfo.state.selectedRecord === value.accessInfo.id
                }
                onClick={(event) =>
                  handleListItemClick(
                    event,
                    value.accessInfo.id,
                    value.accessInfo.name
                  )
                }
              >
                <ListItemAvatar>
                  <Badge badgeContent={value.status.unread} color="secondary">
                    <Avatar
                      src={`static/avatar/avatar-${value.accessInfo.id}.${value.accessInfo.avatar}`}
                    >
                      {value.accessInfo.id.charAt(
                        value.accessInfo.id.length - 1
                      ) === "U" ? (
                        <PersonIcon />
                      ) : (
                        <GroupIcon />
                      )}
                    </Avatar>
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={value.accessInfo.name}
                  secondary={
                    value.log.length > 0
                      ? formatSideTime(value.log[value.log.length - 1].time)
                      : "(No Message Yet)"
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: panelPopup.sideListItem
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.recordField} variant="outlined">
          {!panelInfo.state.justSignIn &&
            panelInfo.record
              .find(
                (value) =>
                  value.accessInfo.id === panelInfo.state.selectedRecord
              )
              .log.map((value) => (
                <div
                  key={value.rid}
                  className={
                    value.senderID === panelInfo.usrInfo.uid
                      ? classes.recordItemRight
                      : classes.recordItemLeft
                  }
                >
                  <div className={classes.recordOffset}>
                    <Avatar
                      className={classes.recordAvatar}
                      src={`static/avatar/avatar-${value.senderID}.${value.senderAvatar}`}
                    >
                      <PersonIcon />
                    </Avatar>
                  </div>
                  <Card className={classes.card}>
                    <div className={classes.cardTitle}>
                      <Typography color="textSecondary">
                        <b>{value.sender}</b> {formatSideTime(value.time)}
                      </Typography>
                    </div>
                    <div
                      className={clsx(classes.cardText, classes.cardPadding)}
                    >
                      <Markdown options={{ overrides: markdownOverride }}>
                        {value.text}
                      </Markdown>
                    </div>
                  </Card>
                </div>
              ))}
        </div>

        {!panelInfo.state.justSignIn && (
          <div className={classes.textField}>
            <TextField
              id="outlined-multiline-static"
              label="Leave a Message in Markdown"
              multiline
              rows={4}
              variant="outlined"
              onChange={handleTextInput}
              onSelect={handleTextSelect}
              onFocus={handleTextFocus}
              onBlur={handleTextBlur}
              value={
                panelInfo.record.find(
                  (value) =>
                    value.accessInfo.id === panelInfo.state.selectedRecord
                ).status.textInput
              }
            />
            <Toolbar className={classes.textButton}>
              {[
                ["Emoji", <InsertEmoticonIcon />, handleToggleTextEmoji],
                ["Insert Image", <ImageIcon />, handleToggleImage],
                ["Bold", <FormatBoldIcon />, handleTextBold],
                ["Italic", <FormatItalicIcon />, handleTextItalic],
                [
                  "Strikethrough",
                  <StrikethroughSIcon />,
                  handleTextStrikethrough
                ],
                ["Link", <LinkIcon />, handleTextLink],
                ["Code Line", <CodeIcon />, handleTextCode],
                <div key="span" className={classes.textSpan}></div>,
                ["Preview", <AirplayIcon />, handleTextPreviewToggle],
                ["Send", <SendIcon />, handleTextSend]
              ].map((value) => {
                if (value instanceof Array)
                  return (
                    <Tooltip
                      key={value[0]}
                      title={value[0]}
                      placement="top"
                      onMouseDown={handlePreventBlur}
                      onClick={value[2]}
                    >
                      <IconButton>{value[1]}</IconButton>
                    </Tooltip>
                  );
                else return value;
              })}
            </Toolbar>
            <Dialog
              open={panelPopup.textEmoji}
              onClose={handleCloseTextEmoji}
              className={classes.noneSelect}
            >
              <DialogTitle id="alert-dialog-title">
                {"Select a Emoji"}
              </DialogTitle>
              <DialogContent>
                {emojiList.map((value, index) => (
                  <IconButton
                    key={index}
                    onClick={(event) => {
                      handleTextEmojiSelect(event, index);
                    }}
                    color="inherit"
                  >
                    {`${value}`}
                  </IconButton>
                ))}
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleCloseTextEmoji}
                  color="primary"
                  autoFocus
                >
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={panelPopup.textPreview}
              onClose={handleTextPreviewBack}
            >
              <DialogTitle
                id="alert-dialog-title"
                className={classes.noneSelect}
              >
                {"Preview in Markdown"}
              </DialogTitle>
              <DialogContent className={classes.cardText}>
                <Markdown options={{ overrides: markdownOverride }}>
                  {
                    panelInfo.record.find(
                      (value) =>
                        value.accessInfo.id === panelInfo.state.selectedRecord
                    ).status.textInput
                  }
                </Markdown>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleTextPreviewBack} color="primary">
                  Back
                </Button>
                <Button
                  onClick={() => {
                    handleTextPreviewBack();
                    handleTextSend(true);
                  }}
                  color="secondary"
                >
                  Send
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        )}
      </main>
      <Backdrop className={classes.backdrop} open={panelPopup.backdrop}>
        <CircularProgress color="inherit" size={56} />
      </Backdrop>
      <Snackbar
        open={panelPopup.snackWindow}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={globalSetting.snackWindowDuration}
        onClose={closeSnackWindow}
        className={classes.snack}
      >
        <Alert onClose={closeSnackWindow} severity={panelPopup.snackWindowType}>
          {panelPopup.snackWindowMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
