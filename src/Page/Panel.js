import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import SimpleCard from './SimpleCard';

let panelReading = {
  usrInfo: {
    uid: 1024,
    username: 'Alice',
    avatar: 'static/avatar/avatar-1024U.jpg'
  },
  state: {
    selectedRecord: '',
  },
  record: [
    {
      type: 'U',
      accessInfo: {
        uid: 2048,
        username: 'chocomint',
        avatar: 'static/avatar/avatar-2048U.png',
      },
      log: [
        {
          rid: 1,
          text: '<p>Hello!<p>', 
          time: '2021-05-23T04:20:44.733Z'
        },
        {
          rid: 2,
          text: '<p>Hi!<p>', 
          time: '2021-05-23T04:21:25.401Z'
        }
      ]
    },
    {
      type: 'G',
      accessInfo: {
        gid: 16384,
        groupName: 'Miya Ouendan',
        groupAvatar: 'static/avatar/avatar-16384G.jpg',
      },
      log: [
        {
          rid: 3,
          text: '<p>Hello everyone.<p>', 
          time: '2021-05-23T04:25:41.181Z'
        },
        {
          rid: 4,
          text: '<p>Have a good day!<p>', 
          time: '2021-05-23T04:28:46.995Z'
        },
      ]
    },
    {
      type: 'U',
      accessInfo: {
        uid: 4096,
        username: 'Miku',
        avatar: 'static/avatar/avatar-4096U.jpg',
      },
      log: [
      ]
    }
  ],
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
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    alignItems: 'center',
    padding: theme.spacing(0, 0),
    // necessary for content to be below app bar
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
  },
  textField: {
    '& .MuiTextField-root': {
      width: 'calc(100% - 16px)',
    },
    margin: theme.spacing(0, 0, 2, 2),
  },
}));

export default function Panel() {
  const classes = useStyles();
  const theme = useTheme();

  // the info need by user interface
  const [panelInfo, setPanelInfo] = React.useState(panelReading);

  // the sidebar and the selected index
  const [sideListItem, setSideListItem] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleToggleSideListItem = () => { setSideListItem(true); };
  const handleCloseSideListItem = () => { setSideListItem(false); };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={clsx(classes.appBar, {[classes.appBarShift]: sideListItem,})}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" edge="start" className={classes.menuButton}
                      onClick={sideListItem ? handleCloseSideListItem : handleToggleSideListItem}>
            {sideListItem ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Miku
          </Typography>
          <IconButton color="inherit" edge="end">
            <MoreHorizIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={sideListItem} classes={{paper: classes.drawerPaper}}>
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar alt='Alice' src='static/avatar/alice.jpg'><PersonIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary='Alice' secondary="abc@xyz.cn"/>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button key={0} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemAvatar>
              <Avatar alt='Miku' src='static/avatar/miku.jpg'><PersonIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary='Miku' secondary="Hello!"/>
          </ListItem>
          <ListItem button key={1} selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemAvatar>
              <Avatar alt='Miya Ouendan' src='static/avatar/miya.jpg'><GroupIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary='Miya' secondary="Hi!" />
          </ListItem>
          <ListItem button key={2} selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemAvatar>
              <Avatar alt='chocomint' src='static/avatar/chocomint.png'><PersonIcon /></Avatar>
            </ListItemAvatar>
            <ListItemText primary='chocomint' secondary="The latest Message."/>
          </ListItem>
        </List>
      </Drawer>

      <main className={clsx(classes.content, {[classes.contentShift]: sideListItem,})}>
        <div className={classes.drawerHeader} />

        <div className={classes.recordField} variant="outlined" square>
          <SimpleCard />
          <SimpleCard />
          <SimpleCard />
          <SimpleCard />
          <SimpleCard />
          <SimpleCard />
        </div>

        <div className={classes.textField}>
          <TextField id="outlined-multiline-static" label="Leave a Message in Markdown" multiline rows={5} variant="outlined" square/>
        </div>
      </main>
    </div>
  );
}
