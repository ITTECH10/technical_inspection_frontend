import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import NewUserCreation from './NewUserCreation'
import { useData } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom';
import Menu from './Menu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer'
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const { logout, user } = useData()
  const history = useHistory()
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ width: matches && 'calc(100% - 240px)' }}>
        <Toolbar>
          <Menu />
          <Typography onClick={() => history.push('/')} variant="h6" className={classes.title}>
            Home
          </Typography>
          <Typography>
            Logged in as {user.role === 'user' ? `${user.firstName} ${user.lastName}` : 'ADMIN'}
          </Typography>
          {history.location.pathname !== '/' && <IconButton onClick={() => history.goBack()}><ArrowBackIcon /></IconButton>}
          <Button onClick={() => logout(history)} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
