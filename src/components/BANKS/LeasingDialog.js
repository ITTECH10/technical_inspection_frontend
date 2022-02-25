import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { useData } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import banksInfoProvider from './BankInfoProvider'
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
}))

const banks = banksInfoProvider.getBankNames()

function LeasingDialog({ t }) {
    const [open, setOpen] = React.useState(false);
    const { setSelectedCar, selectedPayment, setSelectedPayment } = useData()
    const history = useHistory()

    let leasingPaymentId
    const carId = history.location.pathname.split('/')[2]

    if (selectedPayment.leasingPayment) {
        leasingPaymentId = selectedPayment.leasingPayment._id
    }

    const fieldsInit = {
        leasingGiver: banks.length > 0 ? banks[0].bankName : '',
        maintenancePackage: "No",
        contractNumber: '',
        boughtFrom: '',
        leasingStartDate: '',
        monthlyLeasingPayment: '',
        leasingLastsFor: '',
        remainingPayment: '',
        moreDetails: '',
        costsForMoreKilometers: '',
        costsForLessKilometers: '',
        kilometersDrivenWhenPurchased: ''
    }

    const [fields, setFields] = React.useState(fieldsInit)

    React.useEffect(() => {
        setFields({
            leasingGiver: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.leasingGiver : '',
            contractNumber: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.contractNumber : '',
            boughtFrom: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.boughtFrom : '',
            leasingStartDate: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.leasingStartDate : '',
            monthlyLeasingPayment: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.monthlyLeasingPayment : '',
            maintenancePackage: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.maintenancePackage : '',
            leasingLastsFor: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.leasingLastsFor : '',
            closingRate: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.closingRate : '',
            remainingPayment: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.remainingPayment : '',
            moreDetails: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.moreDetails : '',
            costsForMoreKilometers: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.costsForMoreKilometers : '',
            costsForLessKilometers: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.costsForLessKilometers : '',
            kilometersDrivenWhenPurchased: selectedPayment.leasingPayment ? selectedPayment.leasingPayment.kilometersDrivenWhenPurchased : ''
        })
    }, [selectedPayment, open])

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    };

    const classes = useStyles()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFields(fieldsInit)
    };

    const handlePostSubmit = (e) => {
        e.preventDefault()

        const data = { ...fields }
        axios.post(`/cars/${carId}/contracts/leasing`, data)
            .then(res => {
                if (res.status === 201) {
                    handleClose()
                    setSelectedCar(res.data.vehicle)
                }
            })
            .catch(err => {
                // console.log(err.response)
            })
    }

    const handlePutSubmit = (e) => {
        e.preventDefault()

        const data = { ...fields, vehiclePayedFor: carId }
        axios.put(`/contracts/leasing/${leasingPaymentId}`, data)
            .then(res => {
                if (res.status === 202) {
                    const updatedPayments = { ...selectedPayment }
                    updatedPayments.leasingPayment = res.data.leasingPayment
                    setSelectedPayment(updatedPayments)
                    handleClose()
                }
            })
            .catch(err => {
                // console.log(err.response)
            })
    }

    return (
        <div>
            <Button variant="text" color="secondary" onClick={handleClickOpen}>
                Leasing
                {selectedPayment.leasingPayment && <CheckCircleIcon style={{ marginLeft: 10 }} />}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Leasing</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('GeneralFormFullfilments')}
                    </DialogContentText>
                    <form onSubmit={!selectedPayment.leasingPayment ? handlePostSubmit : handlePutSubmit} style={{ marginBottom: 10 }}>
                        <TextField
                            name="leasingGiver"
                            margin="dense"
                            id="standard-select-currency-native"
                            label={t('PaymentLeasingGiver')}
                            onChange={handleChange}
                            fullWidth
                            value={fields.leasingGiver}
                            type="text"
                            required
                        />
                        <TextField
                            name="contractNumber"
                            margin="dense"
                            id="contractNumber-leasing"
                            label={t('ContractNumberInputLabel')}
                            required
                            value={fields.contractNumber}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="boughtFrom"
                            margin="dense"
                            id="contractNumber-boughtFrom"
                            label={t('BuyedBy')}
                            required
                            value={fields.boughtFrom}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="maintenancePackage"
                            id="standard-select-maintenancePackage"
                            select
                            value={fields.maintenancePackage}
                            label={t('MaintenancePackage')}
                            onChange={handleChange}
                            fullWidth
                            required
                            style={{ margin: "8px 0" }}
                            SelectProps={{
                                native: true,
                            }}
                            helperText={t('IsThereMaintenancePackage')}
                        >
                            {["Nein", "Ja"].map((option, idx) => (
                                <option key={idx} value={option}>
                                    {option}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            name="leasingStartDate"
                            margin="dense"
                            id="leasingStartDate-leasing"
                            label={t('LeasingStartDateInputLabel')}
                            type="date"
                            value={fields.leasingStartDate ? new Date(fields.leasingStartDate).toISOString().split('T')[0] : '1970/12/31'}
                            onChange={handleChange}
                            required
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="monthlyLeasingPayment"
                            margin="dense"
                            id="monthlyLeasingPayment-leasing"
                            label={t('MonthlyLeasingPaymentInputLabel')}
                            required
                            value={fields.monthlyLeasingPayment}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="leasingLastsFor"
                            margin="dense"
                            id="leasingLastsFor-leasing"
                            label={`${t('LeasingLastsForInputLabel')} (in ${t('monthPlural')})`}
                            required
                            value={fields.leasingLastsFor}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <Divider style={{ marginTop: 10 }} />
                        <Typography style={{ color: '#999', fontSize: 12, marginTop: 5 }}>
                            {t('PaymentRestwertLeasingContract')}
                        </Typography>
                        <TextField
                            name="remainingPayment"
                            margin="dense"
                            value={fields.remainingPayment}
                            id="remainingPayment-finanses"
                            label={t('RestvertInputLabel')}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <Divider style={{ marginTop: 10 }} />
                        {/* <Typography style={{ color: '#999', fontSize: 12, marginTop: 5 }}>
                            Kilometerleasing
                        </Typography> */}
                        <TextField
                            name="moreDetails"
                            margin="dense"
                            id="moreDetails-leasing"
                            label={t('MoreDetailsLeasingCreation')}
                            type="text"
                            value={fields.moreDetails}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="costsForMoreKilometers"
                            margin="dense"
                            id="costsForMoreKilometers-leasing"
                            label={t('CostsForMoreKilometersInputLabel')}
                            type="text"
                            value={fields.costsForMoreKilometers}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="costsForLessKilometers"
                            margin="dense"
                            id="costsForLessKilometers-leasing"
                            label={t('CostsForLessKilometers')}
                            value={fields.costsForLessKilometers}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="kilometersDrivenWhenPurchased"
                            margin="dense"
                            id="kilometersDrivenWhenPurchased"
                            value={fields.kilometersDrivenWhenPurchased}
                            onChange={handleChange}
                            required
                            label={t('Payment.cash.kilometersDrivenWhenPurchased')}
                            type="number"
                            fullWidth
                            style={{ marginBottom: 15 }}
                        />
                        <Button style={{ marginRight: 10 }} variant="contained" onClick={handleClose} color="primary">
                            {t('CancelButton')}
                        </Button>
                        <Button variant="contained" type="submit" color="secondary">
                            {t('SubmitButton')}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default withNamespaces()(LeasingDialog)