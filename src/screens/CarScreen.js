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
    const { user, selectedUser, loading } = useData()
    const history = useHistory()

    let renderVehiclesState

    if (history.location.state) {
        renderVehiclesState = history.location.state
    }

    return (
        // !loading ?
        //     <React.Fragment>
        //         <UserInfoBlock />
        //         {selectedUser._id && user.role === 'admin' ? <CarTable /> : user.role === 'user' ? <CarTable /> : <Typography variant="h4">No customer selected.</Typography>}
        // {user.role === 'admin' && selectedUser._id && <UploadCarData />}
        //     </React.Fragment> : <Loader />
        <>
            {renderVehiclesState !== 'allVehicles' ? <CarTable /> : <VehiclesTable />}
            {user.role === 'admin' && selectedUser._id && <UploadCarData />}
        </>

    )
}

export default CarScreen
