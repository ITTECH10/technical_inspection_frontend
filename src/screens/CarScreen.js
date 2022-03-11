import React from 'react'
import UploadCarData from '../components/VEHICLES/UploadCarData'
import CarTableAdvanced from '../components/VEHICLES/CarTableAdvanced'
import { useData } from '../contexts/DataContext'
import Loader from '../utils/Loader'
import VehiclesTableAdvanced from './../components/VEHICLES/VehiclesTableAdvanced'
import Box from '@material-ui/core/Box'
import Page from '../components/Page'

const CarScreen = () => {
    const { user, selectedUser, vehiclesPage } = useData()

    const renderVehicles = vehiclesPage === 'allVehicles' && user.role === 'admin' ? (
        <Page title="SE Carmanagement | Alle Fahrzeuge">
            <Box>
                <VehiclesTableAdvanced />
            </Box>
        </Page>
    ) : (
        <Page title="SE Carmanagement | Alle Fahrzeuge">
            <Box>
                <CarTableAdvanced />
            </Box>
        </Page>
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
