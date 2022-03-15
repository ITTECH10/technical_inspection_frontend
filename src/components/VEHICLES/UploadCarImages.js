import React, { useEffect, useState } from 'react'
import FloatingButton from '../UI/FloatingButton'
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import Alerts from './../UI/Alerts'
import axios from 'axios'
import { useData } from '../../contexts/DataContext';
import { useHistory } from 'react-router-dom'
import { withNamespaces } from 'react-i18next';
import DocumentUploadModal from './DocumentUploadModal';

const UploadCarImages = ({ t, onHandleAddOpen, setOnHandleAddOpen }) => {
    const [portalOpen, setPortalOpen] = useState(false)
    const { carImages, setCarImages, setLoading, setGeneralAlertOptions } = useData()
    const history = useHistory()

    const carId = history.location.pathname.split('/')[2]

    const [fields, setFields] = useState({
        photo: '',
        fileName: '',
        fileCategory: 'DOCUMENT_TYPE_FAHRZEUGSCHEIN'
    })

    const submitBtn = document.getElementById('imgSubmitBtn')

    useEffect(() => {
        if (submitBtn && fields.photo !== '') {
            setPortalOpen(true)
        }
    }, [fields, submitBtn])

    const formData = new FormData()
    formData.append('photo', fields.photo)
    formData.append('photoName', fields.fileName)
    formData.append('fileCategory', fields.fileCategory)

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
            if (res.status === 201) {
                const updatedImages = [...carImages, { ...res.data.newFile }]
                setLoading(false)
                setFields({ photo: '' })
                setCarImages(updatedImages)
                setOnHandleAddOpen(true)
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

    return (
        <div>
            <DocumentUploadModal
                open={portalOpen}
                setOpen={setPortalOpen}
                handleChange={handleChange}
                onHandleSubmit={submitBtn}
                fields={fields}
            />
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
