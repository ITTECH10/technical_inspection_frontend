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
import axios from 'axios'
import { useData } from './../../../contexts/DataContext'
import Alerts from '../Alerts';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1),
        width: '100%'
    },
}))

export default function EditUserDetails({ userId }) {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const { setSelectedUser, users, setUsers, setUser, user } = useData()
    const classes = useStyles()

    if (user.role === 'user') {
        userId = user._id
    }

    const [fields, setFields] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        birthDate: ''
    })

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return

        setBtnLoading(true)

        const data = { ...fields }

        axios.patch(`/users/${userId}`, data).then(res => {
            // console.log(res.data)
            if (res.status === 202) {
                if (user.role === 'admin') {
                    setSelectedUser(res.data.user)
                    const copyUsers = [...users]
                    const foundUserIndex = copyUsers.findIndex(u => u._id === userId)
                    const foundUser = copyUsers[foundUserIndex]
                    foundUser.email = res.data.user.email

                    setUsers(copyUsers)
                }

                if (user.role === 'user') {
                    setUser(res.data.user)
                }

                setTimeout(() => {
                    setAlertOpen(true)
                    setBtnLoading(false)
                    setOpen(false)
                }, 2000)
            }
        })
            .catch(err => {
                setBtnLoading(false)
                console.log(err.response)
            })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ margin: '8px 0' }}>
            <Button size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
                Edit Customer
                <EditIcon style={{ height: '.8em' }} />
            </Button>
            <Alerts message="Successfully updated!" open={alertOpen} handleOpening={setAlertOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit User Information</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To edit user information, simply fill the fields you want to change.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="firstName"
                            autoFocus
                            margin="dense"
                            id="first-name"
                            label="First name"
                            onChange={handleChange}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="lastName"
                            margin="dense"
                            id="last-name"
                            label="Last name"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="email"
                            margin="dense"
                            id="mail"
                            label="E-mail"
                            type="email"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="phoneNumber"
                            margin="dense"
                            id="phone-number"
                            label="Phone number"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="address"
                            margin="dense"
                            id="address-edit"
                            label="Address"
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="birthDate"
                            id="birthDate-edit"
                            label="Birth Date"
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary" variant="contained">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Submit'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
