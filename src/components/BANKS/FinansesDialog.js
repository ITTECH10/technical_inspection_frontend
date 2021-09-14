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

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
}))

function FinancingDialog({ t }) {
    const [open, setOpen] = React.useState(false);
    const { banks, setSelectedCar, selectedPayment, setSelectedPayment } = useData()
    const history = useHistory()

    let creditPaymentId
    const carId = history.location.pathname.split('/')[2]

    if (selectedPayment.creditPayment) {
        creditPaymentId = selectedPayment.creditPayment._id
    }

    const fieldsInit = {
        creditInstitute: banks.length > 0 ? banks[0]._id : '',
        contractNumber: '',
        creditStartDate: '',
        monthlyCreditPayment: '',
        interestRate: '',
        creditLastsFor: '',
        closingRate: ''
    }

    const [fields, setFields] = React.useState(fieldsInit)

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
                <DialogTitle id="form-dialog-title">Finanzierung</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sie mussen die Felder mit mark '*' fullen.
                    </DialogContentText>
                    <form onSubmit={!selectedPayment.creditPayment ? handlePostSubmit : handlePutSubmit} style={{ marginBottom: 10 }}>
                        <TextField
                            name="creditInstitute"
                            id="creditInstitute-finanses"
                            select
                            label="Kreditinstitut"
                            onChange={handleChange}
                            fullWidth
                            required
                            SelectProps={{
                                native: true,
                            }}
                            helperText="Bitte selekten sie die bank."
                        >
                            {banks.map((option) => (
                                <option key={option._id} value={option._id}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            name="contractNumber"
                            margin="dense"
                            id="contractNumber-finanses"
                            label="Vertragsnummer"
                            onChange={handleChange}
                            required
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="creditStartDate"
                            margin="dense"
                            onChange={handleChange}
                            id="creditStartDate-finanses"
                            label="Kreditbeginn"
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
                            label="Monatliche Rate"
                            required
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="interestRate"
                            margin="dense"
                            onChange={handleChange}
                            id="interestRate-finanses"
                            label="Zinssatz"
                            required
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="creditLastsFor"
                            margin="dense"
                            onChange={handleChange}
                            id="creditLastsFor-finanses"
                            label="Kreditdauer (in Monaten)"
                            type="text"
                            fullWidth
                            required
                        />
                        <TextField
                            name="closingRate"
                            margin="dense"
                            onChange={handleChange}
                            id="closingRate-finanses"
                            label="Schlussrate"
                            type="text"
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

export default withNamespaces()(FinancingDialog)