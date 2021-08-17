import React from 'react';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import Alerts from '../Alerts';
import { CircularProgress } from '@material-ui/core';

export default function FormDialog({ onDisableLoginForm }) {
    const [open, setOpen] = React.useState(false);
    const [buttonLoading, setButtonLoading] = React.useState()
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [fields, setFields] = React.useState({
        emailForgot: ''
    })

    const handleClickOpen = () => {
        setOpen(true);
        onDisableLoginForm(true)
    };

    const handleClose = () => {
        setOpen(false);
        onDisableLoginForm(false)
    };

    const handleChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return

        setButtonLoading(true)

        const data = { email: fields.emailForgot }
        axios.post('/users/forgotPassword', data).then(res => {
            if (res.data.message === 'success') {
                setTimeout(() => {
                    setOpen(false)
                    setAlertOpen(true)
                    setButtonLoading(false)
                    onDisableLoginForm(false)
                }, 2000)
            }
        })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div>
            <Link onClick={handleClickOpen} style={{ textAlign: 'center', width: '100%', display: 'inline-block', marginTop: 5, cursor: 'pointer' }}>
                Forgot your password?
            </Link>
            <Alerts message="Please check your email!" open={alertOpen} handleOpening={setAlertOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Forgot your password?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To proceed reseting your password,
                        please enter the email associated with your account.
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            name="emailForgot"
                            margin="dense"
                            id="emailForgot"
                            label="E-mail"
                            type="email"
                            onChange={handleChange}
                            fullWidth
                        />

                        <DialogActions>
                            <Button onClick={handleClose} color="primary" variant="contained">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Continue'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
