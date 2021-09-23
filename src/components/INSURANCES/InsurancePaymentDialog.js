import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'
import { withNamespaces } from 'react-i18next';
import insuranceInfoProvider from './InsuranceInfoProvider';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useData } from './../../contexts/DataContext'
import axios from 'axios'
import Alerts from './../UI/Alerts'

const insurances = insuranceInfoProvider.getInsuranceNames()

function InsurancePaymentDialog({ t }) {
    const [open, setOpen] = React.useState(false);
    const [btnLoading, setBtnLoading] = React.useState(false)
    const { user, selectedUser, setSelectedCar, selectedCar, selectedCarInsurance, setSelectedCarInsurance } = useData()
    const [insuranceAddedAlert, setInsuranceAddedAlert] = React.useState(false)
    const [insuranceUpdatedAlert, setInsuranceUpdatedAlert] = React.useState(false)

    let userId, vehicleId, insuranceTimeout

    React.useEffect(() => {
        return () => {
            clearTimeout(insuranceTimeout)
        }
    })

    if (user.role === 'admin' && selectedUser && selectedCar) {
        userId = selectedUser._id
        vehicleId = selectedCar._id
    }

    const [fields, setFields] = React.useState({
        insuranceHouse: insurances.length > 0 ? insurances[0].insuranceName : '',
        kasko: '0',
        contractNumber: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handlePostSubmit = (e) => {
        e.preventDefault()
        setBtnLoading(true)

        const data = { ...fields }

        axios.post(`/insuranceHouse/${userId}/${vehicleId}`, data).then(res => {
            if (res.status === 201) {
                const updatedVehicle = { ...selectedCar }
                updatedVehicle.insuranceHouse = res.data.newInsuranceHouse._id

                insuranceTimeout = setTimeout(() => {
                    setSelectedCar(updatedVehicle)
                    setBtnLoading(false)
                    setOpen(false)
                    setInsuranceAddedAlert(true)
                }, 2000)
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    const handlePutSubmit = (e) => {
        e.preventDefault()
        setBtnLoading(true)

        const data = { ...fields }

        axios.put(`/insuranceHouse/${selectedCarInsurance._id}`, data).then(res => {
            if (res.status === 200) {
                const updatedVehicle = { ...selectedCar }
                updatedVehicle.insuranceHouse = res.data.insurance._id

                insuranceTimeout = setTimeout(() => {
                    setSelectedCar(updatedVehicle)
                    setSelectedCarInsurance(res.data.insurance)
                    setBtnLoading(false)
                    setOpen(false)
                    setInsuranceUpdatedAlert(true)
                }, 2000)
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <div>
            <Alerts message={t('AlertGeneralSuccessful')} open={insuranceAddedAlert} handleOpening={setInsuranceAddedAlert} />
            <Alerts message={t('AlertGeneralUpdated')} open={insuranceUpdatedAlert} handleOpening={setInsuranceUpdatedAlert} />
            <Button variant="text" color="secondary" onClick={handleClickOpen}>
                {selectedCarInsurance._id ? "Verbindet" : "Verbinden"}
                {selectedCarInsurance._id && <CheckCircleIcon />}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{`${t('InsurancesTitle')} verbindung`}</DialogTitle>
                <form onSubmit={!selectedCarInsurance._id ? handlePostSubmit : handlePutSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Füllen Sie die Felder mit dem * Zeichen unten aus
                        </DialogContentText>
                        <TextField
                            name="insuranceHouse"
                            id="insuranceHouse-insurances"
                            select
                            label="Gesellschaft"
                            onChange={handleChange}
                            fullWidth
                            required
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Bitte selekten sie die Versicherung."
                        >
                            {insurances.map((option) => (
                                <option key={option.insuranceId} value={option.insuranceName}>
                                    {option.insuranceName}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            name="kasko"
                            id="insuranceHouse-kasko"
                            select
                            label="Kasko"
                            style={{ marginTop: 10 }}
                            onChange={handleChange}
                            fullWidth
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Bitte selekten sie das kasko."
                        >
                            {["0", "150", "300", "500", "1000", "2500"].map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            name="contractNumber"
                            margin="dense"
                            id="insurance-contractNumber"
                            onChange={handleChange}
                            required
                            label="Vertragsnummer"
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleClose} color="primary">
                            {t('CancelButton')}
                        </Button>
                        <Button variant="contained" type="submit" color="secondary">
                            {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(InsurancePaymentDialog)