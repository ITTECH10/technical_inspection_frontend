import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withNamespaces } from 'react-i18next';
import { useData } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

function DashboardSellCarDialog({ t }) {
    const [open, setOpen] = React.useState(false);
    const { myVehicles, setSelectedCar } = useData()
    const history = useHistory()
    const [btnLoading, setBtnLoading] = React.useState(false)

    const [pickedVehicle, setPickedVehicle] = React.useState(myVehicles.length > 0 ? myVehicles[0]._id : '')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleVehiclePicker = (e) => {
        setPickedVehicle(e.target.value)
    }

    // START WITH SUBMITING THE FORM
    const handleSubmit = (e) => {
        e.preventDefault()
        setBtnLoading(true)

        axios.put(`/cars/selling/mark/${pickedVehicle}`)
            .then(res => {
                if (res.status === 200) {
                    setBtnLoading(false)
                    setSelectedCar(res.data.pickedVehicle)
                    history.push(`/cars/${pickedVehicle}`)
                }
            }).catch(err => {
                setBtnLoading(false)
                console.log(err.response)
            })
    }

    return (
        <div>
            <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleClickOpen}>
                {t('SellCarDashboardBtn')}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {t('SellCarDashboardBtn')}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('UserDashboardSellVehicleHint')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="sell-vehicle-user-dashboard"
                            id="sell-vehicle-user-dashboard"
                            select
                            onChange={handleVehiclePicker}
                            // label={t('MyVehicles')}
                            fullWidth
                            required
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {myVehicles.map((option, idx) => (
                                <option key={option._id} value={option._id}>
                                    {option.mark} {option.model}
                                </option>
                            ))}
                        </TextField>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" variant="contained">
                                {t('CancelButton')}
                            </Button>
                            <Button type="submit" color="secondary" variant="contained">
                                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(DashboardSellCarDialog)