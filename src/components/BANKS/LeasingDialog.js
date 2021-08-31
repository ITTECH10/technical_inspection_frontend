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

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
}))

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const { banks, setSelectedCar, selectedPayment } = useData()
    const history = useHistory()

    const fieldsInit = {
        leasingGiver: banks[0]._id,
        contractNumber: '',
        leasingStartDate: '',
        monthlyLeasingPayment: '',
        leasingLastsFor: '',
        remainingPayment: '',
        allowedYearlyKilometers: '',
        costsForMoreKilometers: '',
        costsForLessKilometers: '',
    }

    const [fields, setFields] = React.useState(fieldsInit)

    const carId = history.location.pathname.split('/')[2]

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

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = { ...fields }
        axios.post(`/cars/${carId}/contracts/leasing`, data)
            .then(res => {
                if (res.status === 201) {
                    handleClose()
                    setSelectedCar(res.data.vehicle)
                }
            })
            .catch(err => console.log(err.response))
    }

    return (
        <div>
            <Button variant="text" color="secondary" onClick={handleClickOpen}>
                Leasing
                {selectedPayment.leasingPayment && <CheckCircleIcon />}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Leasing</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Sie mussen die Felder mit mark '*' fullen.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} style={{ marginBottom: 10 }}>
                        <TextField
                            name="leasingGiver"
                            id="standard-select-currency-native"
                            select
                            label="Leasinggeber"
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
                            id="contractNumber-leasing"
                            label="Vertragsnummer"
                            required
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="leasingStartDate"
                            margin="dense"
                            id="leasingStartDate-leasing"
                            label="Kreditbeginn"
                            type="date"
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
                            label="Monatliche Leasingrate"
                            required
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="leasingLastsFor"
                            margin="dense"
                            id="leasingLastsFor-leasing"
                            label="Leasingdauer (in monate)"
                            required
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <Divider style={{ marginTop: 10 }} />
                        <Typography style={{ color: '#999', fontSize: 12, marginTop: 5 }}>
                            Restvertleasingvertrag
                        </Typography>
                        <TextField
                            name="remainingPayment"
                            margin="dense"
                            id="remainingPayment-finanses"
                            label="Restwert"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <Divider style={{ marginTop: 10 }} />
                        <Typography style={{ color: '#999', fontSize: 12, marginTop: 5 }}>
                            Kilometerleasing
                        </Typography>
                        <TextField
                            name="allowedYearlyKilometers"
                            margin="dense"
                            id="allowedYearlyKilometers-leasing"
                            label="Jahrliche Kilometerleistung"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="costsForMoreKilometers"
                            margin="dense"
                            id="costsForMoreKilometers-leasing"
                            label="Kosten fur Mehrkilometer"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="costsForLessKilometers"
                            margin="dense"
                            id="costsForLessKilometers-leasing"
                            label="Kosten fur Minderkilometer"
                            type="text"
                            onChange={handleChange}
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
