import React from 'react';
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

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
}))

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const history = useHistory()
    const { setSelectedCar } = useData()

    const fieldsInit = {
        payedAt: '',
        cashSum: ''
    }

    const [fields, setFields] = React.useState(fieldsInit)

    const classes = useStyles()
    const carId = history.location.pathname.split('/')[2]

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

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = { ...fields }
        axios.post(`/cars/${carId}/contracts/cash`, data)
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
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Bar
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Barbezahlung</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wann wurde das Auto abbgezahlt / gekauft?
                    </DialogContentText>
                    <form onSubmit={handleSubmit} style={{ marginBottom: 10 }}>
                        <TextField
                            name="payedAt"
                            id="payedAt-bar"
                            onChange={handleChange}
                            label="Bezahlt am"
                            type="date"
                            className={classes.textField}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            name="cashSum"
                            margin="dense"
                            id="cashSum"
                            onChange={handleChange}
                            required
                            label="Summe"
                            type="text"
                            fullWidth
                            style={{ marginBottom: 15 }}
                        />
                        <Button style={{ marginRight: 10 }} variant="contained" onClick={handleClose} color="primary">
                            Schliessen
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
