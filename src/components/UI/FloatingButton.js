import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {}
}));

export default function FloatingButton({onHandleClick, children, color="primary"}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Fab onClick={onHandleClick} color={color} aria-label="add" className={classes.fab}>
        {children}
      </Fab>
    </div>
  );
}
