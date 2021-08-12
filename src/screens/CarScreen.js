import React from 'react'
import UploadCarData from '../components/VEHICLES/UploadCarData'
import CarTable from '../components/VEHICLES/CarTable'
import { useData } from '../contexts/DataContext'
import { Typography } from '@material-ui/core'
import Loader from '../utils/Loader'

const CarScreen = () => {
    const { user, selectedUser, loading } = useData()
    return (
        !loading ?
            <React.Fragment>
                {selectedUser._id && user.role === 'admin' ? <CarTable /> : <Typography variant="h4">No customer selected.</Typography>}
                {user.role === 'admin' && <UploadCarData />}
            </React.Fragment> : <Loader />
    )
}

export default CarScreen
