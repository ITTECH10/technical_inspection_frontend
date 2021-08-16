import React, { useEffect, useState } from 'react'
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
    const { myVehicles, setMyVehicles, carImages, setCarImages } = useData()
    const history = useHistory()

    const carId = history.location.pathname.split('/')[2]

    const [fields, setFields] = useState({
        photo: '',
    })

    const submitBtn = document.getElementById('imgSubmitBtn')

    useEffect(() => {
        if (submitBtn && fields.photo !== '') {
            submitBtn.click()
        }
    }, [fields])

    const formData = new FormData()
    formData.append('photo', fields.photo)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return

        console.log('submiting...')
        setBtnLoading(true)

        axios({
            method: "post",
            url: `/cars/images/${carId}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            console.log(res.data)
            if (res.status === 201) {
                // const updatedVehicles = [...myVehicles]
                // const updatedVehicleIndex = updatedVehicles.findIndex(v => v._id === carId)
                // const updatedVehicle = updatedVehicles[updatedVehicleIndex]
                // updatedVehicle.images = res.data.vehicle.images
                const updatedImages = [...carImages, { ...res.data.newFile }]

                setTimeout(() => {
                    // setMyVehicles(updatedVehicles)
                    setCarImages(updatedImages)
                    setAlertOpen(true)
                    setBtnLoading(false)
                    setOpen(false)
                }, 2000)
            }
        })
            .catch(err => {
                // console.log(err.response)
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

    return (
        <div>
            <FloatingButton onHandleClick={handleImageClick}>
                <AddIcon />
            </FloatingButton>
            <Alerts message="Photo added successfuly!" open={alertOpen} handleOpening={setAlertOpen} />
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input onChange={handleImageChange} name="photo" id="photo" type="file" hidden />
                <Button id="imgSubmitBtn" style={{ position: 'absolute', visibility: 'hidden' }} type="submit" color="primary" variant="contained">
                    Submit
                </Button>
            </form>
        </div >
    )
}

export default UploadCarImages
