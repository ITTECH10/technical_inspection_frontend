import React from 'react'
import UploadCarData from '../components/VEHICLES/UploadCarData'
import CarTableAdvanced from '../components/VEHICLES/CarTableAdvanced'
import { useData } from '../contexts/DataContext'
import Loader from '../utils/Loader'
// import UserInfoBlock from '../components/UI/Users/UserInfoBlock'
import VehiclesTableAdvanced from './../components/VEHICLES/VehiclesTableAdvanced'
import { useHistory } from 'react-router-dom'
import Box from '@material-ui/core/Box'

const CarScreen = () => {
    const { user, selectedUser, vehiclesPage } = useData()
    const history = useHistory()

    React.useEffect(() => {
        let privacyPageTimeout

        if (user && !user.policiesAccepted) {
            privacyPageTimeout = setTimeout(() => {
                history.push('/privacyPolicy')
                history.go(0)
            }, 2000)
        }

        return () => {
            clearTimeout(privacyPageTimeout)
        }
    }, [history, user])

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
                </> : <Loader />
    )
}

export default CarScreen
