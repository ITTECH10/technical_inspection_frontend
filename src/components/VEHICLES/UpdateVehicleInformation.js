import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
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
    const { vehicles, setVehicles, selectedCar, user, setSelectedCar, myVehicles, setMyVehicles } = useData()
    const [fields, setFields] = React.useState({
        mark: '',
        model: '',
        registrationNumber: '',
        HSN: '',
        TSN: '',
        firstVehicleRegistration: '',
        firstVehicleRegistrationOnOwner: '',
        kilometersDriven: '',
        lastTechnicalInspection: '',
        nextTechnicalInspection: '',
        TUV: '',
        AU: '',
        monthlyInsurancePayment: '',
        allowedYearlyKilometers: '',
        yearlyTax: '',
    })
    const history = useHistory()
    const carId = history.location.pathname.split('/')[2]

    React.useEffect(() => {
        setFields({
            mark: selectedCar.mark,
            model: selectedCar.model,
            registrationNumber: selectedCar.registrationNumber,
            HSN: selectedCar.HSN,
            TSN: selectedCar.TSN,
            firstVehicleRegistration: selectedCar.firstVehicleRegistration,
            firstVehicleRegistrationOnOwner: selectedCar.firstVehicleRegistrationOnOwner,
            kilometersDriven: selectedCar.kilometersDriven,
            lastTechnicalInspection: selectedCar.lastTechnicalInspection,
            nextTechnicalInspection: selectedCar.nextTechnicalInspection,
            TUV: selectedCar.TUV,
            AU: selectedCar.AU,
            monthlyInsurancePayment: selectedCar.monthlyInsurancePayment,
            allowedYearlyKilometers: selectedCar.allowedYearlyKilometers,
            yearlyTax: selectedCar.yearlyTax,
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

        const data = { ...fields }
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
                corespondingCar.TUV = res.data.updatedVehicle.TUV
                corespondingCar.AU = res.data.updatedVehicle.AU

                setTimeout(() => {
                    setVehicles(updatedVehicles)
                    setMyVehicles(updatedVehicles)
                    setSelectedCar(res.data.updatedVehicle)
                    setBtnLoading(false)
                    handleClose()
                    setOnHandleUpdateOpen(true)
                }, 2000)
            }
        })
            .catch(err => {
                // console.log(err.response)
            })
    }

    return (
        <div style={{ marginRight: 10 }}>
            <Tooltip title="Update Vehicle?">
                <IconButton className={classes.btnRoot} size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit vehicle information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit vehicle information, fill all the fields with '*' mark.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="mark"
                            autoFocus
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
                            name="HSN"
                            margin="dense"
                            id="update-vehicle-HSN"
                            label={t('HSNInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            required
                            value={fields.HSN}
                        />
                        <TextField
                            name="TSN"
                            margin="dense"
                            id="update-vehicle-TSN"
                            label={t('TSNInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            required
                            value={fields.TSN}
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
                            required
                            value={fields.kilometersDriven}
                        />
                        <TextField
                            name="firstVehicleRegistration"
                            id="update-vehicle-firstVehicleRegistration"
                            label={t('FVRInputLabel')}
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            required
                            value={fields.firstVehicleRegistration ? new Date(fields.firstVehicleRegistration).toISOString().split('T')[0] : '1970/12/31'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="firstVehicleRegistrationOnOwner"
                            id="update-vehicle-firstVehicleRegistrationOnOwner"
                            label={t('FVROOInputLabel')}
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            required
                            value={fields.firstVehicleRegistrationOnOwner ? new Date(fields.firstVehicleRegistrationOnOwner).toISOString().split('T')[0] : '1970/12/31'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="lastTechnicalInspection"
                            id="update-vehicle-lastTechnicalInspection"
                            label={t('LTIInputLabel')}
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            required
                            value={fields.lastTechnicalInspection ? new Date(fields.lastTechnicalInspection).toISOString().split('T')[0] : '1970/12/31'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="nextTechnicalInspection"
                            id="update-vehicle-nextTechnicalInspection"
                            label={t('NTIInputLabel')}
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            required
                            value={fields.nextTechnicalInspection ? new Date(fields.nextTechnicalInspection).toISOString().split('T')[0] : '1970/12/31'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="TUV"
                            id="update-vehicle-TUV"
                            label={t('TUVInputLabel')}
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            value={fields.TUV ? new Date(fields.TUV).toISOString().split('T')[0] : '1970/12/31'}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="AU"
                            id="update-vehicle-AU"
                            label={t('AUInputLabel')}
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            required
                            value={fields.AU ? new Date(fields.AU).toISOString().split('T')[0] : '1970/12/31'}
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
                            required
                        />
                        <TextField
                            name="allowedYearlyKilometers"
                            margin="dense"
                            id="update-vehicle-allowedYearlyKilometers"
                            label={t('AllowedYearlyKilometersInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.allowedYearlyKilometers}
                            required
                        />
                        <TextField
                            name="yearlyTax"
                            margin="dense"
                            id="update-vehicle-yearlyTax"
                            label={t('YearlyTaxInputLabel')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.yearlyTax}
                            required
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