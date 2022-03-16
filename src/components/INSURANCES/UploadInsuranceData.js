import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { useData } from './../../contexts/DataContext'
import FloatingButton from './../UI/FloatingButton';
import AddIcon from '@material-ui/icons/Add';
import Alerts from './../UI/Alerts'
import { withNamespaces } from 'react-i18next';

function UploadInsuranceData({ t }) {
  const [open, setOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const { insurances, setInsurances, setGeneralAlertOptions } = useData()

  const [fields, setFields] = useState({
    name: '',
    street: '',
    number: '',
    postNumber: '',
    city: '',
    phoneNumber: ''
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBtnLoading(true)

    const data = { ...fields }
    axios.post('/insuranceHouse', data).then(res => {
      // console.log(res.data)
      if (res.status === 201) {
        const updatedInsurances = [...insurances, res.data.newInsuranceHouse]

        setInsurances(updatedInsurances)
        setBtnLoading(false)
        setOpen(false)
        setAlertOpen(true)
        //fix loader later
      }
    })
      .catch(err => {
        setBtnLoading(false)
        setGeneralAlertOptions({
          open: true,
          message: err.response ? err.response.data.message : 'Server-Fehler......',
          severity: 'error',
          hideAfter: 2500
        })
      })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <FloatingButton onHandleClick={handleClickOpen}>
        <AddIcon />
      </FloatingButton>
      <Alerts message={t('AlertGeneralSuccessful')} open={alertOpen} handleOpening={setAlertOpen} />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('NewInsuranceFormTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('NewInsuranceHouseFormHint')}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              autoFocus
              margin="dense"
              id="nameId"
              label={t('InsuranceHouseNameInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="street"
              margin="dense"
              id="streetId"
              label={t('StreetInputLabel')}
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="number"
              margin="dense"
              id="numberAdressId"
              label={t('AddressNumberInputLabel')}
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="postNumber"
              margin="dense"
              id="postNumber"
              label={t('PostNumberInputLabel')}
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="city"
              margin="dense"
              id="city"
              label={t('CityInputLabel')}
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="phoneNumber"
              margin="dense"
              id="phoneNumber"
              label={t('PhoneNumberInputLabel')}
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant="contained">
                Cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained">
                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withNamespaces()(UploadInsuranceData)
