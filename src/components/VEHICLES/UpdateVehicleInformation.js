import React from 'react';
import { DatePicker } from "@material-ui/pickers";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withNamespaces } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../../contexts/DataContext';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: '100%'
    },
}));

function UpdateVehicleInformation({ t, setOnHandleUpdateOpen }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [btnLoading, setBtnLoading] = React.useState(false)
    const { vehicles, setVehicles, selectedCar, user, setSelectedCar, myVehicles, setMyVehicles, setGeneralAlertOptions } = useData()
    const [fields, setFields] = React.useState({
        chassisNumber: '',
        mark: '',
        model: '',
        driver: '',
        registrationNumber: '',
        HSN: '',
        TSN: '',
        varantyExpiresAt: '',
        lastUUV: '',
        nextUUV: '',
        firstVehicleRegistration: '',
        firstVehicleRegistrationOnOwner: '',
        lastTechnicalInspection: '',
        nextTechnicalInspection: '',
        TUV: '',
        AU: '',
        kilometersDriven: '',
        monthlyInsurancePayment: '',
        yearlyTax: ''
    })
    const history = useHistory()
    const carId = history.location.pathname.split('/')[2]

    React.useEffect(() => {
        setFields({
            chassisNumber: selectedCar.chassisNumber,
            mark: selectedCar.mark,
            model: selectedCar.model,
            driver: selectedCar.driver,
            varantyExpiresAt: selectedCar.varantyExpiresAt,
            registrationNumber: selectedCar.registrationNumber,
            HSN: selectedCar.HSN,
            TSN: selectedCar.TSN,
            lastUUV: selectedCar.lastUUV,
            nextUUV: selectedCar.nextUUV,
            firstVehicleRegistration: selectedCar.firstVehicleRegistration,
            firstVehicleRegistrationOnOwner: selectedCar.firstVehicleRegistrationOnOwner,
            kilometersDriven: selectedCar.kilometersDriven,
            lastTechnicalInspection: selectedCar.lastTechnicalInspection,
            nextTechnicalInspection: selectedCar.nextTechnicalInspection,
            TUV: selectedCar.TUV,
            AU: selectedCar.AU,
            monthlyInsurancePayment: selectedCar.monthlyInsurancePayment,
            yearlyTax: selectedCar.yearlyTax
        })
    }, [selectedCar, open])


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

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return

        setBtnLoading(true)

        const data = {
            ...fields
        }
        axios.put(`/cars/${carId}`, data).then(res => {
            if (res.status === 200) {
                let updatedVehicles

                if (user.role === 'admin') {
                    updatedVehicles = [...vehicles]
                }

                if (user.role === 'user') {
                    updatedVehicles = [...myVehicles]
                }

                const selectedCarIndex = updatedVehicles.findIndex(el => el._id === carId)
                const corespondingCar = updatedVehicles[selectedCarIndex]
                corespondingCar.nextTechnicalInspection = res.data.updatedVehicle.nextTechnicalInspection
                corespondingCar.technicalInspectionInNextTwoMonths = res.data.updatedVehicle.technicalInspectionInNextTwoMonths
                corespondingCar.TUV = res.data.updatedVehicle.TUV
                corespondingCar.AU = res.data.updatedVehicle.AU

                setOpen(false)
                setVehicles(updatedVehicles)
                setMyVehicles(updatedVehicles)
                setSelectedCar(res.data.updatedVehicle)
                setBtnLoading(false)
                handleClose()
                setOnHandleUpdateOpen(true)
            }
        })
            .catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 10000
                })
            })
    }

    return (
        <div style={{ marginRight: 10 }}>
            <Tooltip title="Fahrzeugdaten bearbeiten">
                <IconButton className={classes.btnRoot} size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('EditVehicleInformation')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('GeneralFormFullfilments')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="chassisNumber"
                            autoFocus
                            margin="dense"
                            id="update-vehicle-chassisNumber"
                            label={t('ChassisNumber')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.chassisNumber}
                        />
                        <TextField
                            name="mark"
                            margin="dense"
                            id="update-vehicle-mark"
                            label={t('MarkInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            required
                            value={fields.mark}
                        />
                        <TextField
                            name="model"
                            margin="dense"
                            id="update-vehicle-model"
                            label={t('ModelInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            required
                            value={fields.model}
                        />
                        <TextField
                            name="driver"
                            margin="dense"
                            id="update-vehicle-driver"
                            label="Fahrer"
                            onChange={handleChange}
                            fullWidth
                            value={fields.driver}
                        />
                        <TextField
                            name="HSN"
                            margin="dense"
                            id="update-vehicle-HSN"
                            label={t('HSNInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.HSN && fields.HSN}
                            error={fields.HSN && fields.HSN.length > 4 ? 'Die HSN darf nicht länger als 4 Zeichen sein...' : null}
                            helperText={fields.HSN && fields.HSN.length > 4 ? 'Die HSN darf nicht länger als 4 Zeichen sein...' : null}
                        />
                        <TextField
                            name="TSN"
                            margin="dense"
                            id="update-vehicle-TSN"
                            label={t('TSNInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.TSN && fields.TSN}
                            error={fields.TSN && fields.TSN.length > 3 ? 'Die TSN darf nicht länger als 3 Zeichen sein...' : null}
                            helperText={fields.TSN && fields.TSN.length > 3 ? 'Die TSN darf nicht länger als 3 Zeichen sein...' : null}
                        />
                        <TextField
                            name="registrationNumber"
                            margin="dense"
                            id="update-vehicle-registrationNumber"
                            label={t('RegistrationNumberInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            required
                            value={fields.registrationNumber}
                        />
                        <TextField
                            name="kilometersDriven"
                            margin="dense"
                            id="update-vehicle-kilometersDriven"
                            label={t('KilometersDrivenInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.kilometersDriven}
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
                            value={fields.varantyExpiresAt ? new Date(fields.varantyExpiresAt).toISOString().split('T')[0] : null}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <DatePicker
                            name="firstVehicleRegistration"
                            id="firstVehicleRegistration"
                            autoOk
                            format="dd/MM/yyyy"
                            label={t('FVRInputLabel')}
                            placeholder='tt/mm/jjjj'
                            onChange={(e) => setFields({ ...fields, firstVehicleRegistration: e })}
                            className={classes.textField}
                            value={fields.firstVehicleRegistration ? new Date(fields.firstVehicleRegistration).toISOString().split('T')[0] : null}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <DatePicker
                            name="lastUUV"
                            id="lastUUV"
                            autoOk
                            format="dd/MM/yyyy"
                            label={t('lastUUVInputLabel')}
                            placeholder='tt/mm/jjjj'
                            onChange={(e) => setFields({ ...fields, lastUUV: e })}
                            className={classes.textField}
                            value={fields.lastUUV ? new Date(fields.lastUUV).toISOString().split('T')[0] : null}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <DatePicker
                            name="nextUUV"
                            id="nextUUV"
                            autoOk
                            format="dd/MM/yyyy"
                            label={t('nextUUVInputLabel')}
                            placeholder='tt/mm/jjjj'
                            onChange={(e) => setFields({ ...fields, nextUUV: e })}
                            className={classes.textField}
                            value={fields.nextUUV ? new Date(fields.nextUUV).toISOString().split('T')[0] : null}
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
                            placeholder='tt/mm/jjjj'
                            onChange={(e) => setFields({ ...fields, firstVehicleRegistrationOnOwner: e })}
                            className={classes.textField}
                            value={fields.firstVehicleRegistrationOnOwner ? new Date(fields.firstVehicleRegistrationOnOwner).toISOString().split('T')[0] : null}
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
                            value={fields.lastTechnicalInspection ? new Date(fields.lastTechnicalInspection).toISOString().split('T')[0] : null}
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
                            value={fields.nextTechnicalInspection ? new Date(fields.nextTechnicalInspection).toISOString().split('T')[0] : null}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <DatePicker
                            name="TUV"
                            id="TUV"
                            autoOk
                            format="dd/MM/yyyy"
                            label={t('TUVInputLabel')}
                            placeholder='tt/mm/jjjj'
                            onChange={(e) => setFields({ ...fields, TUV: e })}
                            className={classes.textField}
                            value={fields.TUV ? new Date(fields.TUV).toISOString().split('T')[0] : null}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <DatePicker
                            name="AU"
                            id="AU"
                            autoOk
                            format="dd/MM/yyyy"
                            label={t('AUInputLabel')}
                            placeholder='tt/mm/jjjj'
                            onChange={(e) => setFields({ ...fields, AU: e })}
                            className={classes.textField}
                            value={fields.AU ? new Date(fields.AU).toISOString().split('T')[0] : null}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="monthlyInsurancePayment"
                            margin="dense"
                            id="update-vehicle-monthlyInsurancePayment"
                            label={t('MonthlyInsurancePaymentInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.monthlyInsurancePayment}
                        />
                        <TextField
                            name="yearlyTax"
                            margin="dense"
                            id="update-vehicle-yearlyTax"
                            label={t('YearlyTaxInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.yearlyTax}
                        />
                        <DialogActions>
                            <Button variant="contained" onClick={handleClose} color="primary">
                                {t('CancelButton')}
                            </Button>
                            <Button variant="contained" type="submit" color="secondary">
                                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(UpdateVehicleInformation)
