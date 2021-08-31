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
    const { user, selectedUser, appLoading, vehiclesPage } = useData()
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
    }, [])

    const renderVehicles = vehiclesPage === 'allVehicles' && user.role === 'admin' ? (
        <Box style={{ position: 'relative', margin: '10px 0', marginRight: 60 }}>
            <VehiclesTableAdvanced />
        </Box>
    ) : (
        <Box style={{ position: 'relative', margin: '10px 0', marginRight: 60 }}>
            <CarTableAdvanced />
        </Box>
    )

    return (
        user.role === 'admin' ?
            <>
                {renderVehicles}
                {selectedUser._id && <UploadCarData />}
            </> :
            user.role === 'user' ?
                <>
                    {renderVehicles}
                </> : <Loader />
    )
}

export default CarScreen
