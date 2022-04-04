import React from 'react';
import { useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Switch from '@material-ui/core/Switch'
import { withNamespaces } from 'react-i18next';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { useData } from './../../contexts/DataContext'
import axios from 'axios'
import Alerts from './../UI/Alerts'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
// 3rdparty
import NumberFormat from 'react-number-format'

const insuranceCostVariants = [
    {
        id: 0,
        name: 'monatlich',
        value: 'monthly'
    },
    {
        id: 1,
        name: 'vierteljährlich',
        value: 'yearQuarter'
    },
    {
        id: 2,
        name: 'halbjährlich',
        value: 'halfYearly'
    },
    {
        id: 3,
        name: 'jährlich',
        value: 'yearly'
    }
]

function InsurancePaymentDialog({ t }) {
    const location = useLocation()
    const [open, setOpen] = React.useState(false);
    const [adacChecked, setAdacChecked] = React.useState(false)
    const [protectionLetterChecked, setProtectionLetterChecked] = React.useState(false)
    const [btnLoading, setBtnLoading] = React.useState(false)
    const { user, selectedUser, setSelectedCar, selectedCar, selectedCarInsurance, setSelectedCarInsurance, setGeneralAlertOptions } = useData()
    const [insuranceAddedAlert, setInsuranceAddedAlert] = React.useState(false)
    const [insuranceUpdatedAlert, setInsuranceUpdatedAlert] = React.useState(false)
    const [selectedKaskoOption, setSelectedKaskoOption] = React.useState("VK/TK")
    const [fields, setFields] = React.useState({
        insuranceHouse: '',
        contractNumber: '',
        vk: "0",
        tk: "0",
        insuranceCost: '',
        insuranceCostType: '',
        allowedYearlyKilometers: '',
        membershipNumber: ''
    })

    let userId, vehicleId

    React.useEffect(() => {
        setFields({
            insuranceHouse: selectedCarInsurance.insuranceHouse ? selectedCarInsurance.insuranceHouse : '',
            contractNumber: selectedCarInsurance.contractNumber ? selectedCarInsurance.contractNumber : '',
            vk: selectedCarInsurance.fullKasko ? selectedCarInsurance.fullKasko : '',
            tk: selectedCarInsurance.partKasko ? selectedCarInsurance.partKasko : '',
            insuranceCost: selectedCarInsurance.insuranceCost ? selectedCarInsurance.insuranceCost : '',
            allowedYearlyKilometers: selectedCarInsurance.allowedYearlyKilometers ? selectedCarInsurance.allowedYearlyKilometers : '',
            insuranceCostType: selectedCarInsurance.insuranceCostType ? selectedCarInsurance.insuranceCostType : insuranceCostVariants[0].value,
        })
    }, [selectedCarInsurance, open])

    React.useEffect(() => {
        if (selectedKaskoOption === "TK") {
            setFields(prevState => (
                { ...prevState, vk: '0' }
            ))
        }
    }, [selectedKaskoOption])

    if (user.role === 'admin' && selectedUser && selectedCar) {
        userId = selectedUser._id
        vehicleId = selectedCar._id
    } else {
        userId = user._id
        vehicleId = location.pathname.split('/')[2]
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetSwitchStates()
    };

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

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

    const handleKaskoChange = (e) => {
        setSelectedKaskoOption(e.target.value)
    }

    const handlePostSubmit = (e) => {
        e.preventDefault()
        setBtnLoading(true)

        const data = {
            ...fields,
            protectionLetter: protectionLetterChecked,
            ADAC: adacChecked,
            allowedYearlyKilometers: fields.allowedYearlyKilometers !== '' ? +fields.allowedYearlyKilometers.replaceAll(',', '') : undefined,
            insuranceCost: fields.insuranceCost !== '' ? +fields.insuranceCost.split('€')[1].replaceAll(',', '') : undefined,
            membershipNumber: adacChecked && protectionLetterChecked && fields.membershipNumber !== '' && fields.membershipNumber,
            insuranceCostType: fields.insuranceCost.trim() !== '' ? fields.insuranceCostType : undefined
        }

        axios.post(`/insuranceHouse/${userId}/${vehicleId}`, data).then(res => {
            if (res.status === 201) {
                const updatedVehicle = { ...selectedCar }
                updatedVehicle.insuranceHouse = res.data.newInsuranceHouse._id

                setSelectedCar(updatedVehicle)
                setBtnLoading(false)
                setOpen(false)
                setInsuranceAddedAlert(true)
            }
        }).catch(err => {
            // console.log(err.response)
            setGeneralAlertOptions({
                open: true,
                message: err.response ? err.response.data.message : 'Server-Fehler......',
                severity: 'error',
                hideAfter: 2500
            })
        })
    }

    const handlePutSubmit = (e) => {
        e.preventDefault()
        setBtnLoading(true)

        const data = {
            ...fields,
            protectionLetter: protectionLetterChecked,
            ADAC: adacChecked,
            allowedYearlyKilometers: fields.allowedYearlyKilometers !== '' ? +fields.allowedYearlyKilometers.replaceAll(',', '') : undefined,
            insuranceCost: fields.insuranceCost !== '' ? +fields.insuranceCost.split('€')[1].replaceAll(',', '') : undefined,
            membershipNumber: adacChecked && protectionLetterChecked && fields.membershipNumber !== '' && fields.membershipNumber,
            insuranceCostType: fields.insuranceCost.trim() !== '' ? fields.insuranceCostType : undefined
        }

        axios.put(`/insuranceHouse/${selectedCarInsurance._id}`, data).then(res => {
            if (res.status === 200) {
                const updatedVehicle = { ...selectedCar }
                updatedVehicle.insuranceHouse = res.data.insurance._id

                setSelectedCar(updatedVehicle)
                setSelectedCarInsurance(res.data.insurance)
                setBtnLoading(false)
                setOpen(false)
                setInsuranceUpdatedAlert(true)
            }
        }).catch(err => {
            // console.log(err.response)
            setGeneralAlertOptions({
                open: true,
                message: err.response ? err.response.data.message : 'Server-Fehler......',
                severity: 'error',
                hideAfter: 2500
            })
        })
    }

    return (
        <div>
            <Alerts message={t('AlertGeneralSuccessful')} open={insuranceAddedAlert} handleOpening={setInsuranceAddedAlert} />
            <Alerts message={t('AlertGeneralUpdated')} open={insuranceUpdatedAlert} handleOpening={setInsuranceUpdatedAlert} />
            <Button variant="text" color="secondary" onClick={handleClickOpen}>
                {selectedCarInsurance._id ? t('ConnectedInsuranceButton') : t('ConnectInsuranceButton')}
                {selectedCarInsurance._id && <CheckCircleIcon />}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{`${t('InsurancesTitle')}`}</DialogTitle>
                <form onSubmit={!selectedCarInsurance._id ? handlePostSubmit : handlePutSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            {t('GeneralFormFullfilments')}
                        </DialogContentText>
                        <TextField
                            name="insuranceHouse"
                            margin="dense"
                            id="insuranceHouse-insurances"
                            label={t('InsuranceGesellschaftInputLabel')}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                            value={fields.insuranceHouse}
                            required
                        />
                        <TextField
                            name="contractNumber"
                            margin="dense"
                            id="insurance-contractNumber"
                            onChange={handleChange}
                            required
                            value={fields.contractNumber}
                            label={t('ContractNumberInputLabel')}
                            type="number"
                            fullWidth
                        />
                        <NumberFormat
                            name='insuranceCost'
                            onChange={handleChange}
                            id="insurance-insurance-cost"
                            thousandSeparator={true}
                            customInput={TextField}
                            label="Versicherungsbeitrag (in Euro)"
                            fullWidth
                            margin="dense"
                            value={fields.insuranceCost}
                            prefix="€"
                        />
                        <NumberFormat
                            name='allowedYearlyKilometers'
                            onChange={handleChange}
                            id="insurance-allowed-yearly-kilometers"
                            thousandSeparator={true}
                            customInput={TextField}
                            label="Voraussichtliche Jahresfahrleistung (km)"
                            fullWidth
                            margin="dense"
                            value={fields.allowedYearlyKilometers}
                        />
                        <TextField
                            name="insuranceCostType"
                            id="insuranceHouse-cost-type"
                            select
                            style={{ marginTop: 16, marginRight: 15 }}
                            onChange={handleChange}
                            fullWidth
                            value={fields.insuranceCostType}
                            disabled={!fields.insuranceCost}
                            SelectProps={{
                                native: true
                            }}
                            helperText="Zahlweise"
                        >
                            {insuranceCostVariants.map((option, idx) => (
                                <option key={option.id} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        <FormControl component="fieldset" style={{ marginTop: 30, width: '100%' }}>
                            {/* <FormLabel color="secondary" component="legend">Kasko</FormLabel> */}
                            <RadioGroup aria-label="kasko" name="VK/TK" value="VK/TK" onChange={handleKaskoChange}>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <FormControlLabel style={{ marginTop: 3 }} value="VK/TK" label="VK/TK" control={
                                        <Radio
                                            value="VK/TK"
                                            checked={selectedKaskoOption === 'VK/TK'}
                                            style={{ padding: '0 10px' }}
                                        />}
                                    />
                                    <TextField
                                        name="vk"
                                        id="insuranceHouse-vk"
                                        select
                                        style={{ marginTop: 0, marginRight: 15 }}
                                        onChange={handleChange}
                                        fullWidth
                                        value={fields.vk}
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
                                        style={{ marginTop: 0 }}
                                        onChange={handleChange}
                                        disabled={selectedKaskoOption === "TK"}
                                        fullWidth
                                        value={fields.tk}
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
                                <Box style={{ display: 'flex', alignItems: 'flex-start' }}>
                                    <FormControlLabel value="TK" style={{ marginTop: 3 }} label="TK" control={
                                        <Radio
                                            value="TK"
                                            checked={selectedKaskoOption === 'TK'}
                                            style={{ padding: '0 10px' }}
                                        />}
                                    />
                                    <TextField
                                        name="tk"
                                        id="insuranceHouse-kasko"
                                        select
                                        style={{ marginTop: 0, marginLeft: 26 }}
                                        onChange={handleChange}
                                        fullWidth
                                        value={fields.tk}
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
                        <Box style={{ marginTop: 20 }}>
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