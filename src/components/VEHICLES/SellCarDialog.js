import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core'
import { withNamespaces } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import { useHistory } from 'react-router';
import { useData } from '../../contexts/DataContext';
import Alerts from './../UI/Alerts'

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        width: '100%'
    },
}))

function SellCarDialog({ t }) {
    const [open, setOpen] = React.useState(false);
    const { setSelectedCar, selectedCar } = useData()
    const classes = useStyles()
    const history = useHistory()
    const [btnLoading, setBtnLoading] = React.useState(false)
    const [carSoldAlert, setCarSoldAlert] = React.useState(false)
    let sellCarTimeout

    React.useEffect(() => {
        return () => {
            clearTimeout(sellCarTimeout)
        }
    })

    const [fields, setFields] = React.useState({
        carIsSold: false,
        carIsSoldTo: '',
        carIsSoldDate: ''
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

    const carId = history.location.pathname.split('/')[2]

    const handleSubmit = (e) => {
        e.preventDefault()
        setBtnLoading(true)

        const data = { ...fields, carIsSold: true }

        axios.put(`/cars/${carId}`, data).then(res => {
            if (res.status === 200) {
                sellCarTimeout = setTimeout(() => {
                    setSelectedCar(res.data.updatedVehicle)
                    setBtnLoading(false)
                    setOpen(false)
                    setCarSoldAlert(true)
                }, 2000)
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    return (
        <div>
            <Alerts message={t('AlertGeneralSuccessful')} open={carSoldAlert} handleOpening={setCarSoldAlert} />
            <Button disabled={selectedCar.carIsSold} variant="text" color="secondary" onClick={handleClickOpen}>
                {selectedCar.carIsSold ? 'Fahrzeug Verkauft' : 'Fahrzeug Verkaufen?'}
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Fahrzeug Verkauft?</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <DialogContentText>
                            Das fahrzeug wurde verkauft?
                        </DialogContentText>
                        <TextField
                            name="carIsSoldTo"
                            autoFocus
                            margin="dense"
                            id="sell-car-car-is-sold-to"
                            label="Der käufer des fahrzeugs?"
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            onChange={handleChange}
                        />
                        <TextField
                            name="carIsSoldDate"
                            //   error={errors.carIsSoldDate && errors.carIsSoldDate}
                            //   helperText={errors.carIsSoldDate && errors.carIsSoldDate}
                            id="sell-car-car-is-sold-date"
                            label="Wann wurde das fahrzeug verkauft?"
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={handleClose}>{t('CancelButton')}</Button>
                        <Button disabled={Object.values(fields).slice(1).every(el => el === '')} variant="contained" color="secondary" type="submit">{btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(SellCarDialog)