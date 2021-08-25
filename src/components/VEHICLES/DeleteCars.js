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
import Alerts from './../UI/Alerts'
import { withNamespaces } from 'react-i18next';
import { useHistory } from 'react-router-dom';

function DeleteCars({ t, setOnHandleDeleteOpen }) {
  const [open, setOpen] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  const { vehicles, setVehicles, user } = useData()
  const history = useHistory()

  const carId = history.location.pathname.split('/')[2]
  let deleteCarTimeout

  React.useEffect(() => {
    return () => {
      clearTimeout(deleteCarTimeout)
    }
  }, [])

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
        setOpen(false)
        setVehicles(updatedVehicles)
        setOnHandleDeleteOpen(true)
        setBtnLoading(false)

        deleteCarTimeout = setTimeout(() => {
          history.push('/cars')
        }, 2000)
      }
    })
      .catch(err => {
        console.log(err.response)
      })
  }

  return (
    user.role === 'admin' &&
    <div>
      <Button size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
        {t('DeleteVehicleButton')}
      </Button>
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
              <Button variant="contained" onClick={handleClose} color="secondary">
                {t('CancelButton')}
              </Button>
              <Button type="submit" variant="contained" color="primary" autoFocus>
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