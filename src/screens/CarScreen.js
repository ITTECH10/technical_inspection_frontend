import React from 'react'
import UploadCarData from '../components/VEHICLES/UploadCarData'
import CarTable from '../components/VEHICLES/CarTable'
import { useData } from '../contexts/DataContext'
import Loader from '../utils/Loader'
// import UserInfoBlock from '../components/UI/Users/UserInfoBlock'
import VehiclesTable from './../components/VEHICLES/VehiclesTable'
import { useHistory } from 'react-router-dom'

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
        <>
            <VehiclesTable />
        </>
    ) : <CarTable />

    return (
        !appLoading && user.role === 'admin' ?
            <>
                {renderVehicles}
                {selectedUser._id && <UploadCarData />}
            </> :
            !appLoading && user.role === 'user' ?
                <>
                    {renderVehicles}
                </> : <Loader />
    )
}

export default CarScreen
