import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import { useData } from './../../contexts/DataContext'
import { withNamespaces } from 'react-i18next';

function DeleteVehicleFiles({ fileId, setOnHandleDeleteOpen, t }) {
    const [open, setOpen] = React.useState(false);
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const { carImages, setCarImages, setGeneralAlertOptions } = useData()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        setButtonLoading(true)

        axios.delete(`/cars/files/${fileId}`)
            .then(res => {
                if (res.status === 204) {
                    const updatedImages = carImages.filter(x => x._id !== fileId)

                    setCarImages(updatedImages)
                    setOpen(false)
                    setButtonLoading(false)
                    setOnHandleDeleteOpen(true)
                }
            })
            .catch(err => {
                // console.log(err.response)
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
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                {t('DeleteButton')}
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{t('DeleteDocumentFormTitle')}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t('DeleteDocumentFormHint')}
                    </DialogContentText>

                    <form onSubmit={handleSubmit}>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="primary">
                                {t('CancelButton')}
                            </Button>
                            <Button type="submit" variant="contained" color="primary" autoFocus>
                                {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : t('DeleteButton')}
                            </Button>
                        </DialogActions>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    );
}

export default withNamespaces()(DeleteVehicleFiles)
