import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { useData } from './../../contexts/DataContext'
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withNamespaces } from 'react-i18next';
import banksInfoProvider from './BankInfoProvider'

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
}))

const banks = banksInfoProvider.getBankNames()

function FinansesDialog({ t }) {
    const [open, setOpen] = React.useState(false);
    const { setSelectedCar, selectedPayment, setSelectedPayment } = useData()
    const history = useHistory()

    let creditPaymentId
    const carId = history.location.pathname.split('/')[2]

    if (selectedPayment.creditPayment) {
        creditPaymentId = selectedPayment.creditPayment._id
    }

    const fieldsInit = {
        creditInstitute: banks.length > 0 ? banks[0].bankName : '',
        contractNumber: '',
        boughtFrom: '',
        creditStartDate: '',
        monthlyCreditPayment: '',
        interestRate: '',
        creditLastsFor: '',
        closingRate: '',
        kilometersDrivenWhenPurchased: ''
    }

    const [fields, setFields] = React.useState(fieldsInit)

    React.useEffect(() => {
        setFields({
            creditInstitute: selectedPayment.creditPayment ? selectedPayment.creditPayment.creditInstitute : '',
            contractNumber: selectedPayment.creditPayment ? selectedPayment.creditPayment.contractNumber : '',
            boughtFrom: selectedPayment.creditPayment ? selectedPayment.creditPayment.boughtFrom : '',
            creditStartDate: selectedPayment.creditPayment ? selectedPayment.creditPayment.creditStartDate : '',
            monthlyCreditPayment: selectedPayment.creditPayment ? selectedPayment.creditPayment.monthlyCreditPayment : '',
            interestRate: selectedPayment.creditPayment ? selectedPayment.creditPayment.interestRate : '',
            creditLastsFor: selectedPayment.creditPayment ? selectedPayment.creditPayment.creditLastsFor : '',
            closingRate: selectedPayment.creditPayment ? selectedPayment.creditPayment.closingRate : '',
            kilometersDrivenWhenPurchased: selectedPayment.creditPayment ? selectedPayment.creditPayment.kilometersDrivenWhenPurchased : ''
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
        axios.post(`/cars/${carId}/contracts/credit`, data)
            .then(res => {
                console.log(res.data)
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
        axios.put(`/contracts/credit/${creditPaymentId}`, data)
            .then(res => {
                if (res.status === 202) {
                    const updatedPayments = { ...selectedPayment }
                    updatedPayments.creditPayment = res.data.creditPayment
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
                {t('Payment.financing.btn')}
                {selectedPayment.creditPayment && <CheckCircleIcon style={{ marginLeft: 10 }} />}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('PaymentFinansingTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('GeneralFormFullfilments')}
                    </DialogContentText>
                    <form onSubmit={!selectedPayment.creditPayment ? handlePostSubmit : handlePutSubmit} style={{ marginBottom: 10 }}>
                        <TextField
                            name="creditInstitute"
                            margin="dense"
                            id="creditInstitute-finanses"
                            value={fields.creditInstitute}
                            label={t('PaymentFinansingInstitution')}
                            onChange={handleChange}
                            fullWidth
                            type="text"
                            required
                        />
                        <TextField
                            name="contractNumber"
                            margin="dense"
                            id="contractNumber-finanses"
                            value={fields.contractNumber}
                            label={t('ContractNumberInputLabel')}
                            onChange={handleChange}
                            required
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="boughtFrom"
                            margin="dense"
                            value={fields.boughtFrom}
                            id="boughtFrom-finanses"
                            label={t('BuyedBy')}
                            onChange={handleChange}
                            required
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="creditStartDate"
                            margin="dense"
                            value={fields.creditStartDate ? new Date(fields.creditStartDate).toISOString().split('T')[0] : '1970/12/31'}
                            onChange={handleChange}
                            id="creditStartDate-finanses"
                            label={t('CreditStartDateInputLabel')}
                            type="date"
                            required
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="monthlyCreditPayment"
                            margin="dense"
                            onChange={handleChange}
                            id="monthlyCreditPayment-finanses"
                            label={t('MonthlyCreditPaymentInputLabel')}
                            required
                            value={fields.monthlyCreditPayment}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="interestRate"
                            margin="dense"
                            onChange={handleChange}
                            id="interestRate-finanses"
                            label={t('CreditPaymentInterestInputLabel')}
                            required
                            value={fields.interestRate}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="creditLastsFor"
                            margin="dense"
                            onChange={handleChange}
                            id="creditLastsFor-finanses"
                            label={`${t('CreditLastsForInputLabel')} (in monaten)`}
                            type="text"
                            fullWidth
                            value={fields.creditLastsFor}
                            required
                        />
                        <TextField
                            name="closingRate"
                            margin="dense"
                            onChange={handleChange}
                            id="closingRate-finanses"
                            label={t('PaymentFinansesClosingRate')}
                            type="text"
                            fullWidth
                            value={fields.closingRate}
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
                            Schliessen
                        </Button>
                        <Button variant="contained" type="submit" color="secondary">
                            Speichern
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}

export default withNamespaces()(FinansesDialog)