import React, { useState } from 'react'
import FloatingButton from '../UI/FloatingButton'
import AddIcon from '@material-ui/icons/Add';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress } from '@material-ui/core';
import Alerts from './../UI/Alerts'
import axios from 'axios'
import { useData } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom'

const UploadCarImages = () => {
    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const { myVehicles, setMyVehicles } = useData()
    const history = useHistory()

    const carId = history.location.pathname.split('/')[2]

    const [fields, setFields] = useState({
        photo: '',
    })

    const formData = new FormData()
    formData.append('photo', fields.photo)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return

        setBtnLoading(true)

        axios({
            method: "post",
            url: `/cars/upload/${carId}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            // console.log(res.data)        
            if (res.status === 201) {
                const updatedVehicles = [...myVehicles]
                const updatedVehicleIndex = updatedVehicles.findIndex(v => v._id === carId)
                const updatedVehicle = updatedVehicles[updatedVehicleIndex]
                updatedVehicle.image = res.data.updatedVehicle.image

                setTimeout(() => {
                    setMyVehicles(updatedVehicles)
                    setAlertOpen(true)
                    setBtnLoading(false)
                    setOpen(false)
                }, 2000)
            }
        })
            .catch(err => {
                console.log(err.response)
            })

    }

    const handleImageClick = () => {
        const file = document.getElementById('photo')
        file.click()
    }

    const handleImageChange = (e) => {
        const photo = e.target.files[0]
        setFields({
            ...fields,
            photo
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
            <FloatingButton onHandleClick={handleClickOpen}>
                <AddIcon />
            </FloatingButton>
            <Alerts message="Photo updated successfuly!" open={alertOpen} handleOpening={setAlertOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Photos</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To upload vehicle photos, simply click the button bellow.
                    </DialogContentText>
                    <form encType="multipart/form-data" onSubmit={handleSubmit}>
                        <input onChange={handleImageChange} name="photo" id="photo" type="file" hidden />
                        <Button variant="contained" color="primary" size="small" onClick={handleImageClick} >Add Photo/s</Button>
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
        </div >
    )
}

export default UploadCarImages
