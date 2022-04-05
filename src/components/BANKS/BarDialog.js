import React from 'react';
import { DatePicker } from '@material-ui/pickers';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useData } from './../../contexts/DataContext'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withNamespaces } from 'react-i18next';
import NumberFormat from 'react-number-format'

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
    btnLabel: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
            marginRight: 0
        }
    }
}))

function BarDialog({ t }) {
    const [open, setOpen] = React.useState(false);
    const history = useHistory()
    const { setSelectedCar, selectedPayment, setSelectedPayment, setGeneralAlertOptions } = useData()
    let cashPaymentId
    const carId = history.location.pathname.split('/')[2]

    if (selectedPayment.cashPayment) {
        cashPaymentId = selectedPayment.cashPayment._id
    }

    const fieldsInit = {
        payedAt: '',
        cashSum: '',
        boughtFrom: '',
        kilometersDrivenWhenPurchased: ''
    }

    const [fields, setFields] = React.useState(fieldsInit)
    const classes = useStyles()

    React.useEffect(() => {
        setFields({
            payedAt: selectedPayment.cashPayment ? selectedPayment.cashPayment.payedAt : '',
            cashSum: selectedPayment.cashPayment ? selectedPayment.cashPayment.cashSum : '',
            boughtFrom: selectedPayment.cashPayment ? selectedPayment.cashPayment.boughtFrom : '',
            kilometersDrivenWhenPurchased: selectedPayment.cashPayment ? selectedPayment.cashPayment.kilometersDrivenWhenPurchased : ''
        })
    }, [selectedPayment, open])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setFields(fieldsInit)
    };

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handlePostSubmit = (e) => {
        e.preventDefault()

        const data = {
            ...fields,
            cashSum: fields.cashSum !== '' ? fields.cashSum.split('€')[1].replaceAll(',', '') : undefined
        }

        axios.post(`/cars/${carId}/contracts/cash`, data)
            .then(res => {
                if (res.status === 201) {
                    handleClose()
                    setSelectedCar(res.data.vehicle)
                }
            })
            .catch(err => {
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

        const data = {
            ...fields,
            vehiclePayedFor: carId,
            cashSum: fields.cashSum !== '' ? +fields.cashSum.split('€')[1].replaceAll(',', '') : undefined
        }

        axios.put(`/contracts/cash/${cashPaymentId}`, data)
            .then(res => {
                if (res.status === 202) {
                    const updatedPayments = { ...selectedPayment }
                    updatedPayments.cashPayment = res.data.cashPayment
                    setSelectedPayment(updatedPayments)
                    handleClose()
                }
            })
            .catch(err => {
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
            <Button variant="text" color="secondary" onClick={handleClickOpen} classes={{ label: classes.btnLabel }}>
                {t('Payment.cash.btn')}
                {selectedPayment.cashPayment && <CheckCircleIcon />}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('PaymentCashTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('BarDialogTitle')}
                    </DialogContentText>
                    <form onSubmit={!selectedPayment.cashPayment ? handlePostSubmit : handlePutSubmit} style={{ marginBottom: 10 }}>
                        <DatePicker
                            name="payedAt"
                            id="payedAt-bar"
                            autoOk
                            format="dd/MM/yyyy"
                            label={t('Payment.cash.payedAt')}
                            placeholder="tt/mm/jjjj"
                            onChange={(e) => setFields({ ...fields, payedAt: e })}
                            value={fields.payedAt !== '' ? new Date(fields.payedAt).toISOString().split('T')[0] : null}
                            className={classes.textField}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="boughtFrom"
                            margin="dense"
                            id="boughtFrom"
                            value={fields.boughtFrom}
                            onChange={handleChange}
                            required
                            label={t('BuyedBy')}
                            type="text"
                            fullWidth
                        />
                        <NumberFormat
                            customInput={TextField}
                            name="cashSum"
                            margin="dense"
                            id="cashSum"
                            thousandSeparator
                            value={fields.cashSum}
                            prefix="€"
                            onChange={handleChange}
                            required
                            label={t('Payment.cash.sum')}
                            type="text"
                            fullWidth
                            style={{ marginBottom: 15 }}
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
                        <Button type="submit" variant="contained" color="secondary">
                            Speichern
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(BarDialog)