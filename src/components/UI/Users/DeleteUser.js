import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
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
  const { user, users, setUsers, setGeneralAlertOptions } = useData()
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

    axios.delete(`/users/${userId}`).then(res => {
      if (res.status === 204) {
        res = undefined
        const copyUsers = [...users]
        setAlertOpen(true)

        const updatedUsers = copyUsers.filter(user => user._id !== userId)
        setUsers(updatedUsers)

        setTimeout(() => {
          setAlertOpen(false)
          history.push('/')
        }, 3000)
      }
    })
      .catch(err => {
        // console.log(err.response)
        setGeneralAlertOptions({
          open: true,
          message: err.response ? err.response.data.message : 'Server-Fehler......',
          severity: 'error',
          hideAfter: 5000
        })
      })
  }

  return (
    user.role === 'admin' &&
    <div>
      <Tooltip title={t('DeleteCustomerButton')}>
        <IconButton className={classes.btnRoot} size="small" variant="contained" color="primary" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Alerts message={t('AlertGeneralDeleted')} open={alertOpen} handleOpening={setAlertOpen} severity="error" />
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
              <Button variant="contained" onClick={handleClose} color="primary">
                {t('CancelButton')}
              </Button>
              <Button type="submit" variant="contained" onClick={handleClose} color="secondary" autoFocus>
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
