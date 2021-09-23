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

  let userCreationTimeout = React.useRef()

  React.useEffect(() => {
    return () => {
      clearTimeout(userCreationTimeout.current)
    }
  }, [userCreationTimeout])

  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    smartphoneNumber: '',
    street: '',
    postCode: '',
    city: '',
    birthDate: '',
    password: generateId(),
    confirmPassword: ''
  })

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

        userCreationTimeout.current = setTimeout(() => {
          setUsers(updatedUsers)
          setBtnLoading(false)
          setOpen(false)
          handleAlertOpening(true)
        }, 2000)
      }
    })
      .catch(err => {
        setBtnLoading(false)
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
              required
              margin="dense"
              id="firstName"
              label={t('FirstNameInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="lastName"
              required
              margin="dense"
              id="lastName"
              label={t('LastNameInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="birthDate"
              required
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
              required
              margin="dense"
              id="mail"
              label={t('EmailInputLabel')}
              onChange={handleChange}
              type="email"
              fullWidth
            />
            <TextField
              name="phoneNumber"
              required
              margin="dense"
              id="phoneNumber"
              label={`${t('PhoneNumberInputLabel')} (fax)`}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="smartphoneNumber"
              required
              margin="dense"
              id="smartphoneNumber"
              label={`${t('PhoneNumberInputLabel')} (smartphone)`}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="street"
              required
              margin="dense"
              id="street"
              label={t('StreetInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="postCode"
              required
              margin="dense"
              id="pwd"
              label="Post code"
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="city"
              required
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
              <Button disabled={Object.values(fields).filter((el, i) => i !== 9).every(el => el === '')} type="submit" color="secondary" variant="contained">
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