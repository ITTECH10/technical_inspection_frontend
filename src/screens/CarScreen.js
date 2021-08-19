import React from 'react'
import UploadCarData from '../components/VEHICLES/UploadCarData'
import CarTable from '../components/VEHICLES/CarTable'
import { useData } from '../contexts/DataContext'
import { Typography } from '@material-ui/core'
import Loader from '../utils/Loader'
import UserInfoBlock from '../components/UI/Users/UserInfoBlock'
import VehiclesTable from './../components/VEHICLES/VehiclesTable'
import { useHistory } from 'react-router-dom'

const CarScreen = () => {
    const { user, selectedUser, appLoading, vehiclesPage, vehicles, myVehicles } = useData()
    const history = useHistory()
    let privacyPageTimeout

    React.useEffect(() => {
        if (user && !user.policiesAccepted) {
            privacyPageTimeout = setTimeout(() => {
                history.push('/privacyPolicy')
                history.go(0)
            }, 2000)
        }
    }, [])

    React.useEffect(() => {
        return () => {
            clearTimeout(privacyPageTimeout)
        }
    }, [])


    const renderVehicles = vehiclesPage !== 'allVehicles' ? (
        <>
            <UserInfoBlock />
            <CarTable />
        </>
    ) : <VehiclesTable />

    return (
        !appLoading && user.role === 'admin' ?
            <>
                {renderVehicles}
                {selectedUser._id && <UploadCarData />}
            </> :
            !appLoading && user.role === 'user' ?
                <>
                    {renderVehicles}
                    {selectedUser._id && <UploadCarData />}
                </> : <Loader />
    )
}

export default CarScreen
