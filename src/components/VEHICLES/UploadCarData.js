import React, { useState } from 'react'
import FloatingButton from '../UI/FloatingButton'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import { makeStyles } from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress } from '@material-ui/core';
import Alerts from './../UI/Alerts'
import axios from 'axios'
import { useData } from '../../contexts/DataContext';
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%'
    },
}));

const UploadCarData = ({ t }) => {
    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const { selectedUser, myVehicles, setMyVehicles, setVehicles, vehicles } = useData()
    const classes = useStyles()

    const [fields, setFields] = useState({
        photo: '',
        mark: '',
        model: '',
        HSN: '',
        TSN: '',
        firstVehicleRegistration: '',
        firstVehicleRegistrationOnOwner: '',
        kilometersDriven: '',
        lastTechnicalInspection: '',
        registrationNumber: '',
        nextTechnicalInspection: '',
        TUV: '',
        AU: '',
        // insuranceHouse: '',
        monthlyInsurancePayment: '',
        allowedYearlyKilometers: '',
        // vehiclePaymentType: '',
        yearlyTax: ''
    })

    const formData = new FormData()

    formData.append('photo', fields.photo)
    formData.append('mark', fields.mark)
    formData.append('model', fields.model)
    formData.append('HSN', fields.HSN)
    formData.append('TSN', fields.TSN)
    formData.append('firstVehicleRegistration', fields.firstVehicleRegistration)
    formData.append('firstVehicleRegistrationOnOwner', fields.firstVehicleRegistrationOnOwner)
    formData.append('kilometersDriven', fields.kilometersDriven)
    formData.append('registrationNumber', fields.registrationNumber)
    formData.append('lastTechnicalInspection', fields.lastTechnicalInspection)
    formData.append('nextTechnicalInspection', fields.nextTechnicalInspection)
    formData.append('AU', fields.AU)
    formData.append('TUV', fields.TUV)
    formData.append('monthlyInsurancePayment', fields.monthlyInsurancePayment)
    formData.append('allowedYearlyKilometers', fields.allowedYearlyKilometers)
    formData.append('yearlyTax', fields.yearlyTax)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return

        setBtnLoading(true)

        axios({
            method: "post",
            url: `/cars/${selectedUser._id}`,
            // url: `/cars/610a98be4c36692a9890751d`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            console.log(res.data)
            if (res.status === 201) {
                // DO LATER
                const updatedVehicles = [...vehicles, { ...res.data.newVehicle }]
                const updatedCustomerVehicles = [...myVehicles, { ...res.data.newVehicle }]

                setTimeout(() => {
                    setVehicles(updatedVehicles)
                    setMyVehicles(updatedCustomerVehicles)
                    setAlertOpen(true)
                    setBtnLoading(false)
                    setOpen(false)
                }, 2000)
            }
        })
            .catch(err => {
                console.log(err.response)
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

    return (
        <div>
            <FloatingButton onHandleClick={handleClickOpen}>
                <DriveEtaIcon />
            </FloatingButton>
            <Alerts message="New vehicle added!" open={alertOpen} handleOpening={setAlertOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('NewVehicleFormTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('NewVehicleFormHint')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input name="photo" onChange={handleImageChange} id="photo" type="file" hidden />
                        <Button variant="contained" color="primary" size="small" onClick={handleImageClick} >{t('AddPhotoButton')}</Button>
                        <TextField
                            name="mark"
                            autoFocus
                            margin="dense"
                            id="mark"
                            label={t('MarkInputLabel')}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="model"
                            margin="dense"
                            id="model"
                            label={t('ModelInputLabel')}
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
                        />
                        <TextField
                            name="TSN"
                            margin="dense"
                            id="TSN"
                            label={t('TSNInputLabel')}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="registrationNumber"
                            margin="dense"
                            id="registrationNumber"
                            label={t('RegistrationNumberInputLabel')}
                            onChange={handleChange}
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
                            name="firstVehicleRegistration"
                            id="firstVehicleRegistration"
                            label={t('FVRInputLabel')}
                            onChange={handleChange}
                            type="date"
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
                            type="date"
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
                            type="date"
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
                            type="date"
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
                            type="date"
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
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary" variant="contained">
                                {t('CancelButton')}
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default withNamespaces()(UploadCarData)
