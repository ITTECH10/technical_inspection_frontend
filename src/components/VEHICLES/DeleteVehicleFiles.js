import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios'
import { useData } from './../../contexts/DataContext'

export default function DeleteVehicleFiles({ fileId, onHandleFileDeleteAlert }) {
    const [open, setOpen] = React.useState(false);
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const { carImages, setCarImages } = useData()
    let deleteTimeout

    useEffect(() => {
        return () => {
            clearTimeout(deleteTimeout)
        }
    }, [deleteTimeout])

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

                    deleteTimeout = setTimeout(() => {
                        setCarImages(updatedImages)
                        setOpen(false)
                        setButtonLoading(false)
                        onHandleFileDeleteAlert(true)
                    }, 2000)
                }
            })
            .catch(err => {
                console.log(err.response)
            })
    }

    return (
        <div>
            <Button size="small" variant="contained" color="primary" onClick={handleClickOpen}>
                Delete
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Delete Document?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this document?
                    </DialogContentText>

                    <form onSubmit={handleSubmit}>
                        <DialogActions>
                            <Button onClick={handleClose} variant="contained" color="primary">
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained" color="primary" autoFocus>
                                {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Delete'}
                            </Button>
                        </DialogActions>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    );
}
