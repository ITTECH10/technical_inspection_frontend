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

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    width: '100%'
  },
}))

export default function Signup({ handleAlertOpening }) {
  const [open, setOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  // const history = useHistory()
  const classes = useStyles()

  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDate: '',
    password: generateId(),
    confirmPassword: ''
  })

  const errObj = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    birthDate: '',
    password: '',
    confirmPassword: ''
  }
  const [errors, setErrors] = useState(errObj)

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
      // console.log(res.data)
      if (res.status === 201) {
        // setAuthorizationHeader(res.data.token)
        // setAuthenticated(true)
        const updatedUsers = [...users, { ...res.data.newUser }]

        setTimeout(() => {
          setUsers(updatedUsers)
          setBtnLoading(false)
          setOpen(false)
          handleAlertOpening(true)
        }, 2000)
        //fix loader later
      }
    })
      .catch(err => {
        setBtnLoading(false)
        setErrors(err.response.data.error.errors)
        console.log(err.response)
      })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setErrors(errObj)
    }, 200)
  };

  return (
    <div>
      <FloatingButton onHandleClick={handleClickOpen}>
        <AddIcon />
      </FloatingButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create a new customer, simply fill the fields below.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              autoFocus
              name="firstName"
              error={errors.firstName && errors.firstName.message}
              helperText={errors.firstName && errors.firstName.message}
              margin="dense"
              id="firstName"
              label="First name"
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="lastName"
              error={errors.lastName && errors.lastName.message}
              helperText={errors.lastName && errors.lastName.message}
              margin="dense"
              id="lastName"
              label="Last name"
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="birthDate"
              error={errors.birthDate && errors.birthDate.message}
              helperText={errors.birthDate && errors.birthDate.message}
              id="birthDate"
              label="Birth Date"
              onChange={handleChange}
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              name="email"
              error={errors.email && errors.email.message}
              helperText={errors.email && errors.email.message}
              margin="dense"
              id="mail"
              label="Email Address"
              onChange={handleChange}
              type="email"
              fullWidth
            />
            <TextField
              name="phoneNumber"
              error={errors.phoneNumber && errors.phoneNumber.message}
              helperText={errors.phoneNumber && errors.phoneNumber.message}
              margin="dense"
              id="phoneNumber"
              label="Phone number"
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="address"
              error={errors.address && errors.address.message}
              helperText={errors.address && errors.address.message}
              margin="dense"
              id="address"
              label="Address"
              onChange={handleChange}
              type="text"
              fullWidth
            />
            {/* <TextField
              name="password"
              error={errors.password && errors.password.message}
              helperText={errors.password && errors.password.message}
              margin="dense"
              id="pwd"
              label="Password"
              type="password"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="confirmPassword"
              error={errors.confirmPassword && errors.confirmPassword.message}
              helperText={errors.confirmPassword && errors.confirmPassword.message}
              margin="dense"
              id="confirm-pwd"
              label="Confirm Password"
              type="password"
              onChange={handleChange}
              fullWidth
            /> */}
            <DialogActions>
              <Button onClick={handleClose} color="secondary" variant="contained">
                Cancel
              </Button>
              <Button type="submit" color="primary" variant="contained">
                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Submit'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
