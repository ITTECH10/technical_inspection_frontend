import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'
import { useData } from './../../contexts/DataContext'
import axios from 'axios'
import { withNamespaces } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Tooltip, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  btnRoot: {
    fontSize: 9,
    [theme.breakpoints.up('sm')]: {
      fontSize: '0.8125rem',
    }
  }
}))

function DeleteCars({ t, setOnHandleDeleteOpen }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles()
  const [btnLoading, setBtnLoading] = useState(false)
  const { vehicles, setVehicles, user, setCustomersVehicles, customersVehicles, setGeneralAlertOptions } = useData()
  const history = useHistory()

  const carId = history.location.pathname.split('/')[2]
  const deleteCarTimeout = React.useRef()

  React.useEffect(() => {
    return () => {
      clearTimeout(deleteCarTimeout.current)
    }
  }, [deleteCarTimeout])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setBtnLoading(true)

    axios.delete(`/cars/${carId}`).then(res => {
      if (res.status === 204) {
        const updatedVehicles = [...vehicles].filter(v => v._id !== carId)
        const updatedCustomersVehicles = [...customersVehicles].filter(v => v._id !== carId)

        setOpen(false)
        setVehicles(updatedVehicles)
        setCustomersVehicles(updatedCustomersVehicles)
        setOnHandleDeleteOpen(true)
        setBtnLoading(false)

        deleteCarTimeout.current = setTimeout(() => {
          history.push('/cars')
        }, 2000)
      }
    })
      .catch(err => {
        setGeneralAlertOptions({
          open: true,
          message: err.response ? err.response.data.message : 'Server-Fehler......',
          severity: 'error',
          hideAfter: 2500
        })
        // console.log(err.response)
      })
  }

  return (
    user.role === 'admin' &&
    <div>
      <Tooltip title={t('DeleteVehicleFormTitle')}>
        <IconButton className={classes.btnRoot} size="small" variant="contained" color="primary" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('DeleteVehicleFormTitle')}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogContentText id="alert-dialog-description">
              {t('DeleteVehicleFormHint')}
            </DialogContentText>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="primary">
                {t('CancelButton')}
              </Button>
              <Button type="submit" variant="contained" color="secondary" autoFocus>
                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('DeleteButton')}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withNamespaces()(DeleteCars)