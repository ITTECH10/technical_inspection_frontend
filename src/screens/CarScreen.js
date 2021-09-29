import React from 'react'
import UploadCarData from '../components/VEHICLES/UploadCarData'
import CarTableAdvanced from '../components/VEHICLES/CarTableAdvanced'
import { useData } from '../contexts/DataContext'
import Loader from '../utils/Loader'
import VehiclesTableAdvanced from './../components/VEHICLES/VehiclesTableAdvanced'
import Box from '@material-ui/core/Box'

const CarScreen = () => {
    const { user, selectedUser, vehiclesPage } = useData()

    const renderVehicles = vehiclesPage === 'allVehicles' && user.role === 'admin' ? (
        <Box>
            <VehiclesTableAdvanced />
        </Box>
    ) : (
        <Box>
            <CarTableAdvanced />
        </Box>
    )

    return (
        user.role === 'admin' ?
            <>
                {renderVehicles}
                {selectedUser && <UploadCarData />}
            </> :
            user.role === 'user' ?
                <>
                    {renderVehicles}
                    <UploadCarData />
                </> : <Loader />
    )
}

export default CarScreen
