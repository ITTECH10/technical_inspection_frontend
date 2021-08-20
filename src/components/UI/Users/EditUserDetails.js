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
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles(theme => ({
    textField: {
        marginTop: theme.spacing(1),
        // marginBottom: theme.spacing(1),
        width: '100%'
    },
    btnRoot: {
        fontSize: 9,
        [theme.breakpoints.up('sm')]: {
            fontSize: '0.8125rem',
        }
    }
}))

function EditUserDetails({ userId, t }) {
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const { setSelectedUser, users, setUsers, setUser, user, selectedUser } = useData()
    const classes = useStyles()

    if (user.role === 'user') {
        userId = user._id
    }

    const [fields, setFields] = useState({
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
        address: selectedUser.address,
        birthDate: selectedUser.birthDate
    })

    React.useEffect(() => {
        setFields({
            firstName: selectedUser.firstName,
            lastName: selectedUser.lastName,
            email: selectedUser.email,
            phoneNumber: selectedUser.phoneNumber,
            address: selectedUser.address,
            birthDate: selectedUser.birthDate
        })
    }, [selectedUser])

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
        <div style={{ marginRight: 10 }}>
            <Button className={classes.btnRoot} size="small" variant="contained" color="secondary" onClick={handleClickOpen}>
                {t('EditCustomersButton')}
                <EditIcon style={{ height: '.8em' }} />
            </Button>
            <Alerts message={t('AlertGeneralUpdated')} open={alertOpen} handleOpening={setAlertOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('EditCustomerFormTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('EditCustomerFormHint')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="firstName"
                            autoFocus
                            margin="dense"
                            value={fields.firstName}
                            id="first-name"
                            label={t('FirstNameInputLabel')}
                            onChange={handleChange}
                            type="text"
                            fullWidth
                        />
                        <TextField
                            name="lastName"
                            margin="dense"
                            value={fields.lastName}
                            id="last-name"
                            label={t('LastNameInputLabel')}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="email"
                            margin="dense"
                            value={fields.email}
                            id="mail"
                            label={t('EmailInputLabel')}
                            type="email"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="phoneNumber"
                            margin="dense"
                            value={fields.phoneNumber}
                            id="phone-number"
                            label={t('PhoneNumberInputLabel')}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="address"
                            margin="dense"
                            value={fields.address}
                            id="address-edit"
                            label={t('AdressInputLabel')}
                            type="text"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="birthDate"
                            id="birthDate-edit"
                            label={t('BirthDateInputLabel')}
                            value={fields.birthDate ? new Date(fields.birthDate).toISOString().split('T')[0] : '1970/12/31'}
                            onChange={handleChange}
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <DialogActions>
                            <Button onClick={handleClose} color="secondary" variant="contained">
                                {t('CancelButton')}
                            </Button>
                            <Button type="submit" color="primary" variant="contained">
                                {btnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(EditUserDetails)
