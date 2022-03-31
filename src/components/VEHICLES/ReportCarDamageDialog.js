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
import { makeStyles } from '@material-ui/core'
import { yellow } from '@material-ui/core/colors'
import { useData } from '../../contexts/DataContext';
import axios from 'axios'
import Alerts from './../UI/Alerts'

const useStyles = makeStyles(theme => ({
    btnWarning: {
        color: yellow[700]
    },
}))

function ReportCarDamageDialog({ t }) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [btnLoading, setBtnLoading] = React.useState(false)
    const [adminNotifiedAlert, setAdminNotifiedAlert] = React.useState(false)
    const { myVehicles, setGeneralAlertOptions } = useData()

    const [fields, setFields] = React.useState({
        damagedVehicle: myVehicles.length > 0 ? myVehicles[0]._id : '',
        damageDescription: ''
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setBtnLoading(true)

        const { damagedVehicle, damageDescription } = fields

        axios.post(`/cars/damage/${damagedVehicle}`, { damageDescription })
            .then(res => {
                if (res.status === 201) {
                    setOpen(false)
                    setBtnLoading(false)
                    setAdminNotifiedAlert(true)
                }
            }).catch(err => {
                // console.log(err)
                setBtnLoading(false)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }

    return (
        <div>
            <Alerts message={t('UserAdminEmailSentCarSelling')} open={adminNotifiedAlert} handleOpening={setAdminNotifiedAlert} />
            <Button disabled={myVehicles.length === 0} size="small" variant="text" style={{ marginTop: 20 }} className={classes.btnWarning} onClick={handleClickOpen}>
                {t('UserDashboardReportDamage')}
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{t('UserDashboardReportDamage')}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {t('UserDashboardReportDamageHint')}
                    </DialogContentText>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            name="damagedVehicle"
                            id="report-damage-user-dashboard"
                            select
                            onChange={handleChange}
                            fullWidth
                            required
                            value={fields.damagedVehicle}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {myVehicles.map((option, idx) => {
                                return <option key={option._id} value={option._id}>
                                    {option.mark} {option.model}
                                </option>
                            })}
                        </TextField>
                        <TextField
                            name="damageDescription"
                            id="report-damage-description-user-dashboard"
                            fullWidth
                            required
                            onChange={handleChange}
                            multiline
                            rows={3}
                            label={t('DamagedCarDescription')}
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

export default withNamespaces()(ReportCarDamageDialog)