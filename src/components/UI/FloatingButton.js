import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { useHistory } from 'react-router-dom';

export default function FloatingButton({ onHandleClick, children, color = "primary", bottom = 80, right }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        position: 'fixed',
        bottom: bottom || theme.spacing(2),
        right: right || theme.spacing(2),
        zIndex: 1500
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fab: {}
  }));

  const classes = useStyles();
  const history = useHistory()

  return (
    history.location.pathname !== '/account' &&
    <div className={classes.root}>
      <Fab onClick={onHandleClick} color={color} aria-label="add" className={classes.fab}>
        {children}
      </Fab>
    </div>
  );
}
