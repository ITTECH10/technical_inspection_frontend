import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { useData } from './../../contexts/DataContext'
import FloatingButton from './FloatingButton';
import AddIcon from '@material-ui/icons/Add';
import { generateId } from './../../utils/helpers'
import { withNamespaces } from 'react-i18next';
import { genders } from './../../utils/helpers'

const generatedPassword = generateId()

function NewCustomer({ t }) {
  const { users, setUsers, setGeneralAlertOptions } = useData()
  const [open, setOpen] = React.useState(false);
  const [btnLoading, setBtnLoading] = useState(false)
  const [fields, setFields] = useState({
    firstName: undefined,
    lastName: undefined,
    gender: genders[0].text,
    email: undefined,
    phoneNumber: undefined,
    smartphoneNumber: undefined,
    street: undefined,
    postCode: undefined,
    city: undefined,
    password: generatedPassword,
    confirmPassword: undefined,
    customerType: 'firmenkunde',
    companyName: undefined,
    customerPartner: undefined,
    customerPartnerEmail: undefined,
    loginCredentialsRecipient: 'kunde'
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

    const data = {
      ...fields,
      confirmPassword: fields.password,
      companyName: fields.customerType === 'firmenkunde' ? fields.companyName : undefined,
      customerPartner: fields.customerType === 'firmenkunde' ? fields.customerPartner : undefined,
      customerPartnerEmail: fields.customerType === 'firmenkunde' ? fields.customerPartnerEmail : undefined,
    }

    axios.post('/users/signup', data).then(res => {
      if (res.status === 201) {
        const updatedUsers = [...users, { ...res.data.newUser }]

        setUsers(updatedUsers)
        setBtnLoading(false)
        setOpen(false)
        setGeneralAlertOptions({
          open: true,
          message: t('AlertGeneralSuccessful'),
          severity: 'success',
          hideAfter: 5000
        })
      }
    })
      .catch(err => {
        setBtnLoading(false)
        // setOpen(false)
        setGeneralAlertOptions({
          open: true,
          message: err.response ? err.response.data.message : 'Server-Fehler......',
          severity: 'error',
          hideAfter: 10000
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('NewCustomerFormTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('NewCustomerFormHint')}
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <FormControl component="fieldset" style={{ display: 'block', marginTop: '20px', marginBottom: '20px' }}>
              <FormLabel component="legend">An wen geht die Registrierungs-E-Mail?</FormLabel>
              <RadioGroup row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                  value="kunde"
                  control={
                    <Radio
                      name="loginCredentialsRecipient"
                      color="secondary"
                      checked={fields.loginCredentialsRecipient === 'kunde'}
                      onChange={handleChange}
                    />}
                  label="Kunde"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="admin"
                  control={
                    <Radio
                      name="loginCredentialsRecipient"
                      color="secondary"
                      checked={fields.loginCredentialsRecipient === 'admin'}
                      onChange={handleChange}
                    />}
                  label="Administrator"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
            
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
                name="customerPartner"
                margin="dense"
                id="customerPartner"
                label={t('ContactPartner')}
                onChange={handleChange}
                type="text"
                fullWidth
              />}
            {fields.customerType === 'firmenkunde' &&
              <TextField
                name="customerPartnerEmail"
                required
                margin="dense"
                id="customerPartnerEmail"
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
              margin="dense"
              id="phoneNumber"
              label={`${t('PhoneNumberInputLabel')}`}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="smartphoneNumber"
              margin="dense"
              id="smartphoneNumber"
              label={`${t('SmartphoneLabel')}`}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="street"
              margin="dense"
              id="street"
              label={t('StreetInputLabel')}
              onChange={handleChange}
              type="text"
              fullWidth
            />
            <TextField
              name="postCode"
              margin="dense"
              id="pwd"
              label={t("PostNumberInputLabel")}
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="city"
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
