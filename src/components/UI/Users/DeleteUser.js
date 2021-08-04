import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import {useData} from './../../../contexts/DataContext'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

export default function DeleteUser({ userId }) {
  const [open, setOpen] = React.useState(false);
  const {user, logout, users, setUsers} = useData()
  const history = useHistory()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const copyUsers = [...users]

    axios.delete(`/users/${userId}`).then(res => {
      if(res.status === 204) {
        alert('User successfuly deleted.')
        if(user.role === 'user') {
          logout(history)
        }

        const newUsers = copyUsers.filter(user => user._id !== userId)
        setUsers(newUsers)
        history.push('/')
      }
    })
    .catch(err => {
      console.log(err.response)
    })
  }

  return (
    <div>
      <Button size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
        Delete
        <DeleteIcon style={{ height: '.8em' }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Profile?"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogContentText id="alert-dialog-description">
              Beware, after deleting this profile there is no going back,
              before deleting copy the data somewhere safe.
            </DialogContentText>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" onClick={handleClose} color="primary" autoFocus>
                Submit
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
