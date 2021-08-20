import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import { useData } from './../../../contexts/DataContext'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import Alerts from '../Alerts';
import { makeStyles } from '@material-ui/styles';
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  btnRoot: {
    fontSize: 9,
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.8125rem',
    }
  }
}))

function DeleteUser({ userId, t }) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false)
  const { user, logout, users, setUsers } = useData()
  const history = useHistory()
  const classes = useStyles()

  if (user.role === 'user') {
    userId = user._id
  }

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
      if (res.status === 204) {
        setAlertOpen(true)

        if (user.role === 'user') {
          setTimeout(() => {
            setAlertOpen(false)
            logout(history)
          }, 3000)
        }

        const newUsers = copyUsers.filter(user => user._id !== userId)
        setUsers(newUsers)

        setTimeout(() => {
          setAlertOpen(false)
          history.push('/')
        }, 3000)
      }
    })
      .catch(err => {
        console.log(err.response)
      })
  }

  return (
    <div>
      <Button className={classes.btnRoot} size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
        {t('DeleteCustomerButton')}
        <DeleteIcon style={{ height: '.8em' }} />
      </Button>
      <Alerts message="Successfully deleted!" open={alertOpen} handleOpening={setAlertOpen} severity="error" />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('DeleteCustomerFormTitle')}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogContentText id="alert-dialog-description">
              {t('DeleteCustomerFormHint')}
            </DialogContentText>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="secondary">
                {t('CancelButton')}
              </Button>
              <Button type="submit" variant="contained" onClick={handleClose} color="primary" autoFocus>
                {t('SubmitButton')}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withNamespaces()(DeleteUser)
