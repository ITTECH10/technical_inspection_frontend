import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        New User
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new user, simply fill the fields below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mail"
            label="Email Address"
            type="email"
            fullWidth
          />
          <TextField
            margin="dense"
            id="last-inspected"
            label="Last inspected"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="vehicle-model"
            label="Vehicle Model"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="pwd"
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            margin="dense"
            id="confirm-pwd"
            label="Confirm Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" variant="contained">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
