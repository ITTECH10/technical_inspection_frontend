import React, { useState } from 'react'
import FloatingButton from '../UI/FloatingButton'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { makeStyles } from '@material-ui/core/styles'
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    CircularProgress,
    Box,
    FormControlLabel,
    Switch,
    Collapse,
    FormGroup,
    FormLabel
} from '@material-ui/core';
import Alerts from './../UI/Alerts'
import axios from 'axios'
import { useData } from '../../contexts/DataContext';
import { withNamespaces } from 'react-i18next';
import dummyRegistrationImage from './../../assets/images/Fahrzeugschein_big.jpg'

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%'
    },
}));

const UploadCarData = ({ t }) => {
    const [open, setOpen] = useState(false)
    const [showDummyVehicleRegistration, setShowDummyVehicleRegistration] = React.useState(false);
    const [adacChecked, setAdacChecked] = useState(false)
    const [protectionLetterChecked, setProtectionLetterChecked] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const { selectedUser, myVehicles, setMyVehicles, setCustomersVehicles, customersVehicles, user, setVehicles, vehicles, setGeneralAlertOptions } = useData()
    const classes = useStyles()
    let userId

    if (user.role === 'user') {
        userId = user._id
    }

    if (selectedUser._id) {
        userId = selectedUser._id
    }

    const [fields, setFields] = useState({
        photo: '',
        driver: '',
        chassisNumber: '',
        mark: '',
        model: '',
        HSN: '',
        TSN: '',
        varantyExpiresAt: '',
        lastUUV: '',
        nextUUV: '',
        firstVehicleRegistration: '',
        firstVehicleRegistrationOnOwner: '',
        kilometersDriven: '',
        lastTechnicalInspection: '',
        registrationNumber: '',
        nextTechnicalInspection: '',
        TUV: '',
        AU: '',
        monthlyInsurancePayment: '',
        allowedYearlyKilometers: '',
        yearlyTax: '',
        membershipNumber: ''
    })

    console.log(fields.varantyExpiresAt)

    const formData = new FormData()

    if (user.role === 'admin') {
        formData.append('chassisNumber', fields.chassisNumber)
        fields.HSN !== '' && formData.append('HSN', fields.HSN)
        fields.TSN !== '' && formData.append('TSN', fields.TSN)
        fields.varantyExpiresAt !== '' && formData.append('varantyExpiresAt', fields.varantyExpiresAt)
        fields.lastUUV !== '' && formData.append('lastUUV', fields.lastUUV)
        fields.nextUUV !== '' && formData.append('nextUUV', fields.nextUUV)
        formData.append('firstVehicleRegistration', fields.firstVehicleRegistration)
        formData.append('firstVehicleRegistrationOnOwner', fields.firstVehicleRegistrationOnOwner)
        fields.lastTechnicalInspection !== '' && formData.append('lastTechnicalInspection', fields.lastTechnicalInspection)
        formData.append('nextTechnicalInspection', fields.nextTechnicalInspection)
        formData.append('AU', fields.AU)
        formData.append('TUV', fields.TUV)
        fields.monthlyInsurancePayment !== '' && formData.append('monthlyInsurancePayment', fields.monthlyInsurancePayment)
        fields.allowedYearlyKilometers !== '' && formData.append('allowedYearlyKilometers', fields.allowedYearlyKilometers)
        fields.yearlyTax !== '' && formData.append('yearlyTax', fields.yearlyTax)
        formData.append('protectionLetter', protectionLetterChecked)
        formData.append('ADAC', adacChecked)
        adacChecked && protectionLetterChecked && fields.membershipNumber !== '' && formData.append('membershipNumber', fields.membershipNumber)
    }

    formData.append('photo', fields.photo)
    formData.append('driver', fields.driver)
    formData.append('category', 'fa')
    formData.append('mark', fields.mark)
    formData.append('model', fields.model)
    formData.append('registrationNumber', fields.registrationNumber)
    formData.append('kilometersDriven', fields.kilometersDriven)

    const handleProtectionLetterSwitchOn = () => {
        if (protectionLetterChecked) {
            setAdacChecked(false)
        }
        setProtectionLetterChecked(prevState => !prevState)
    }

    const resetSwitchStates = () => {
        setProtectionLetterChecked(false)
        setAdacChecked(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (!Object.values(fields).slice(1, 16).every(el => el !== '')) return

        setBtnLoading(true)

        axios({
            method: "post",
            url: `/cars/${userId}`,
            // url: `/cars/610a98be4c36692a9890751d`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            // console.log(res.data)
            if (res.status === 201) {
                // DO LATER
                const updatedVehicles = [...vehicles, { ...res.data.newVehicle }]
                const updatedCustomerVehicles = [...customersVehicles, { ...res.data.newVehicle }]
                const updatedMyVehicles = [...myVehicles, { ...res.data.newVehicle }]

                setFields({
                    ...fields,
                    photo: ''
                })
                setVehicles(updatedVehicles)
                setCustomersVehicles(updatedCustomerVehicles)
                setMyVehicles(updatedMyVehicles)
                setAlertOpen(true)
                setBtnLoading(false)
                setOpen(false)
            }
        })
            .catch(err => {
                // console.log(err.response)
                // setOpen(false)
                setBtnLoading(false)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 10000
                })
            })
    }

    const handleImageClick = () => {
        const file = document.getElementById('photo')
        file.click()
    }

    const handleImageChange = (e) => {
        const photo = e.target.files[0]
        setFields({
            ...fields,
            photo
        })
    }

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetSwitchStates()
    };

    const handleShowDummyVehicleRegistration = () => {
        setShowDummyVehicleRegistration((prev) => (!prev))
    }

    const dummyVehicleRegistration = (
        <Box
            component="img"
            sx={{
                width: '100%',
            }}
            src={dummyRegistrationImage}
        />
    );

    return (
        userId ?
            <div>
                <FloatingButton onHandleClick={handleClickOpen}>
                    <DriveEtaIcon />
                </FloatingButton>
                <Alerts message={t('AlertGeneralSuccessful')} open={alertOpen} handleOpening={setAlertOpen} />
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">{t('NewVehicleFormTitle')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {t('NewVehicleFormHint')}
                        </DialogContentText>
                        {user.role === 'admin' ?
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input name="photo" onChange={handleImageChange} id="photo" type="file" hidden />
                                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Button variant="contained" color="primary" size="small" onClick={handleImageClick} >{t('AddPhotoButton')}</Button>
                                </Box>
                                <Box sx={{ marginTop: 10 }}>
                                    <FormControlLabel
                                        control={<Switch checked={showDummyVehicleRegistration} onChange={handleShowDummyVehicleRegistration} />}
                                        label={t("FahrzeugscheinErklaerungsLink")}
                                    />
                                    <Box>
                                        <div>
                                            <Collapse in={showDummyVehicleRegistration}>{dummyVehicleRegistration}</Collapse>
                                        </div>
                                    </Box>
                                </Box>
                                <TextField
                                    name="chassisNumber"
                                    autoFocus
                                    margin="dense"
                                    id="mark"
                                    label={t('ChassisNumber')}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="mark"
                                    margin="dense"
                                    id="mark"
                                    label={t('MarkInputLabel')}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="model"
                                    margin="dense"
                                    id="model"
                                    label={t('ModelInputLabel')}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="driver"
                                    margin="dense"
                                    id="vehicleDriver"
                                    label="Fahrer"
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="HSN"
                                    margin="dense"
                                    id="HSN"
                                    label={t('HSNInputLabel')}
                                    onChange={handleChange}
                                    fullWidth
                                    error={fields.HSN.length > 4 ? 'Die HSN darf nicht länger als 4 Zeichen sein...' : null}
                                    helperText={fields.HSN.length > 4 ? 'Die HSN darf nicht länger als 4 Zeichen sein...' : null}
                                />
                                <TextField
                                    name="TSN"
                                    margin="dense"
                                    id="TSN"
                                    label={t('TSNInputLabel')}
                                    onChange={handleChange}
                                    fullWidth
                                    error={fields.TSN.length > 3 ? 'Die TSN darf nicht länger als 3 Zeichen sein...' : null}
                                    helperText={fields.TSN.length > 3 ? 'Die TSN darf nicht länger als 3 Zeichen sein...' : null}
                                />
                                <TextField
                                    name="registrationNumber"
                                    margin="dense"
                                    id="registrationNumber"
                                    label={t('RegistrationNumberInputLabel')}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="kilometersDriven"
                                    margin="dense"
                                    id="kilometersDriven"
                                    label={t('KilometersDrivenInputLabel')}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="varantyExpiresAt"
                                    id="varantyExpiresAt"
                                    label="Garantie Ablaufdatum"
                                    onChange={handleChange}
                                    type="date"
                                    className={classes.textField}
                                    value={fields.varantyExpiresAt ? fields.varantyExpiresAt : new Date().toISOString().split('T')[0]}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {selectedUser.customerType === 'firmenkunde' &&
                                    <TextField
                                        name="lastUUV"
                                        id="lastUUV"
                                        label={t('LastUUVInputLabel')}
                                        onChange={handleChange}
                                        type="date"
                                        value={fields.lastUUV ? fields.lastUUV : new Date().toISOString().split('T')[0]}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />}
                                {selectedUser.customerType === 'firmenkunde' &&
                                    <TextField
                                        name="nextUUV"
                                        id="nextUUV"
                                        label={t('NextUUVInputLabel')}
                                        onChange={handleChange}
                                        type="date"
                                        value={fields.nextUUV ? fields.nextUUV : new Date().toISOString().split('T')[0]}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />}
                                <TextField
                                    name="firstVehicleRegistration"
                                    id="firstVehicleRegistration"
                                    label={t('FVRInputLabel')}
                                    onChange={handleChange}
                                    required
                                    type="date"
                                    value={fields.firstVehicleRegistration ? fields.firstVehicleRegistration : new Date().toISOString().split('T')[0]}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="firstVehicleRegistrationOnOwner"
                                    id="firstVehicleRegistrationOnOwner"
                                    label={t('FVROOInputLabel')}
                                    onChange={handleChange}
                                    required
                                    type="date"
                                    value={fields.firstVehicleRegistrationOnOwner ? fields.firstVehicleRegistrationOnOwner : new Date().toISOString().split('T')[0]}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="lastTechnicalInspection"
                                    id="lastTechnicalInspection"
                                    label={t('LTIInputLabel')}
                                    onChange={handleChange}
                                    type="date"
                                    value={fields.lastTechnicalInspection ? fields.lastTechnicalInspection : new Date().toISOString().split('T')[0]}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="nextTechnicalInspection"
                                    id="nextTechnicalInspection"
                                    label={t('NTIInputLabel')}
                                    onChange={handleChange}
                                    required
                                    type="date"
                                    value={fields.nextTechnicalInspection ? fields.nextTechnicalInspection : new Date().toISOString().split('T')[0]}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="TUV"
                                    id="TUV"
                                    label={t('TUVInputLabel')}
                                    onChange={handleChange}
                                    required
                                    type="date"
                                    value={fields.TUV ? fields.TUV : new Date().toISOString().split('T')[0]}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="AU"
                                    id="AU"
                                    label={t('AUInputLabel')}
                                    onChange={handleChange}
                                    required
                                    type="date"
                                    value={fields.AU ? fields.AU : new Date().toISOString().split('T')[0]}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="monthlyInsurancePayment"
                                    margin="dense"
                                    id="monthlyInsurancePayment"
                                    label={t('MonthlyInsurancePaymentInputLabel')}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="allowedYearlyKilometers"
                                    margin="dense"
                                    id="allowedYearlyKilometers"
                                    label={t('AllowedYearlyKilometersInputLabel')}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="yearlyTax"
                                    margin="dense"
                                    id="yearlyTax"
                                    label={t('YearlyTaxInputLabel')}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <Box style={{ marginTop: 10 }}>
                                    <FormLabel component="legend">Schutzbrief/ADAC</FormLabel>
                                    <FormGroup style={{ flexDirection: 'row' }}>
                                        <FormControlLabel
                                            control={<Switch checked={protectionLetterChecked} />}
                                            onChange={handleProtectionLetterSwitchOn}
                                            label="Schutzbrief"
                                        />
                                        <FormControlLabel
                                            disabled={!protectionLetterChecked}
                                            control={<Switch checked={adacChecked} />}
                                            onChange={() => setAdacChecked(prevState => !prevState)}
                                            label="ADAC"
                                        />
                                    </FormGroup>
                                </Box>
                                {protectionLetterChecked && adacChecked &&
                                    <TextField
                                        autoFocus
                                        name="membershipNumber"
                                        margin="dense"
                                        id="membershipNumber"
                                        label="Mitgliedsnummer"
                                        onChange={handleChange}
                                        type="text"
                                        fullWidth
                                    />}
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" variant="contained">
                                        {t('CancelButton')}
                                    </Button>
                                    <Button type="submit" color="secondary" variant="contained">
                                        {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                                    </Button>
                                </DialogActions>
                            </form> :
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input name="photo" onChange={handleImageChange} id="photo" type="file" hidden />
                                <Box sx={{ marginTop: 10 }}>
                                    <FormControlLabel
                                        control={<Switch checked={showDummyVehicleRegistration} onChange={handleShowDummyVehicleRegistration} />}
                                        label={t("FahrzeugscheinErklaerungsLink")}
                                    />
                                    <Box>
                                        <div>
                                            <Collapse in={showDummyVehicleRegistration}>{dummyVehicleRegistration}</Collapse>
                                        </div>
                                    </Box>
                                </Box>
                                <Button variant="contained" color="primary" size="small" onClick={handleImageClick} >Fahrzeugschein hinzufügen - Pflichtfeld</Button>
                                <TextField
                                    name="mark"
                                    autoFocus
                                    margin="dense"
                                    id="mark"
                                    label={t('MarkInputLabel')}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="model"
                                    margin="dense"
                                    id="model"
                                    label={t('ModelInputLabel')}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="driver"
                                    margin="dense"
                                    id="vehicleDriver"
                                    label="Fahrer"
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    name="registrationNumber"
                                    margin="dense"
                                    id="registrationNumber"
                                    label={t('RegistrationNumberInputLabel')}
                                    onChange={handleChange}
                                    required
                                    fullWidth
                                />
                                <TextField
                                    name="kilometersDriven"
                                    margin="dense"
                                    id="kilometersDriven"
                                    label={t('KilometersDrivenInputLabel')}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary" variant="contained">
                                        {t('CancelButton')}
                                    </Button>
                                    <Button disabled={fields.photo === '' && user.role === 'user'} type="submit" color="secondary" variant="contained">
                                        {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                                    </Button>
                                </DialogActions>
                            </form>
                        }
                    </DialogContent>
                </Dialog>
            </div > : null
    )
}

export default withNamespaces()(UploadCarData)
