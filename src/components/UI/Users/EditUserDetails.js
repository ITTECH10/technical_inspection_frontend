import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress'
import axios from 'axios'
import { useData } from './../../../contexts/DataContext'
import Alerts from '../Alerts';
import { makeStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import { genders } from './../../../utils/helpers'

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1),
        width: '100%'
    },
    btnRoot: {
        fontSize: 9,
        [theme.breakpoints.up('sm')]: {
            fontSize: '0.8125rem',
        }
    }
}))

function EditUserDetails({ userId, t }) {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const { setSelectedUser, setUser, user, selectedUser, setGeneralAlertOptions } = useData()
    const classes = useStyles()

    if (user.role === 'user') {
        userId = user._id
    }

    const [fields, setFields] = useState({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        gender: selectedUser.gender,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        smartphoneNumber: selectedUser.smartphoneNumber,
        street: selectedUser.street,
        postCode: selectedUser.postCode,
        city: selectedUser.city,
        birthDate: selectedUser.birthDate,
        customerType: selectedUser.customerType,
        corespondencePartner: selectedUser.corespondencePartner,
        corespondencePartnerEmail: selectedUser.corespondencePartnerEmail
    })

    React.useEffect(() => {
        setFields({
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            gender: selectedUser.gender,
            email: selectedUser.email,
            phoneNumber: selectedUser.phoneNumber,
            smartphoneNumber: selectedUser.smartphoneNumber,
            street: selectedUser.street,
            postCode: selectedUser.postCode,
            city: selectedUser.city,
            birthDate: selectedUser.birthDate,
            customerType: selectedUser.customerType,
            corespondencePartner: selectedUser.corespondencePartner,
            corespondencePartnerEmail: selectedUser.corespondencePartnerEmail,
        })
    }, [selectedUser, open])

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return
        setBtnLoading(true)

        const data = { ...fields }
        axios.patch(`/users/${userId}`, data).then(res => {
            if (res.status === 202) {
                if (user.role === 'user') {
                    setUser(res.data.user)
                }

                if (user.role === 'admin') {
                    setSelectedUser(res.data.user)
                }

                setTimeout(() => {
                    setAlertOpen(true)
                    setBtnLoading(false)
                    setOpen(false)
                }, 2000)
            }
        })
            .catch(err => {
                setBtnLoading(false)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 5000
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
        <div style={{ marginRight: 10 }}>
            <Tooltip title={t('EditCustomersButton')}>
                <IconButton className={classes.btnRoot} size="small" color="secondary" variant="contained" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Alerts message={t('AlertGeneralUpdated')} open={alertOpen} handleOpening={setAlertOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('EditCustomerFormTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('EditCustomerFormHint')}
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
                                name="corespondencePartner"
                                margin="dense"
                                value={fields.corespondencePartner}
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
                                value={fields.corespondencePartnerEmail}
                                id="corespondencePartnerEmail"
                                label={t('ContactPartnerEmail')}
                                onChange={handleChange}
                                type="email"
                                fullWidth
                            />}
                        <TextField
                            name="firstName"
                            autoFocus
                            margin="dense"
                            value={fields.firstName}
                            id="first-name"
                            label={t('FirstNameInputLabel')}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="lastName"
                            margin="dense"
                            value={fields.lastName}
                            id="last-name"
                            label={t('LastNameInputLabel')}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="gender"
                            id="standard-select-gender-edit"
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
                            name="email"
                            margin="dense"
                            value={fields.email}
                            id="mail"
                            label={t('EmailInputLabel')}
                            type="email"
                            onChange={handleChange}
                            disabled={user.role === 'user'}
                            fullWidth
                        />
                        <TextField
                            name="phoneNumber"
                            margin="dense"
                            value={fields.phoneNumber}
                            id="phone-number"
                            label={t('PhoneNumberInputLabel')}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="smartphoneNumber"
                            margin="dense"
                            value={fields.smartphoneNumber}
                            id="smartphoneNumber-number"
                            label={`${t('SmartphoneLabel')}`}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="street"
                            margin="dense"
                            value={fields.street}
                            id="street-edit"
                            label={t('StreetInputLabel')}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="postCode"
                            margin="dense"
                            value={fields.postCode}
                            id="postCode-edit"
                            label="Post code"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="city"
                            margin="dense"
                            value={fields.city}
                            id="city-edit"
                            label={t('CityInputLabel')}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="birthDate"
                            id="birthDate-edit"
                            label={t('BirthDateInputLabel')}
                            value={fields.birthDate ? new Date(fields.birthDate).toISOString().split('T')[0] : '1970/12/31'}
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
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

export default withNamespaces()(EditUserDetails)
