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

export default function DeleteUser({ carId, handleAlertOpening }) {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false)
  const [btnLoading, setBtnLoading] = useState(false)
  const { myVehicles, setMyVehicles } = useData()

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
        const updatedVehicles = [...myVehicles].filter(v => v._id !== carId)

        setTimeout(() => {
          setMyVehicles(updatedVehicles)
          handleAlertOpening(true)
          setBtnLoading(false)
          setOpen(false)
        }, 2000)
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
      </Button>
      {/* <Alerts message="Successfully deleted!" open={alertOpen} handleOpening={setAlertOpen} severity="error" /> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Car?"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this car?
            </DialogContentText>
            <DialogActions>
              <Button variant="contained" onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary" autoFocus>
                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
