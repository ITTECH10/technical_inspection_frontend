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
// import { setAuthorizationHeader } from './../../utils/setAuthorizationHeader'
import { useData } from './../../contexts/DataContext'
// import { useHistory } from 'react-router-dom';
import FloatingButton from './FloatingButton';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { generateId } from './../../utils/helpers'
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    width: '100%'
  },
}))

function NewCustomer({ handleAlertOpening, t }) {
  const [open, setOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  const classes = useStyles()

  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    street: '',
    postCode: '',
    city: '',
    birthDate: '',
    password: generateId(),
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})

  const { users, setUsers } = useData()

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setBtnLoading(true)

    const data = { ...fields, confirmPassword: fields.password }
    axios.post('/users/signup', data).then(res => {
      if (res.status === 201) {
        const updatedUsers = [...users, { ...res.data.newUser }]

        setTimeout(() => {
          setUsers(updatedUsers)
          setBtnLoading(false)
          setOpen(false)
          handleAlertOpening(true)
        }, 2000)
      }
    })
      .catch(err => {
        setBtnLoading(false)
        setErrors(JSON.parse(err.response.data.message))
      })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({})
  };

  return (
    <div>
      <FloatingButton onHandleClick={handleClickOpen}>
        <AddIcon />
      </FloatingButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('NewCustomerFormTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('NewCustomerFormHint')}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              name="firstName"
              error={errors.firstName && errors.firstName}
              helperText={errors.firstName && errors.firstName}
              margin="dense"
              id="firstName"
              label={t('FirstNameInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="lastName"
              error={errors.lastName && errors.lastName}
              helperText={errors.lastName && errors.lastName}
              margin="dense"
              id="lastName"
              label={t('LastNameInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="birthDate"
              error={errors.birthDate && errors.birthDate}
              helperText={errors.birthDate && errors.birthDate}
              id="birthDate"
              label={t('BirthDateInputLabel')}
              onChange={handleChange}
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="email"
              error={errors.email && errors.email}
              helperText={errors.email && errors.email}
              margin="dense"
              id="mail"
              label={t('EmailInputLabel')}
              onChange={handleChange}
              type="email"
              fullWidth
            />
            <TextField
              name="phoneNumber"
              error={errors.phoneNumber && errors.phoneNumber}
              helperText={errors.phoneNumber && errors.phoneNumber}
              margin="dense"
              id="phoneNumber"
              label={t('PhoneNumberInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="street"
              error={errors.street && errors.street}
              helperText={errors.street && errors.street}
              margin="dense"
              id="street"
              label={t('StreetInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="postCode"
              error={errors.postCode && errors.postCode}
              helperText={errors.postCode && errors.postCode}
              margin="dense"
              id="pwd"
              label="Post code"
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="city"
              error={errors.city && errors.city}
              helperText={errors.city && errors.city}
              margin="dense"
              id="confirm-pwd"
              label="City"
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant="contained">
                {t('CancelButton')}
              </Button>
              <Button disabled={Object.values(fields).filter((el, i) => i !== 8).every(el => el === '')} type="submit" color="secondary" variant="contained">
                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withNamespaces()(NewCustomer)