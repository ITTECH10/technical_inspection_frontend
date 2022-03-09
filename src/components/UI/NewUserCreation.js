import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'; import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { useData } from './../../contexts/DataContext'
import FloatingButton from './FloatingButton';
import { makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { generateId } from './../../utils/helpers'
import { withNamespaces } from 'react-i18next';
import { genders } from './../../utils/helpers'
import NumberFormat from 'react-number-format'

const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(1),
    width: '100%'
  },
}))

const generatedPassword = generateId()

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
    gender: '',
    email: '',
    phoneNumber: '',
    smartphoneNumber: '',
    street: '',
    postCode: '',
    city: '',
    birthDate: '',
    password: generatedPassword,
    confirmPassword: '',
    customerType: 'firmenkunde',
    companyName: '',
    customerPartner: '',
    customerPartnerEmail: ''
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
            <FormControl component="fieldset">
              <FormLabel component="legend">{t('CustomerType')}</FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                  value="firmenkunde"
                  control={
                    <Radio
                      name="customerType"
                      color="secondary"
                      checked={fields.customerType === 'firmenkunde'}
                      onChange={handleChange}
                    />}
                  label={t('CoorporateClient')}
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="privat"
                  control={
                    <Radio
                      name="customerType"
                      color="secondary"
                      checked={fields.customerType === 'privat'}
                      onChange={handleChange}
                    />}
                  label={t('NonCoorporateClient')}
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
            {fields.customerType === 'firmenkunde' &&
              <TextField
                autoFocus
                name="companyName"
                margin="dense"
                id="companyName"
                label={t('companynameLabel')}
                onChange={handleChange}
                type="text"
                fullWidth
              />}
            {fields.customerType === 'firmenkunde' &&
              <TextField
                autoFocus
                name="corespondencePartner"
                required
                margin="dense"
                id="corespondencePartner"
                label={t('ContactPartner')}
                onChange={handleChange}
                type="text"
                fullWidth
              />}
            {fields.customerType === 'firmenkunde' &&
              <TextField
                name="corespondencePartnerEmail"
                required
                margin="dense"
                id="corespondencePartnerEmail"
                label={t('ContactPartnerEmail')}
                onChange={handleChange}
                type="email"
                fullWidth
              />}
            <TextField
              autoFocus={fields.customerType === 'privat'}
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
              name="gender"
              id="standard-select-gender"
              select
              value={fields.gender}
              label={t('GenderNewUser')}
              onChange={handleChange}
              fullWidth
              required
              style={{ margin: "8px 0" }}
              SelectProps={{
                native: true,
              }}
            >
              {genders.map((option, idx) => (
                <option key={option.id} value={option.text}>
                  {t(option.translationKey)}
                </option>
              ))}
            </TextField>
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
            {<TextField
              name="phoneNumber"
              required
              margin="dense"
              id="phoneNumber"
              label={`${t('PhoneNumberInputLabel')}`}
              onChange={handleChange}
              type="text"
              fullWidth
            />}
            {/*<NumberFormat*/}
            {/*  name="phoneNumber"*/}
            {/*  onChange={handleChange}*/}
            {/*  format="+49 (###) ######"*/}
            {/*  mask="_"*/}
            {/*  allowEmptyFormatting*/}
            {/*  customInput={TextField}*/}
            {/*  fullWidth*/}
            {/*  label={`${t('PhoneNumberInputLabel')}`}*/}
            {/*  required*/}
            {/*  style={{ marginTop: 16 }}*/}
            {/*/>*/}
            <TextField
              name="smartphoneNumber"
              required
              margin="dense"
              id="smartphoneNumber"
              label={`${t('SmartphoneLabel')}`}
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
              label={t("PostNumberInputLabel")}
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="city"
              required
              margin="dense"
              id="confirm-pwd"
              label={t('CityInputLabel')}
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary" variant="contained">
                {t('CancelButton')}
              </Button>
              <Button type="submit" color="secondary" variant="contained">
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