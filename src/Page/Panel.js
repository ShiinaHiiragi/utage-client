import React from "react";
import ReactDOM from "react-dom";
import clsx from "clsx";
import "date-fns";
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
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
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
import AddIcon from "@material-ui/icons/Add";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CryptoJS from "crypto-js";
import SignIn from "./SignIn";

const electron = window.require("electron");
const fs = window.require("fs");
const path = window.require("path");
const request = window.require("request");
const app = electron.remote.app;
const dialog = electron.remote.dialog;
const environ = electron.remote.getGlobal("environ");

const staticPath = environ === "release"
  ? "./resources/app/build/"
  : environ === "build"
  ? "./build/"
  : "./";
const settingPath = path.join(staticPath, "./static/setting.json");
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
let globalSetting = JSON.parse(fs.readFileSync(settingPath));
let serverClock,
  imageCounter,
  tempRecord = [],
  tempApply = [],
  selfUID;

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
  recordIcon: {
    width: theme.spacing(4),
    height: theme.spacing(4)
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
  },
  table: {
    minWidth: "300px",
    userSelect: "none",
    marginTop: "16px"
  },
  avatarProfile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    userSelect: "none"
  },
  largeAvatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(0, 0, 2, 0)
  },
  notLargeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8)
  },
  formFont: {
    fontSize: "16px",
    border: "0"
  },
  selfProfile: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "200px"
    }
  },
  genderControl: {
    margin: theme.spacing(1),
    width: "200px"
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  searchTextInput: {
    margin: theme.spacing(2, "2%", 2, "2%"),
    width: "96%"
  },
  checkbox: {
    margin: theme.spacing(0, "2%", 0, "2%"),
    width: "45%"
  },
  applicationCenter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  applicationAll: {
    minHeight: "200px"
  },
  nilApplication: {
    minHeight: "200px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }
}));

// eslint-disable-next-line
Date.prototype.format = function (formatString) {
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

export default function Panel(props) {
  const classes = useStyles();
  const AES = (value) =>
    CryptoJS.AES.encrypt(value, props.KEY.passwordAES).toString();
  const DAES = (value) =>
    CryptoJS.AES.decrypt(value, props.KEY.passwordAES).toString(
      CryptoJS.enc.Utf8
    );
  const asyncInsertTuple = (item, tableName) => {
    let insertRequest = props.DB.transaction([tableName], "readwrite")
      .objectStore(tableName)
      .put(item);
    return new Promise((resolve, reject) => {
      insertRequest.onsuccess = () => resolve();
      insertRequest.onerror = (event) => reject(event.target.error);
    });
    
  };
  const encryptTuple = (item, tableName) => {
    if (tableName === "profile")
      return {
        uid: item.userid.toString(),
        username: AES(item.nickname),
        email: AES(item.email),
        city: AES(item.city),
        tel: AES(item.tel),
        birth: AES(item.birth),
        gender: AES(item.gender),
        avatar: {
          extension: AES(item.avatarsuffix),
          hash: AES(item.avatarhash)
        }
      };
    else if (tableName === "group")
      return {
        gid: item.groupid.toString(),
        groupName: AES(item.groupname),
        groupHolder: "",
        groupHolderID: AES(item.groupholderid.toString()),
        joinTime: AES(item.jointime),
        createTime: AES(item.createtime),
        avatar: {
          extension: AES(item.groupavatarsuffix),
          hash: AES(item.groupavatarhash)
        }
      };
    else if (tableName === "record")
      return {
        type: item.type,
        rid: item.recordid.toString(),
        src: item.userid.toString(),
        dst: item.receiverid.toString(),
        text: AES(item.text),
        img: item.hash.map((value) => AES(value)),
        time: AES(item.time)
      };
  };

  // equals to componentDidmount
  React.useEffect(() => {
    imageCounter = 0;
    serverClock = setInterval(requestNewRecord, 2500);
    globalSetting = JSON.parse(fs.readFileSync(settingPath));

    // temp of profile object
    selfUID = panelInfo.usrInfo.uid;
    selfUID = selfUID.substr(0, selfUID.length - 1);
    let primaryProfile = {};
    let objectStore = props.DB.transaction("profile").objectStore("profile");
    objectStore.openCursor().onsuccess = (event) => {
      let cursor = event.target.result;
      if (cursor) {
        primaryProfile[cursor.value.uid] = {
          username: DAES(cursor.value.username),
          avatar: DAES(cursor.value.avatar.extension)
        };
        cursor.continue();
      } else {
        // complete record array
        objectStore = props.DB.transaction("record").objectStore("record");
        objectStore.openCursor().onsuccess = (event) => {
          let cursor = event.target.result;
          if (cursor) {
            let type = cursor.value.type,
              tagID,
              targetObject,
              atomRecord;
            if (type === "U") {
              tagID =
                cursor.value.src === selfUID
                  ? cursor.value.dst
                  : cursor.value.src;
              targetObject = tempRecord.find(
                (item) => item.accessInfo.id === `${tagID}U`
              );
              atomRecord = {
                rid: cursor.value.rid,
                senderID: `${cursor.value.src}U`,
                sender: primaryProfile[cursor.value.src].username,
                senderAvatar: primaryProfile[cursor.value.src].avatar,
                text: DAES(cursor.value.text),
                time: DAES(cursor.value.time)
              };
              if (targetObject !== undefined) {
                targetObject.log.push(atomRecord);
              } else {
                tempRecord.push({
                  accessInfo: {
                    id: `${tagID}U`,
                    name: primaryProfile[tagID].username,
                    avatar: primaryProfile[tagID].avatar
                  },
                  status: {
                    unread: 0,
                    all: true,
                    textInput: "",
                    img: []
                  },
                  log: [atomRecord]
                });
              }
              cursor.continue();
            } else if (type === "G") {
              tagID = cursor.value.dst;
              targetObject = tempRecord.find(
                (item) => item.accessInfo.id === `${tagID}G`
              );
              atomRecord = {
                rid: cursor.value.rid,
                senderID: `${cursor.value.src}U`,
                sender: primaryProfile[cursor.value.src]
                  ? primaryProfile[cursor.value.src].username
                  : "",
                senderAvatar: primaryProfile[cursor.value.src]
                  ? primaryProfile[cursor.value.src].avatar
                  : "",
                text: DAES(cursor.value.text),
                time: DAES(cursor.value.time)
              };
              if (targetObject !== undefined) {
                targetObject.log.push(atomRecord);
              } else {
                queryProfileByKey("group", tagID)
                  .then((groupProfile) => {
                    tempRecord.push({
                      accessInfo: {
                        id: `${tagID}G`,
                        name: DAES(groupProfile.groupName),
                        avatar: DAES(groupProfile.avatar.extension)
                      },
                      status: {
                        unread: 0,
                        all: true,
                        textInput: "",
                        img: []
                      },
                      log: [atomRecord]
                    });
                  })
                  .catch((err) => {
                    toggleSnackWindow("error", `${err}`);
                  });
              }
              cursor.continue();
            } else if (type === "A") {
              // apply for friends
            } else if (type === "N") {
              // apply for join
            }
          } else {
            tempRecord.forEach((item) => {
              item.log.sort((left, right) => {
                return left.time < right.time
                  ? -1
                  : left.time > right.time
                  ? 1
                  : 0;
              });
            });
            tempRecord.sort((left, right) => {
              let leftTime = left.log[left.log.length - 1].time;
              let rightTime = right.log[right.log.length - 1].time;
              return leftTime > rightTime ? -1 : leftTime < rightTime ? 1 : 0;
            });
            setPanelInfo((panelInfo) => ({
              ...panelInfo,
              record: tempRecord
            }));
            setPanelPopup((panelPopup) => ({
              ...panelPopup,
              application: tempApply
            }));
          }
        };
      }
    };
    return () => {
      clearInterval(serverClock);
    };
  }, []);

  const queryProfileByKey = (tableName, key) => {
    let objectStore = props.DB.transaction([tableName]).objectStore(tableName);
    let dbRequest = objectStore.get(key);

    return new Promise((resolve, reject) => {
      dbRequest.onerror = (event) => {
        reject(`${event.target.error}`);
      };
      dbRequest.onsuccess = (event) => {
        if (event.target.result)
          resolve(event.target.result);
        else {
          // only profile and group will request in this way
          request({
            url: `${globalSetting.proxy}profile/get?userid=${selfUID}&getid=${key}&type=${tableName === "profile" ? "U" : "G"}`,
            method: "GET",
            json: true,
            headers: {
              "content-type": "text/plain",
            },
            timeout: 10000,
          }, (err, response) => {
            if (!err && response.statusCode === 200) {
              let getProfile = JSON.parse(props.KEY.keyClient.decrypt(response.body));
              // do searching one more time after inserting
              asyncInsertTuple(encryptTuple(getProfile, tableName), tableName)
                .then(() => {
                  queryProfileByKey(tableName, key).then(resolve);
                }).catch((err) => {
                  toggleSnackWindow("error", `${err}`);
                });
            }
            else {
              reject(`${err ? err : `ServerError: ${response.body}`}`);
            }
          });
        }
      };
    });
  };

  const requestNewRecord = () => {
    // TODO: ask server for new record
  };

  // the state info need by user interface
  const [panelInfo, setPanelInfo] = React.useState(() => ({
    usrInfo: props.SELF,
    record: [],
    state: {
      focus: false,
      justSignIn: true,
      selectedRecord: "",
      selectedName: "Utage",
      textIndex: [0, 0]
    }
  }));

  // the info that all popup window needs
  const [panelPopup, setPanelPopup] = React.useState({
    sideListItem: true,
    moreAnchor: null,
    menuLogOut: false,
    backdrop: false,
    textEmoji: false,
    textPreview: false,
    newFriend: {
      open: false,
      option: 0,
      find: {
        textInput: "",
        box: "0"
      },
      createGroup: ""
    },
    profile: {
      open: false,
      rows: [],
      id: "",
      avatar: "",
      name: ""
    },
    self: {
      open: false,
      uid: "",
      username: "",
      email: "",
      tel: "",
      city: "",
      birth: "",
      gender: "",
      avatar: ""
    },
    varification: {
      open: false,
      id: "",
      textInput: "",
      name: ""
    },
    snackWindow: {
      open: false,
      snackWindowType: "",
      snackWindowMessage: ""
    },
    application: []
  });

  // about list item
  const handleSideListItemToggle = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      sideListItem: true
    }));
  };
  const handleSideListItemClose = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      sideListItem: false
    }));
  };

  // about more info in app bar
  const createData = (props, value) => ({ props, value });
  const handleMoreInfoClick = (target, callback) => {
    let targetID = target.substr(0, target.length - 1);
    let targetType = target.charAt(target.length - 1);
    let rowsInfo = [];
    queryProfileByKey(targetType === "U" ? "profile" : "group", targetID)
      .then((targetProfile) => {
        if (targetType === "U") {
          let gender = DAES(targetProfile.gender);
          if (gender === "U") gender = "Unknown";
          else if (gender === "F") gender = "Female";
          else if (gender === "M") gender = "Male";
          rowsInfo = [
            ["UID", targetProfile.uid],
            ["E-mail", DAES(targetProfile.email)],
            ["Birthday", new Date(DAES(targetProfile.birth)).format("yyyy-MM-dd")],
            ["Gender", gender]
          ];
          if (DAES(targetProfile.tel))
            rowsInfo.push(["TEL", DAES(targetProfile.tel)]);
          if (DAES(targetProfile.city))
            rowsInfo.push(["City", DAES(targetProfile.city)]);
          handleMoreInfoRender(
            rowsInfo,
            target,
            DAES(targetProfile.avatar.extension),
            DAES(targetProfile.username)
          );
          if (typeof callback === "function") callback();
        } else {
          let groupHolder = DAES(targetProfile.groupHolder);
          rowsInfo = [
            ["GID", targetProfile.gid],
            ["UID of Group Holder", DAES(targetProfile.groupHolderID)],
            ["Group Holder", groupHolder],
            ["Joining Time", formatSideTime(DAES(targetProfile.joinTime))],
            ["Created Time", formatSideTime(DAES(targetProfile.createTime))]
          ];
          if (!groupHolder) {
            queryProfileByKey("profile", DAES(targetProfile.groupHolderID))
              .then((holderProfile) => {
                rowsInfo.find((value) => value[0] === "Group Holder")[1] = DAES(
                  holderProfile.username
                );
                targetProfile.groupHolder = holderProfile.username;
                asyncInsertTuple(targetProfile, "group").catch((err) => {
                  toggleSnackWindow("error", `${err}`);
                });
                handleMoreInfoRender(
                  rowsInfo,
                  target,
                  DAES(targetProfile.avatar.extension),
                  DAES(targetProfile.groupName)
                );
                if (typeof callback === "function") callback();
              })
              .catch((err) => {
                toggleSnackWindow("error", `${err}`);
              });
          } else {
            handleMoreInfoRender(
              rowsInfo,
              target,
              DAES(targetProfile.avatar.extension),
              DAES(targetProfile.groupName)
            );
            if (typeof callback === "function") callback();
          }
        }
      })
      .catch((err) => {
        toggleSnackWindow("error", `${err}`);
      });
  };
  const handleMoreInfoRender = (rowsInfo, id, avatar, name) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      profile: {
        open: true,
        rows: rowsInfo.map((value) => createData(value[0], value[1])),
        id: id,
        avatar: avatar,
        name: name
      }
    }));
  };
  const handleMoreInfoClose = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      profile: {
        ...panelPopup.profile,
        open: false
      }
    }));
  };
  const handleMoreInfoApply = () => {
    // When this window opens, the target info must have been stored in profile
    handleMoreInfoClose();
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      varification: {
        ...panelPopup.varification,
        open: true,
        id: panelPopup.profile.id,
        name: panelPopup.profile.name,
        textInput: ""
      }
    }));
  };
  const handleMoreInfoApplyClose = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      varification: {
        ...panelPopup.varification,
        open: false
      }
    }));
  };
  const handleMoreInfoApplyTextChange = (event) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      varification: {
        ...panelPopup.varification,
        textInput: event.target.value
      }
    }));
  };
  const handleMoreInfoApplySend = () => {
    if (panelPopup.varification.textInput === "") {
      toggleSnackWindow("warning", "The varification message is vacant.");
      return;
    }

    handleMoreInfoApplyClose();
    // TODO: send application to target
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
  const handleMenuClick = (event) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      moreAnchor: event.currentTarget
    }));
  };
  const handleMenuClose = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      moreAnchor: null
    }));
  };

  // about profile of the menu button
  const handleMenuProfileClick = () => {
    queryProfileByKey("profile", selfUID)
      .then((selfProfile) => {
        handleMenuClose();
        setPanelPopup((panelPopup) => ({
          ...panelPopup,
          self: {
            ...panelPopup.self,
            open: true,
            uid: selfProfile.uid,
            username: DAES(selfProfile.username),
            email: DAES(selfProfile.email),
            tel: DAES(selfProfile.tel),
            city: DAES(selfProfile.city),
            birth: DAES(selfProfile.birth),
            gender: DAES(selfProfile.gender),
            avatar: DAES(selfProfile.avatar.extension)
          }
        }));
      })
      .catch((err) => {
        toggleSnackWindow("error", `${err}`);
      });
  };
  const handleMenuProfileClose = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      self: {
        ...panelPopup.self,
        open: false
      }
    }));
  };
  const handleMenuProfileAvatarChange = () => {
    // TODO: upload a new avatar
  };
  const handleMenuProfileChange = (event, prop) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      self: {
        ...panelPopup.self,
        [prop]: event.target.value
      }
    }));
  };
  const handleMenuProfileApply = () => {
    handleMenuProfileClose();
    // TODO: change the profile (except avatar)
  };

  // about log out of menu button
  const handleMenuLogOutClick = () => {
    handleMenuClose();
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
    tempRecord = [];
    tempApply = [];
    setTimeout(() => {
      closeBackdrop();
      ReactDOM.render(<SignIn />, document.getElementById("root"));
    }, 1000);
  };

  // about friend or group of menu button
  const handleMenuNewClick = () => {
    handleMenuClose();
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      newFriend: {
        ...panelPopup.newFriend,
        open: true,
        option: 0,
        find: {
          textInput: "",
          box: "0"
        },
        createGroup: ""
      }
    }));
  };
  const handleMenuNewClose = () => {
    handleMenuClose();
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      newFriend: {
        ...panelPopup.newFriend,
        open: false
      }
    }));
  };
  const handleMenuNewTabChange = (event, newValue) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      newFriend: {
        ...panelPopup.newFriend,
        option: newValue
      }
    }));
  };
  const handleMenuNewFindCheckboxChange = (event) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      newFriend: {
        ...panelPopup.newFriend,
        find: {
          ...panelPopup.newFriend.find,
          box: event.target.value
        }
      }
    }));
  };
  const handleMenuNewFindTextChange = (event) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      newFriend: {
        ...panelPopup.newFriend,
        find: {
          ...panelPopup.newFriend.find,
          textInput: event.target.value
        }
      }
    }));
  };
  const handleMenuNewFindSubmit = () => {
    if (panelPopup.newFriend.find.textInput === "") {
      toggleSnackWindow("warning", "The id input is vacant.");
      return;
    } else if (!/^[0-9]*$/.test(panelPopup.newFriend.find.textInput)) {
      toggleSnackWindow("warning", "The id contains illegal characters.");
      return;
    }
    handleMoreInfoClick(
      `${panelPopup.newFriend.find.textInput}${panelPopup.newFriend.find.box === "0" ? "U" : "G"}`,
      handleMenuNewClose
    );
  };
  const menuNewApplicationRemove = (uid, gid) => {
    panelPopup.application.splice(
      panelPopup.application.findIndex(
        (item) => item.uid === uid && item.dst[0] === gid
      ),
      1
    );
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      application: panelPopup.application
    }));
  };
  const handleMenuNewApplicationRefuse = (uid, gid) => {
    // TODO: refuse src's application
    menuNewApplicationRemove(uid, gid);
  };
  const handleMenuNewApplicationAccept = (uid, gid) => {
    // TODO: accept src's application
    menuNewApplicationRemove(uid, gid);
  };
  const handleMenuNewCreateTextChange = (event) => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      newFriend: {
        ...panelPopup.newFriend,
        createGroup: event.target.value
      }
    }));
  };
  const handleMenuNewCreateSubmit = () => {
    if (panelPopup.newFriend.createGroup === "") {
      toggleSnackWindow("warning", "The group name cannot be vacant.");
      return;
    }
    handleMenuNewClose();
    // TODO: create a new group
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

  // about emoji
  const handleTextEmojiClick = () => {
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
  const handleTextEmojiClose = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      textEmoji: false
    }));
  };
  const handleTextEmojiSelect = (event, index) => {
    handleTextEmojiClose();
    richTextMark(
      "",
      "",
      String.fromCodePoint(`0x${(128512 + index).toString(16)}`)
    );
  };

  // about image inserting
  const handleTextImageClick = () => {
    if (panelInfo.state.focus) {
      dialog
        .showOpenDialog({
          title: "Insert a Image",
          filters: [
            { name: "Images", extensions: ["jpg", "png", "gif"] },
            { name: "All Files", extensions: ["*"] }
          ]
        })
        .then((result) => {
          if (!result.canceled) {
            let srcPath = result.filePaths[0];
            let fileName = `${++imageCounter}${path.extname(srcPath)}`;
            let dstPath = `${staticPath}static/temp/${fileName}`;
            fs.copyFileSync(srcPath, dstPath);
            setPanelInfo((panelInfo) => ({
              ...panelInfo,
              record: panelInfo.record.map((value) =>
                value.accessInfo.id === panelInfo.state.selectedRecord
                  ? {
                      ...value,
                      status: {
                        ...value.status,
                        img: [...value.status.img, fileName]
                      }
                    }
                  : value
              )
            }));
            toggleSnackWindow(
              "info",
              `Your image is copied to ${`static/temp/${fileName}`}.`
            );
            richTextMark("", "", `![](static/temp/${fileName})`);
          }
        });
    } else
      toggleSnackWindow(
        "warning",
        "Please focus on text area to insert image."
      );
  };

  // about text modifying buttons
  const richTextMark = (left, right, middle) => {
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
  const handleTextPreventBlur = (event) => {
    event.preventDefault();
  };
  const handleTextBold = () => {
    if (panelInfo.state.focus) richTextMark("**", "**");
    else
      toggleSnackWindow(
        "warning",
        "Please focus on text area to insert bold tag."
      );
  };
  const handleTextItalic = () => {
    if (panelInfo.state.focus) richTextMark("*", "*");
    else
      toggleSnackWindow(
        "warning",
        "Please focus on text area to insert italic tag."
      );
  };
  const handleTextStrikethrough = () => {
    if (panelInfo.state.focus) richTextMark("~~", "~~");
    else
      toggleSnackWindow(
        "warning",
        "Please focus on text area to insert strikethrough."
      );
  };
  const handleTextLink = () => {
    if (panelInfo.state.focus) richTextMark("[", "]()");
    else
      toggleSnackWindow("warning", "Please focus on text area to insert link.");
  };
  const handleTextCode = () => {
    if (panelInfo.state.focus) richTextMark("`", "`");
    else
      toggleSnackWindow("warning", "Please focus on text area to insert code.");
  };

  // about preview and send
  const handleTextPreviewClose = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      textPreview: false
    }));
  };
  const handleTextPreviewClick = () => {
    const checkInfo = preCheck();
    if (checkInfo !== "") toggleSnackWindow("warning", checkInfo);
    else
      setPanelPopup((panelPopup) => ({
        ...panelPopup,
        textPreview: true
      }));
  };
  const preCheck = () => {
    const nowTextInput = panelInfo.record.find(
      (value) => value.accessInfo.id === panelInfo.state.selectedRecord
    ).status.textInput;
    let pattern = /!\[(.*?)\]\((.*?)\)/gm,
      matcher;
    if (nowTextInput === "") return "The input panel is vacant.";
    while ((matcher = pattern.exec(nowTextInput)) !== null)
      try {
        fs.accessSync(path.join(staticPath, matcher[2]));
      } catch (err) {
        return `${err}`;
      }
    return "";
  };
  const handleTextSend = (hasChecked) => {
    // IMPORTANT: DO NOT WRITE AS `!hasChecked`
    // because hasChecked is either `true` or a event Object
    // TEMP: change the logic later
    let nowTextInput = panelInfo.record.find(
      (value) => value.accessInfo.id === panelInfo.state.selectedRecord
    ).status.textInput;
    let checkInfo = hasChecked === true ? "" : preCheck();
    if (checkInfo !== "") {
      toggleSnackWindow("warning", checkInfo);
      return;
    }
    // preprocess of sending image
    let imgSequence = [];
    nowTextInput = nowTextInput.replace(
      /!\[(.*?)\]\((.*?)\)/gm,
      (_0, _1, _2) => {
        imgSequence.push(_2);
        return `![${_1}](${path.extname(_2)})`;
      }
    );
    // TODO: send the text to the server
    // post the image to server using the imgSequence array
    // delete the temp image file using the status.img array
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
      snackWindow: {
        open: true,
        snackWindowType: type,
        snackWindowMessage: message
      }
    }));
  };
  const closeSnackWindow = () => {
    setPanelPopup((panelPopup) => ({
      ...panelPopup,
      snackWindow: {
        ...panelPopup.snackWindow,
        open: false
      }
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
            edge="start"
            className={classes.menuButton}
            onClick={
              panelPopup.sideListItem
                ? handleSideListItemClose
                : handleSideListItemToggle
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
              onClick={() => {
                handleMoreInfoClick(panelInfo.state.selectedRecord);
              }}
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
              <IconButton onClick={handleMenuClick}>
                <Badge
                  color="secondary"
                  variant="dot"
                  invisible={panelPopup.application.length === 0}
                >
                  <MoreVertIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={panelPopup.moreAnchor}
              keepMounted
              open={Boolean(panelPopup.moreAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuProfileClick}>My Profile</MenuItem>
              <MenuItem onClick={handleMenuNewClick}>Friends/Groups</MenuItem>
              <MenuItem onClick={handleMenuLogOutClick}>Log Out</MenuItem>
              <Dialog
                open={panelPopup.menuLogOut}
                onClose={handleMenuLogOutCalcelClick}
                className={classes.noneSelect}
              >
                <DialogTitle>{"WARNING"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Do you really want to quit your Utage account?{" "}
                    {(function () {
                      let size = panelInfo.record.length;
                      for (let index = 0; index < size; index += 1)
                        if (panelInfo.record[index].status.textInput !== "")
                          return "The system will not save your input on the text field.";
                      return "Click YES to log out.";
                    })()}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleMenuLogOutOKClick} color="secondary">
                    Yes
                  </Button>
                  <Button onClick={handleMenuLogOutCalcelClick} color="primary">
                    Back
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
                      <PersonIcon className={classes.recordIcon} />
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
                ["Emoji", <InsertEmoticonIcon />, handleTextEmojiClick],
                ["Insert Image", <ImageIcon />, handleTextImageClick],
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
                ["Preview", <AirplayIcon />, handleTextPreviewClick],
                ["Send", <SendIcon />, handleTextSend]
              ].map((value) => {
                if (value instanceof Array)
                  return (
                    <Tooltip
                      key={value[0]}
                      title={value[0]}
                      placement="top"
                      onMouseDown={handleTextPreventBlur}
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
              onClose={handleTextEmojiClose}
              className={classes.noneSelect}
            >
              <DialogTitle>{"Select a Emoji"}</DialogTitle>
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
                <Button onClick={handleTextEmojiClose} color="primary">
                  Back
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={panelPopup.textPreview}
              onClose={handleTextPreviewClose}
            >
              <DialogTitle className={classes.noneSelect}>
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
                <Button
                  onClick={() => {
                    handleTextPreviewClose();
                    handleTextSend(true);
                  }}
                  color="secondary"
                >
                  Send
                </Button>
                <Button onClick={handleTextPreviewClose} color="primary">
                  Back
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
        open={panelPopup.snackWindow.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={globalSetting.snackWindowDuration}
        onClose={closeSnackWindow}
        className={classes.snack}
      >
        <Alert
          onClose={closeSnackWindow}
          severity={panelPopup.snackWindow.snackWindowType}
        >
          {panelPopup.snackWindow.snackWindowMessage}
        </Alert>
      </Snackbar>
      <Dialog open={panelPopup.profile.open} onClose={handleMoreInfoClose}>
        <DialogContent>
          <div className={classes.avatarProfile}>
            <Avatar
              src={`static/avatar/avatar-${panelPopup.profile.id}.${panelPopup.profile.avatar}`}
              className={classes.largeAvatar}
            >
              {panelPopup.profile.id.charAt(
                panelPopup.profile.id.length - 1
              ) === "U" ? (
                <PersonIcon className={classes.notLargeAvatar} />
              ) : (
                <GroupIcon className={classes.notLargeAvatar} />
              )}
            </Avatar>
            <Typography variant="h5">{panelPopup.profile.name}</Typography>
          </div>
          <Table className={classes.table} size="small">
            <TableBody>
              {panelPopup.profile.rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    component="th"
                    scope="row"
                    align="right"
                    className={classes.formFont}
                  >
                    {row.props}
                  </TableCell>
                  <TableCell align="left" className={classes.formFont}>
                    {row.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          {!(
            panelPopup.profile.id === panelInfo.usrInfo.uid ||
            panelInfo.record.find(
              (value) => panelPopup.profile.id === value.accessInfo.id
            )
          ) && (
            <Button onClick={handleMoreInfoApply} color="secondary">
              Apply for Access
            </Button>
          )}
          <Button onClick={handleMoreInfoClose} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={panelPopup.self.open} onClose={handleMenuProfileClose}>
        <DialogContent>
          <div className={classes.avatarProfile}>
            <Avatar
              src={`static/avatar/avatar-${panelPopup.self.uid}U.${panelPopup.self.avatar}`}
              className={classes.largeAvatar}
            >
              <PersonIcon className={classes.notLargeAvatar} />
            </Avatar>
            <TextField
              label="Username"
              defaultValue={panelPopup.self.username}
              inputProps={{
                spellCheck: "false",
                style: { textAlign: "center" }
              }}
              onChange={(event) => {
                handleMenuProfileChange(event, "username");
              }}
            />
          </div>
          <div className={classes.selfProfile}>
            <div>
              <TextField
                label="UID"
                defaultValue={panelPopup.self.uid}
                disabled
              />
              <TextField
                label="E-mail"
                defaultValue={panelPopup.self.email}
                disabled
              />
            </div>
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  variant="inline"
                  format="yyyy/MM/dd"
                  margin="normal"
                  label="Birthday"
                  value={panelPopup.self.birth}
                  onChange={(value) => {
                    setPanelPopup((panelPopup) => {
                      return {
                        ...panelPopup,
                        self: {
                          ...panelPopup.self,
                          birth: value.toISOString()
                        }
                      };
                    });
                  }}
                />
              </MuiPickersUtilsProvider>
              <FormControl className={classes.genderControl}>
                <InputLabel shrink>Gender</InputLabel>
                <Select
                  value={panelPopup.self.gender}
                  className={classes.selectEmpty}
                  onChange={(event) => {
                    handleMenuProfileChange(event, "gender");
                  }}
                >
                  <MenuItem value={"U"}>Unknown</MenuItem>
                  <MenuItem value={"F"}>Female</MenuItem>
                  <MenuItem value={"M"}>Male</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div>
              <TextField
                label="TEL"
                defaultValue={panelPopup.self.tel}
                onChange={(event) => {
                  handleMenuProfileChange(event, "tel");
                }}
              />
              <TextField
                label="City"
                defaultValue={panelPopup.self.city}
                onChange={(event) => {
                  handleMenuProfileChange(event, "city");
                }}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMenuProfileAvatarChange} color="secondary">
            Change Avatar
          </Button>
          <Button onClick={handleMenuProfileApply} color="secondary">
            Apply
          </Button>
          <Button onClick={handleMenuProfileClose} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={panelPopup.newFriend.open}
        onClose={handleMenuNewClose}
        className={classes.noneSelect}
      >
        <DialogContent>
          <Tabs
            value={panelPopup.newFriend.option}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleMenuNewTabChange}
          >
            <Tab label="Find Users/Groups" />
            <Tab label="Application from Others" />
            <Tab label="Create a Group" />
          </Tabs>
          {panelPopup.newFriend.option === 0 && (
            <div>
              <TextField
                label="Find Users or Groups via ID"
                value={panelPopup.newFriend.find.textInput}
                className={classes.searchTextInput}
                onChange={handleMenuNewFindTextChange}
              />
              <RadioGroup
                row
                value={panelPopup.newFriend.find.box}
                onChange={handleMenuNewFindCheckboxChange}
              >
                <FormControlLabel
                  value={"0"}
                  control={<Radio color="primary" />}
                  label="User"
                  className={classes.checkbox}
                />
                <FormControlLabel
                  value={"1"}
                  control={<Radio color="primary" />}
                  label="Group"
                  className={classes.checkbox}
                />
              </RadioGroup>
            </div>
          )}
          {panelPopup.newFriend.option === 1 &&
            (panelPopup.application.length !== 0 ? (
              <List className={classes.applicationAll}>
                {panelPopup.application.map((value) => {
                  return (
                    <div className={classes.applicationCenter} key={value.uid}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            src={`static/avatar/avatar-${value.uid}U.${value.avatar}`}
                          >
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            value.username +
                            (value.dst[0] && ` want to join ${value.dst[1]}`)
                          }
                          secondary={value.varification}
                        />
                      </ListItem>
                      <Tooltip title="Refuse" placement="top">
                        <IconButton
                          onClick={() => {
                            handleMenuNewApplicationRefuse(
                              value.uid,
                              value.dst[0]
                            );
                          }}
                        >
                          <NotInterestedIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Accept" placement="top">
                        <IconButton
                          onClick={() => {
                            handleMenuNewApplicationAccept(
                              value.uid,
                              value.dst[0]
                            );
                          }}
                        >
                          <AddIcon color="primary" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  );
                })}
              </List>
            ) : (
              <div className={classes.nilApplication}>
                <Typography color="textSecondary" align="center">
                  There is no application now.
                </Typography>
              </div>
            ))}
          {panelPopup.newFriend.option === 2 && (
            <TextField
              label="Name of your New Group"
              value={panelPopup.newFriend.createGroup}
              className={classes.searchTextInput}
              onChange={handleMenuNewCreateTextChange}
            />
          )}
        </DialogContent>
        <DialogActions>
          {panelPopup.newFriend.option === 0 && (
            <Button color="secondary" onClick={handleMenuNewFindSubmit}>
              Find
            </Button>
          )}
          {panelPopup.newFriend.option === 2 && (
            <Button color="secondary" onClick={handleMenuNewCreateSubmit}>
              Create
            </Button>
          )}
          <Button color="primary" onClick={handleMenuNewClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={panelPopup.varification.open}
        onClose={handleMoreInfoApplyClose}
        className={classes.noneSelect}
      >
        <DialogTitle>{"Varifying Identity"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            The message in plain text you write below will be sent to the{" "}
            {panelPopup.varification.id.charAt(
              panelPopup.varification.id.length - 1
            ) === "U"
              ? ` user ${panelPopup.varification.name} `
              : ` holder of group ${panelPopup.varification.name} `}{" "}
            your want to access. You can access as long as it allows your
            request.
          </DialogContentText>
          <TextField
            label="Varifying Message"
            multiline
            rows={4}
            value={panelPopup.varification.textInput}
            fullWidth
            onChange={handleMoreInfoApplyTextChange}
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleMoreInfoApplySend}>
            Send
          </Button>
          <Button color="primary" onClick={handleMoreInfoApplyClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
