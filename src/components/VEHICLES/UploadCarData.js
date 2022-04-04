import React, { useState } from 'react'
import { DatePicker } from "@material-ui/pickers";

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
        varantyExpiresAt: null,
        lastUUV: null,
        nextUUV: null,
        firstVehicleRegistration: null,
        firstVehicleRegistrationOnOwner: null,
        kilometersDriven: '',
        lastTechnicalInspection: null,
        registrationNumber: '',
        nextTechnicalInspection: null,
        TUV: null,
        AU: null,
        yearlyTax: ''
    })

    const formData = new FormData()

    if (user.role === 'admin') {
        formData.append('chassisNumber', fields.chassisNumber)
        fields.HSN !== '' && formData.append('HSN', fields.HSN)
        fields.TSN !== '' && formData.append('TSN', fields.TSN)
        fields.varantyExpiresAt !== null && formData.append('varantyExpiresAt', fields.varantyExpiresAt)
        fields.lastUUV !== null && formData.append('lastUUV', fields.lastUUV)
        fields.nextUUV !== null && formData.append('nextUUV', fields.nextUUV)
        fields.firstVehicleRegistration !== null && formData.append('firstVehicleRegistration', fields.firstVehicleRegistration)
        fields.firstVehicleRegistrationOnOwner !== null && formData.append('firstVehicleRegistrationOnOwner', fields.firstVehicleRegistrationOnOwner)
        fields.lastTechnicalInspection !== null && formData.append('lastTechnicalInspection', fields.lastTechnicalInspection)
        fields.nextTechnicalInspection !== null && formData.append('nextTechnicalInspection', fields.nextTechnicalInspection)
        fields.AU !== null && formData.append('AU', fields.AU)
        fields.TUV !== null && formData.append('TUV', fields.TUV)
        fields.yearlyTax !== '' && formData.append('yearlyTax', fields.yearlyTax)
    }

    formData.append('photo', fields.photo)
    formData.append('driver', fields.driver)
    formData.append('category', 'fa')
    formData.append('mark', fields.mark)
    formData.append('model', fields.model)
    formData.append('registrationNumber', fields.registrationNumber)
    formData.append('kilometersDriven', fields.kilometersDriven)

    const handleSubmit = (e) => {
        e.preventDefault()
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
                                <DatePicker
                                    name="varantyExpiresAt"
                                    id="varantyExpiresAt"
                                    autoOk
                                    format="dd/MM/yyyy"
                                    label="Garantie Ablaufdatum"
                                    placeholder='tt/mm/jjjj'
                                    onChange={(e) => setFields({ ...fields, varantyExpiresAt: e })}
                                    className={classes.textField}
                                    value={fields.varantyExpiresAt !== '' && fields.varantyExpiresAt}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                {selectedUser.customerType === 'firmenkunde' &&
                                    <DatePicker
                                        name="lastUUV"
                                        id="lastUUV"
                                        autoOk
                                        format="dd/MM/yyyy"
                                        placeholder='tt/mm/jjjj'
                                        label={t('LastUUVInputLabel')}
                                        onChange={(e) => setFields({ ...fields, lastUUV: e })}
                                        className={classes.textField}
                                        value={fields.lastUUV !== '' && fields.lastUUV}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />}
                                {selectedUser.customerType === 'firmenkunde' &&
                                    <DatePicker
                                        name="nextUUV"
                                        id="nextUUV"
                                        autoOk
                                        format="dd/MM/yyyy"
                                        placeholder='tt/mm/jjjj'
                                        label={t('NextUUVInputLabel')}
                                        onChange={(e) => setFields({ ...fields, nextUUV: e })}
                                        className={classes.textField}
                                        value={fields.nextUUV !== '' && fields.nextUUV}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />}
                                <DatePicker
                                    name="firstVehicleRegistration"
                                    id="firstVehicleRegistration"
                                    autoOk
                                    format="dd/MM/yyyy"
                                    placeholder='tt/mm/jjjj'
                                    label={t('FVRInputLabel')}
                                    onChange={(e) => setFields({ ...fields, firstVehicleRegistration: e })}
                                    className={classes.textField}
                                    value={fields.firstVehicleRegistration !== '' && fields.firstVehicleRegistration}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <DatePicker
                                    name="firstVehicleRegistrationOnOwner"
                                    id="firstVehicleRegistrationOnOwner"
                                    autoOk
                                    format="dd/MM/yyyy"
                                    label={t('FVROOInputLabel')}
                                    onChange={(e) => setFields({ ...fields, firstVehicleRegistrationOnOwner: e })}
                                    className={classes.textField}
                                    value={fields.firstVehicleRegistrationOnOwner !== '' && fields.firstVehicleRegistrationOnOwner}
                                    placeholder="tt/mm/jjjj"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <DatePicker
                                    name="lastTechnicalInspection"
                                    id="lastTechnicalInspection"
                                    autoOk
                                    format="dd/MM/yyyy"
                                    label={t('LTIInputLabel')}
                                    placeholder='tt/mm/jjjj'
                                    onChange={(e) => setFields({ ...fields, lastTechnicalInspection: e })}
                                    className={classes.textField}
                                    value={fields.lastTechnicalInspection !== '' && fields.lastTechnicalInspection}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <DatePicker
                                    name="nextTechnicalInspection"
                                    id="nextTechnicalInspection"
                                    autoOk
                                    format="dd/MM/yyyy"
                                    label={t('NTIInputLabel')}
                                    placeholder='tt/mm/jjjj'
                                    onChange={(e) => setFields({ ...fields, nextTechnicalInspection: e })}
                                    className={classes.textField}
                                    value={fields.nextTechnicalInspection !== '' && fields.nextTechnicalInspection}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <DatePicker
                                    name="TUV"
                                    id="TUV"
                                    autoOk
                                    format="dd/MM/yyyy"
                                    placeholder='tt/mm/jjjj'
                                    label={t('TUVInputLabel')}
                                    onChange={(e) => setFields({ ...fields, TUV: e })}
                                    className={classes.textField}
                                    value={fields.TUV !== '' && fields.TUV}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <DatePicker
                                    name="AU"
                                    id="AU"
                                    autoOk
                                    format="dd/MM/yyyy"
                                    placeholder='tt/mm/jjjj'
                                    label={t('AUInputLabel')}
                                    onChange={(e) => setFields({ ...fields, AU: e })}
                                    className={classes.textField}
                                    value={fields.AU !== '' && fields.AU}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="yearlyTax"
                                    margin="dense"
                                    id="yearlyTax"
                                    label={t('YearlyTaxInputLabel')}
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
                            </form> :
                            <form onSubmit={handleSubmit} encType="multipart/form-data">
                                <input name="photo" onChange={handleImageChange} id="photo" type="file" hidden />
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
