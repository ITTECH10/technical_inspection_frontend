import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress'

export default function EditUserDetails(props) {
    const [open, setOpen] = React.useState(false);
    const [btnLoading, setBtnLoading] = useState(false)

    const [fields, setFields] = useState({
        email: '',
        lastInspected: '',
        vehicleModel: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
                Edit
                <EditIcon style={{ height: '.8em' }} />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit User Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit user information, simply fill the fields you want to change.
                    </DialogContentText>
                    <form>
                        <TextField
                            name="email"
                            autoFocus
                            margin="dense"
                            id="mail"
                            label="Email Address"
                            onChange={handleChange}
                            type="email"
                            fullWidth
                        />
                        <TextField
                            name="lastInspected"
                            margin="dense"
                            id="last-inspected"
                            label="Last inspected"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="vehicleModel"
                            margin="dense"
                            id="vehicle-model"
                            label="Vehicle Model"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="password"
                            margin="dense"
                            id="pwd"
                            label="Password"
                            type="password"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="confirmPassword"
                            margin="dense"
                            id="confirm-pwd"
                            label="Confirm Password"
                            type="password"
                            onChange={handleChange}
                            fullWidth
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Button onClick={handleClose} color="primary" variant="contained">
                                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#000' }} /> : 'Submit'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
