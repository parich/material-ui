import { makeStyles } from '@mui/styles';
import React from 'react';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useHistory, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  console.log(theme.mixins.toolbar);
  return {
    root: {
      display: 'flex',
    },
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    title: {
      padding: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlinedIcon color="secondary" />,
      path: '/',
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlineOutlinedIcon color="secondary" />,
      path: '/create',
    },
  ];

  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar elevation={0} sx={{ width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar>
          <Typography component="p" sx={{ flexGrow: 1 }}>
            Today is the {format(new Date(), 'do MMMM Y')}
          </Typography>
          <Stack direction="row" spacing={3}>
            <Typography>Mario</Typography>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          </Stack>
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            Notes
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              sx={{
                backgroundColor:
                  location.pathname == item.path ? '#D7A1F9' : null,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* main content */}
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
