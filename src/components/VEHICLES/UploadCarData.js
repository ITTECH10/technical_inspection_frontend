import React, { useState } from 'react'
import FloatingButton from '../UI/FloatingButton'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import {makeStyles} from '@material-ui/core/styles'
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, CircularProgress } from '@material-ui/core';
import Alerts from './../UI/Alerts'
import axios from 'axios'
import { useData } from '../../contexts/DataContext';
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      width: '100%'
    },
  }));

const UploadCarData = () => {
    const [open, setOpen] = useState(false)
    const [alertOpen, setAlertOpen] = useState(false)
    const [btnLoading, setBtnLoading] = useState(false)
    const {selectedUser, myVehicles, setMyVehicles, user} = useData()
    const history = useHistory()
    const classes = useStyles()

    const [fields, setFields] = useState({
        photo: '',
        model: '',
        modelDetails: '',
        lastTechnicalInspection: ''
    })

    const formData = new FormData()

    formData.append('photo', fields.photo)
    formData.append('model', fields.model)
    formData.append('modelDetails', fields.modelDetails)
    formData.append('lastTechnicalInspection', fields.lastTechnicalInspection)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return

        setBtnLoading(true)

        axios({
            method: "post",
            url: `/cars/${selectedUser._id}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            // console.log(res.data)
            if(res.status === 201) {
                // DO LATER
                const updatedVehicles = [...myVehicles, {...res.data.newVehicle}]

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
            <FloatingButton onHandleClick={handleClickOpen}>
                <DriveEtaIcon />
            </FloatingButton>
            <Alerts message="New vehicle added!" open={alertOpen} handleOpening={setAlertOpen} />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add user vehicles</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add user vehicles, simply fill the fields bellow.
                    </DialogContentText>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input name="photo" onChange={handleImageChange} id="photo" type="file" hidden />
                        <Button variant="contained" color="primary" size="small" onClick={handleImageClick} >Add Photo/s</Button>
                        <TextField
                            name="model"
                            autoFocus
                            margin="dense"
                            id="model"
                            label="Model"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="modelDetails"
                            margin="dense"
                            id="modelDetails"
                            label="Details"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="lastTechnicalInspection"
                            id="lastTechnicalInspection"
                            label="Last technical inspection"
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
        </div >
    )
}

export default UploadCarData
