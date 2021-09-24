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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useData } from './../../contexts/DataContext'
import axios from 'axios'
import Alerts from './../UI/Alerts'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';

function InsurancePaymentDialog({ t }) {
    const [open, setOpen] = React.useState(false);
    const [btnLoading, setBtnLoading] = React.useState(false)
    const { user, selectedUser, setSelectedCar, selectedCar, selectedCarInsurance, setSelectedCarInsurance } = useData()
    const [insuranceAddedAlert, setInsuranceAddedAlert] = React.useState(false)
    const [insuranceUpdatedAlert, setInsuranceUpdatedAlert] = React.useState(false)
    const [selectedKaskoOption, setSelectedKaskoOption] = React.useState("VK/TK")
    const [fields, setFields] = React.useState({
        insuranceHouse: '',
        contractNumber: '',
        vk: "0",
        tk: "0"
    })

    let userId, vehicleId, insuranceTimeout

    React.useEffect(() => {
        if (selectedKaskoOption === "TK") {
            setFields(prevState => (
                { ...prevState, vk: '0' }
            ))
        }
    }, [selectedKaskoOption])

    React.useEffect(() => {
        return () => {
            clearTimeout(insuranceTimeout)
        }
    })

    if (user.role === 'admin' && selectedUser && selectedCar) {
        userId = selectedUser._id
        vehicleId = selectedCar._id
    }

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

    const handleKaskoChange = (e) => {
        setSelectedKaskoOption(e.target.value)
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
                            margin="dense"
                            id="insuranceHouse-insurances"
                            label="Gesellschaft"
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            required
                        />
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
                        <FormControl component="fieldset" style={{ marginTop: 10, width: '100%' }}>
                            <FormLabel color="secondary" component="legend">Kasko</FormLabel>
                            <RadioGroup aria-label="kasko" name="VK/TK" value="VK/TK" onChange={handleKaskoChange}>
                                <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <FormControlLabel value="VK/TK" label="VK/TK" control={
                                        <Radio
                                            value="VK/TK"
                                            checked={selectedKaskoOption === 'VK/TK'}
                                        />}
                                    />
                                    <TextField
                                        name="vk"
                                        id="insuranceHouse-vk"
                                        select
                                        style={{ marginTop: 10, marginRight: 15 }}
                                        onChange={handleChange}
                                        fullWidth
                                        disabled={selectedKaskoOption === "TK"}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        helperText="SB VK (EURO)"
                                    >
                                        {["0", "150", "300", "500", "1000", "2500"].map((option, idx) => (
                                            <option key={idx} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </TextField>
                                    <TextField
                                        name="tk"
                                        id="insuranceHouse-tk"
                                        select
                                        style={{ marginTop: 10 }}
                                        onChange={handleChange}
                                        disabled={selectedKaskoOption === "TK"}
                                        fullWidth
                                        SelectProps={{
                                            native: true,
                                        }}
                                        helperText="SB TK (EURO)"
                                    >
                                        {["0", "150", "300", "500", "1000", "2500"].map((option, idx) => (
                                            <option key={idx} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </TextField>
                                </Box>
                                <Box style={{ display: 'flex' }}>
                                    <FormControlLabel value="TK" label="TK" control={
                                        <Radio
                                            value="TK"
                                            checked={selectedKaskoOption === 'TK'}
                                        />}
                                    />
                                    <TextField
                                        name="tk"
                                        id="insuranceHouse-kasko"
                                        select
                                        style={{ marginTop: 10, marginLeft: 26 }}
                                        onChange={handleChange}
                                        fullWidth
                                        disabled={selectedKaskoOption === "VK/TK"}
                                        SelectProps={{
                                            native: true,
                                        }}
                                        helperText="SB TK (EURO)"
                                    >
                                        {["0", "150", "300", "500", "1000", "2500"].map((option, idx) => (
                                            <option key={idx} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </TextField>
                                </Box>
                            </RadioGroup>
                        </FormControl>
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