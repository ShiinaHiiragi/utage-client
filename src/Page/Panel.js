import React from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import Markdown from 'markdown-to-jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import ImageIcon from '@material-ui/icons/Image';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import CodeIcon from '@material-ui/icons/Code';
import LinkIcon from '@material-ui/icons/Link';
import SendIcon from '@material-ui/icons/Send';
import AirplayIcon from '@material-ui/icons/Airplay';
import StrikethroughSIcon from '@material-ui/icons/StrikethroughS';
import SignIn from './SignIn';

// panelReading should:
// 1. record and log are sorted chronologically
// 2. selectedName and selectedRecord are the first record
// 3. the first record's unread count should be 0
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
        id: '2048U',
        name: 'chocomint',
        avatar: 'png',
      },
      status: {
        unread: 0,
        all: true,
      },
      log: [
        {
          rid: 1,
          sender: 'chocomint',
          senderID: '2048U',
          senderAvatar: 'png',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
          time: '2021-05-23T04:20:44.733Z'
        },
        {
          rid: 2,
          sender: 'Koishi',
          senderID: '1024U',
          senderAvatar: 'png',
          text: 'Nobis qui esse a distinctio rem sed vero quae repudiandae dolores, dolorem nostrum excepturi inventore consequuntur quo quisquam officiis, expedita hic sit.',
          time: '2021-05-23T04:21:25.401Z'
        },
        {
          rid: 5,
          sender: 'chocomint',
          senderID: '2048U',
          senderAvatar: 'png',
          text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, exercitationem obcaecati? Accusantium voluptatem, dolores voluptatum voluptate tempora impedit aliquam labore doloribus nisi fugit sapiente. Libero consectetur quam corporis ducimus pariatur.',
          time: '2021-05-24T11:14:31.271Z'
        },
        {
          rid: 6,
          sender: 'Koishi',
          senderID: '1024U',
          senderAvatar: 'png',
          text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque, ducimus. Sit error, repudiandae exercitationem alias asperiores odit officia possimus ducimus, esse amet praesentium, commodi quam aperiam quae maiores suscipit ipsa.',
          time: '2021-05-24T11:14:41.634Z'
        },
      ]
    },
    {
      accessInfo: {
        id: '16384G',
        name: 'Miya Ouendan',
        avatar: 'jpg',
      },
      status: {
        unread: 1,
        all: true,
      },
      log: [
        {
          rid: 3,
          sender: 'Saki',
          senderID: '32768U',
          senderAvatar: 'jpg',
          text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat ipsam, temporibus tempora corporis quod vero eligendi odio accusamus porro! Repudiandae iusto quam molestias, doloremque fugiat aliquam beatae similique! Beatae, corporis.',
          time: '2021-05-23T04:25:41.181Z'
        },
        {
          rid: 4,
          sender: 'Koishi',
          senderID: '1024U',
          senderAvatar: 'png',
          text: 'Lorem ipsum dolor sit amet',
          time: '2021-05-23T04:28:46.995Z'
        },
      ]
    },
    {
      accessInfo: {
        id: '4096U',
        name: 'Miku',
        avatar: 'jpg',
      },
      status: {
        unread: 0,
        all: true,
      },
      log: [
      ]
    },
  ],
  state: {
    selectedRecord: '2048U',
    selectedName: 'chocomint',
    sideListItem: true,
    moreAnchor: null,
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
    userSelect: 'none',
  },
  cardText: {
    padding: theme.spacing(0, 2, 1, 2),
    fontSize: '16px',
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

// eslint-disable-next-line
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
        RegExp.$1, (RegExp.$1.length === 1) ? (formatComponent[index]) : (("00"+ formatComponent[index])
        .substr((""+ formatComponent[index]).length)));
  return formatString;
}

const formatSideTime = (timeString) => {
  let timeThen = new Date(timeString), timeNow = new Date();
  let sameYear = (timeThen.getFullYear() === timeNow.getFullYear()),
      sameMonth = sameYear && (timeThen.getMonth() === timeNow.getMonth()),
      sameDay = sameMonth && (timeThen.getDay() === timeNow.getDay());
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
      },
      record: panelInfo.record.map(value => (value.accessInfo.id === comb ?
        {...value, status: {...value.status, unread: 0}} : value)),
    }));
  };

  const handleMoreClick = (event) => {
    setPanelInfo(panelInfo => ({
      ...panelInfo,
      state: { ...panelInfo.state, moreAnchor: event.currentTarget, }
    }));
  };
  const handleMoreClose = () => {
    setPanelInfo(panelInfo => ({
      ...panelInfo,
      state: { ...panelInfo.state, moreAnchor: null, }
    }));
  };
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
    // TODO: complete the functions
    ReactDOM.render(
      <SignIn />,
      document.getElementById('root')
    );
  };
  const handleMoreInfoClick = () => {
    // TODO: complete the functions
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: panelInfo.state.sideListItem,})}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" className={classes.menuButton}
                      onClick={panelInfo.state.sideListItem ? handleCloseSideListItem : handleToggleSideListItem}>
            {panelInfo.state.sideListItem ?
              <Tooltip title="Fold" placement="bottom"><ChevronLeftIcon /></Tooltip> :
              <Tooltip title="Unfold" placement="bottom"><MenuIcon /></Tooltip>}
          </IconButton>
          <Typography className={classes.textSpan} variant="h6" noWrap>
            {panelInfo.state.selectedName}
          </Typography>
          <IconButton color="inherit" edge="end" onclick={handleMoreInfoClick}>
            <Tooltip title="Info" placement="bottom"><InfoOutlinedIcon /></Tooltip>
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
            <Tooltip title="More" placement="top">
              <IconButton onClick={handleMoreClick}><MoreVertIcon /></IconButton> 
            </Tooltip>
            <Menu anchorEl={panelInfo.state.moreAnchor} keepMounted open={Boolean(panelInfo.state.moreAnchor)} onClose={handleMoreClose}>
              <MenuItem onClick={handleMenuProfileClick}>My Profile</MenuItem>
              <MenuItem onClick={handleMenuAddClick}>Add Friends/Groups</MenuItem>
              <MenuItem onClick={handleMenuLogOutClick}>Log Out</MenuItem>
            </Menu>
          </ListItem>
        </List>
        <Divider />
        <List>
          {panelInfo.record.map((value) => {
            return(
              <ListItem button key={value.accessInfo.id} selected={panelInfo.state.selectedRecord === value.accessInfo.id}
                        onClick={(event) => handleListItemClick(event, value.accessInfo.id, value.accessInfo.name)}>
                <ListItemAvatar>
                  <Badge badgeContent={value.status.unread} color="secondary">
                    <Avatar src={`static/avatar/avatar-${value.accessInfo.id}.${value.accessInfo.avatar}`}>
                      {value.accessInfo.id.charAt(value.accessInfo.id.length - 1) === 'U' ? <PersonIcon /> : <GroupIcon/>}
                    </Avatar>
                  </Badge>

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
          {panelInfo.record.find(value => (value.accessInfo.id === panelInfo.state.selectedRecord))
            .log.map(value => (
              <div key={value.rid} className={value.senderID === panelInfo.usrInfo.uid ? classes.recordItemRight : classes.recordItemLeft}>
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
                    <Markdown>{value.text}</Markdown>
                  </div>
                </Card>
              </div>
            ))}
        </div>

        <div className={classes.textField}>
          <TextField id="outlined-multiline-static" label="Leave a Message in Markdown" multiline rows={4} variant="outlined"/>
          <Toolbar className={classes.textButton}>
            <Tooltip title="Emoji" placement="top">
              <IconButton><InsertEmoticonIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Insert Image" placement="top">
              <IconButton><ImageIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Bold" placement="top">
              <IconButton><FormatBoldIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Italic" placement="top">
              <IconButton><FormatItalicIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Strikethrough" placement="top">
              <IconButton><StrikethroughSIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Link" placement="top">
              <IconButton><LinkIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Code Line" placement="top">
              <IconButton><CodeIcon /></IconButton>
            </Tooltip>
            <div className={classes.textSpan}></div>
            <Tooltip title="Preview" placement="top">
              <IconButton><AirplayIcon /></IconButton>
            </Tooltip>
            <Tooltip title="Send" placement="top">
              <IconButton><SendIcon /></IconButton>
            </Tooltip>
          </Toolbar>
        </div>
      </main>
    </div>
  );
}
