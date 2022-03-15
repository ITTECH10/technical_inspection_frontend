import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { useData } from '../../contexts/DataContext';
import { withNamespaces } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import Alerts from './../UI/Alerts'

const useStyles = makeStyles(theme => ({

}))

function ConfirmUserSellingCarDialog({ t }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const { user, setSelectedCar, selectedCar, setGeneralAlertOptions } = useData()
    const [cancelBtnLoading, setCancelBtnLoading] = React.useState(false)
    const [submitBtnLoading, setSubmitBtnLoading] = React.useState(false)
    const [adminNotifiedAlert, setAdminNotifiedAlert] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAcceptSubmit = (e) => {
        e.preventDefault()
        setSubmitBtnLoading(true)

        axios.get(`/cars/selling/${selectedCar._id}`)
            .then(res => {
                if (res.status === 200) {
                    setSelectedCar(res.data.pickedVehicle)
                    setSubmitBtnLoading(false)
                    setAdminNotifiedAlert(true)
                    setOpen(false)
                }
            }).catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }

    const declineCarSellingHandler = () => {
        setCancelBtnLoading(true)

        axios.put(`/cars/selling/unmark/${selectedCar._id}`)
            .then(res => {
                if (res.status === 200) {
                    setCancelBtnLoading(false)
                    setSelectedCar(res.data.pickedVehicle)
                }
            }).catch(err => {
                // console.log(err.response)
            })
    }

    return (
        user.role === 'user' &&
        <div>
            <Alerts message={t('UserAdminEmailSentCarSelling')} open={adminNotifiedAlert} handleOpening={setAdminNotifiedAlert} />
            <Tooltip title={selectedCar.adminNotifiedAboutCarSelling ? t('AdminHasBeenNotifiedAboutCarSelling') : t('SellCarDashboardBtn')}>
                <IconButton className={classes.btnRoot} size="small" color="primary" variant="contained" onClick={handleClickOpen}>
                    <NotificationImportantIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('SellCarDashboardBtn')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('UserConfirmCarSelling')}
                    </DialogContentText>
                    <form onSubmit={handleAcceptSubmit}>
                        <DialogActions>
                            <Button onClick={declineCarSellingHandler} color="primary" variant="contained">
                                {cancelBtnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('UserAbortSellingCarBtn')}
                            </Button>
                            <Button disabled={selectedCar.adminNotifiedAboutCarSelling} type="submit" color="secondary" variant="contained">
                                {submitBtnLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('SubmitButton')}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(ConfirmUserSellingCarDialog)