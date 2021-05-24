import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import CodeIcon from '@material-ui/icons/Code';
import LinkIcon from '@material-ui/icons/Link';
import SendIcon from '@material-ui/icons/Send';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';

let panelReading = {
  usrInfo: {
    uid: '1024U',
    username: 'Koishi',
    email: 'abc@xyz.com',
    avatar: 'png'
  },
  record: [
    {
      accessInfo: {
        id: '16384G',
        name: 'Miya Ouendan',
        avatar: 'jpg',
      },
      log: [
        {
          rid: 3,
          sender: 'Saki',
          senderID: '32768U',
          senderAvatar: 'jpg',
          text: 'Hello everyone.',
          time: '2021-05-23T04:25:41.181Z'
        },
        {
          rid: 4,
          sender: 'Alice',
          senderID: '1024U',
          senderAvatar: 'png',
          text: 'Have a good day!',
          time: '2021-05-23T04:28:46.995Z'
        },
      ]
    },
    {
      accessInfo: {
        id: '2048U',
        name: 'chocomint',
        avatar: 'png',
      },
      log: [
        {
          rid: 1,
          sender: 'chocomint',
          senderID: '2048U',
          senderAvatar: 'png',
          text: 'Hello!',
          time: '2021-05-23T04:20:44.733Z'
        },
        {
          rid: 2,
          sender: 'Alice',
          senderID: '1024U',
          senderAvatar: 'png',
          text: 'Hi!',
          time: '2021-05-23T04:21:25.401Z'
        }
      ]
    },
    {
      accessInfo: {
        id: '4096U',
        name: 'Miku',
        avatar: 'jpg',
      },
      log: [
      ]
    },
  ],
  state: {
    selectedRecord: '16384G',
    selectedName: 'Miya Ouendan',
    sideListItem: true,
  },
};

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    userSelect: 'none',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    userSelect: 'none',
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    alignItems: 'center',
    padding: theme.spacing(0, 0),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    height: '100vh',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  recordField: {
    overflowX: 'auto',
    flexGrow: 1,
  },
  card: {
    maxWidth: '64%',
    margin: theme.spacing(0, 2),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  recordItemLeft: {
    display: 'flex',
    padding: theme.spacing(1, 2),
    flexFlow: 'row nowrap',
  },
  recordItemRight: {
    display: 'flex',
    padding: theme.spacing(1, 2),
    flexFlow: 'row-reverse nowrap',
  },
  recordAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  recordOffset: {
    paddingTop: theme.spacing(1),
  },
  cardTitle: {
    padding: theme.spacing(1, 2, 0, 2),
  },
  cardText: {
    padding: theme.spacing(0, 2, 1, 2),
  },
  textField: {
    '& .MuiTextField-root': {
      width: 'calc(100% - 24px)',
    },
    margin: theme.spacing(1, 0, 0, 2),
  },
  textButton: {
    display: 'flex',
    width: 'calc(100% - 32px)',
    padding: 0,
  },
  textSpan: {
    flexGrow: 1,
  },
}));

Date.prototype.format = function(formatString){
  var formatComponent = {
    "M+" : this.getMonth() + 1,
    "d+" : this.getDate(),
    "h+" : this.getHours(),
    "m+" : this.getMinutes(),
    "s+" : this.getSeconds(),
    "q+" : Math.floor((this.getMonth()+3)/3),
    "S"  : this.getMilliseconds()
  };

  if(/(y+)/.test(formatString))
    formatString = formatString.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));

  for(var index in formatComponent)
    if(new RegExp(`(${index})`).test(formatString))
      formatString = formatString.replace(
        RegExp.$1, (RegExp.$1.length==1) ? (formatComponent[index]) : (("00"+ formatComponent[index])
        .substr((""+ formatComponent[index]).length)));
  return formatString;
}

const formatSideTime = (timeString) => {
  let timeThen = new Date(timeString), timeNow = new Date();
  let sameYear = (timeThen.getFullYear() == timeNow.getFullYear()),
      sameMonth = sameYear && (timeThen.getMonth() == timeNow.getMonth()),
      sameDay = sameMonth && (timeThen.getDay() == timeNow.getDay());
  let formatString = (sameYear ? '' : 'yyyy-') + (sameDay ? '' : 'MM-dd ') + 'hh:mm:ss';
  return timeThen.format(formatString);
}

export default function Panel() {
  const classes = useStyles();
  // const theme = useTheme();

  // the info need by user interface
  const [panelInfo, setPanelInfo] = React.useState(panelReading);
  const handleToggleSideListItem = () => {
    setPanelInfo(panelInfo => ({
      ...panelInfo,
      state: { ...panelInfo.state, sideListItem: true, }
    }));
  };
  const handleCloseSideListItem = () => {
    setPanelInfo(panelInfo => ({
      ...panelInfo,
      state: { ...panelInfo.state, sideListItem: false, }
    }));
  };
  const handleListItemClick = (event, comb, name) => {
    setPanelInfo(panelInfo => ({
      ...panelInfo,
      state: {
        ...panelInfo.state,
        selectedRecord: comb,
        selectedName: name,
      }
    }));
  };
  

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: panelInfo.state.sideListItem,})}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" className={classes.menuButton}
                      onClick={panelInfo.state.sideListItem ? handleCloseSideListItem : handleToggleSideListItem}>
            {panelInfo.state.sideListItem ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography className={classes.textSpan} variant="h6" noWrap>
            {panelInfo.state.selectedName}
          </Typography>
          <IconButton color="inherit" edge="end">
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={panelInfo.state.sideListItem} classes={{paper: classes.drawerPaper}}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={`static/avatar/avatar-${panelInfo.usrInfo.uid}.${panelInfo.usrInfo.avatar}`}><PersonIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary={panelInfo.usrInfo.username} secondary={panelInfo.usrInfo.email}/>
          </ListItem>
        </List>
        <Divider />

        <List>
          {panelInfo.record.map((value) => {
            return(
              <ListItem button key={value.accessInfo.id} selected={panelInfo.state.selectedRecord === value.accessInfo.id}
                        onClick={(event) => handleListItemClick(event, value.accessInfo.id, value.accessInfo.name)}>
                <ListItemAvatar>
                  <Avatar src={value.accessInfo.avatar}>
                    {value.accessInfo.id.charAt(value.accessInfo.id.length - 1) === 'U' ? <PersonIcon /> : <GroupIcon/>}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={value.accessInfo.name}
                  secondary={value.log.length > 0 ? formatSideTime(value.log[value.log.length - 1].time) : '(No Message Yet)'}/>
              </ListItem>
            )})}
        </List>
      </Drawer>

      <main className={clsx(classes.content, {[classes.contentShift]: panelInfo.state.sideListItem,})}>
        <div className={classes.drawerHeader} />
        <div className={classes.recordField} variant="outlined">
          {panelInfo.record.find(value => (value.accessInfo.id == panelInfo.state.selectedRecord))
            .log.map(value => (
              <div className={value.senderID == panelInfo.usrInfo.uid ? classes.recordItemRight : classes.recordItemLeft}>
                <div className={classes.recordOffset}>
                  <Avatar className={classes.recordAvatar} src={`static/avatar/avatar-${value.senderID}.${value.senderAvatar}`}><PersonIcon /></Avatar>
                </div>
                <Card className={classes.card}>
                  <div className={classes.cardTitle}>
                    <Typography color="textSecondary">
                      <b>{value.sender}</b> {formatSideTime(value.time)}
                    </Typography>
                  </div>
                  <div className={classes.cardText}>
                    <Typography color="textPrimary">
                      {value.text}
                    </Typography>
                  </div>
                </Card>
              </div>
            ))}
        </div>

        <div className={classes.textField}>
          <TextField id="outlined-multiline-static" label="Leave a Message in Markdown" multiline rows={4} variant="outlined"/>
          <Toolbar className={classes.textButton}>
            <IconButton><InsertEmoticonIcon /></IconButton>
            <IconButton><FormatBoldIcon /></IconButton>
            <IconButton><FormatItalicIcon /></IconButton>
            <IconButton><StrikethroughSIcon /></IconButton>
            <IconButton><LinkIcon /></IconButton>
            <IconButton><CodeIcon /></IconButton>
            <div className={classes.textSpan}></div>
            <IconButton><SendIcon /></IconButton>
          </Toolbar>
        </div>
      </main>
    </div>
  );
}
