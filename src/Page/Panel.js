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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import { makeStyles, useTheme } from '@material-ui/core/styles';

let panelReading = {
  usrInfo: {
    uid: 1024,
    username: 'Alice',
    email: 'abc@xyz.cn',
    tel: null,
    city: 'Shanghai',
    gender: 'F',
    avatar: 'src/graphic/1.jpg',
  },
  record: [
    {
      type: 'U',
      accessInfo: {
        uid: 2048,
        username: 'Yuki',
        email: 'd.ts@outlook.com',
        tel: '1234567890',
        city: 'Beijing',
        gender: 'M',
        avatar: 'src/graphic/2.jpg',
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
        groupName: 'TMA',
        groupAvatar: 'src/graphic/3.jpg',
        groupHolder: 2048,
        groupMember: [
          1024,
          2048,
          4096,
          8192
        ]
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
    }
  ],
};

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
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
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
          <IconButton color="inherit" aria-label="open drawer" onClick={handleToggleSideListItem} edge="start" className={clsx(classes.menuButton, sideListItem && classes.hide)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={sideListItem} classes={{paper: classes.drawerPaper,}}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleCloseSideListItem}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key={0} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
            <ListItemAvatar>
              <Avatar alt='Miku' src='static/avatar/miku.jpg' />
            </ListItemAvatar>
            <ListItemText primary='Miku' secondary="Hello!"/>
          </ListItem>

          <ListItem button key={1} selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
            <ListItemAvatar>
              <Avatar alt='Miya' src='static/avatar/miya.jpg' />
            </ListItemAvatar>
            <ListItemText primary='Miya' secondary="Hi!" />
          </ListItem>

          <ListItem button key={2} selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
            <ListItemAvatar>
              <Avatar alt='chocomint' src='static/avatar/chocomint.png' />
            </ListItemAvatar>
            <ListItemText primary='chocomint' secondary="The latest Message."/>
          </ListItem>
        </List>
      </Drawer>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: sideListItem,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
          facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
          tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
          consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
          vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
          hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
          tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
          nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
          accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </main>
    </div>
  );
}
