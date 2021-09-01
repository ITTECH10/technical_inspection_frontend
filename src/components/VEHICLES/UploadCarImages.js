import React, { useEffect, useState } from 'react'
import FloatingButton from '../UI/FloatingButton'
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import Alerts from './../UI/Alerts'
import axios from 'axios'
import { useData } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom'
import { withNamespaces } from 'react-i18next';

const UploadCarImages = ({ t, onHandleAddOpen, setOnHandleAddOpen }) => {
    const { carImages, setCarImages, setLoading } = useData()
    const history = useHistory()
    const fileUploadTimeout = React.useRef()

    const carId = history.location.pathname.split('/')[2]

    const [fields, setFields] = useState({
        photo: '',
    })

    const submitBtn = document.getElementById('imgSubmitBtn')

    useEffect(() => {
        return () => {
            clearTimeout(fileUploadTimeout.current)
        }
    }, [fileUploadTimeout])

    useEffect(() => {
        if (submitBtn && fields.photo !== '') {
            submitBtn.click()
        }
    }, [fields, submitBtn])

    const formData = new FormData()
    formData.append('photo', fields.photo)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return
        setLoading(true)

        axios({
            method: "post",
            url: `/cars/images/${carId}`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
            // console.log(res.data)
            if (res.status === 201) {
                // const updatedVehicles = [...myVehicles]
                // const updatedVehicleIndex = updatedVehicles.findIndex(v => v._id === carId)
                // const updatedVehicle = updatedVehicles[updatedVehicleIndex]
                // updatedVehicle.images = res.data.vehicle.images
                const updatedImages = [...carImages, { ...res.data.newFile }]

                fileUploadTimeout.current = setTimeout(() => {
                    // setMyVehicles(updatedVehicles)
                    setLoading(false)
                    setFields({ photo: '' })
                    setCarImages(updatedImages)
                    setOnHandleAddOpen(true)
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
            <Alerts message={t('AlertGeneralSuccessful')} open={onHandleAddOpen} handleOpening={setOnHandleAddOpen} />
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <input onChange={handleImageChange} name="photo" id="photo" type="file" hidden />
                <Button id="imgSubmitBtn" style={{ position: 'absolute', visibility: 'hidden' }} type="submit" color="primary" variant="contained">
                    Submit
                </Button>
            </form>
        </div >
    )
}

export default withNamespaces()(UploadCarImages)
