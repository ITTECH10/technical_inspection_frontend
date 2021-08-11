import React from 'react'
import UploadCarData from '../components/VEHICLES/UploadCarData'
import CarTable from '../components/VEHICLES/CarTable'
import { useData } from '../contexts/DataContext'

const CarScreen = () => {
    const {user} = useData()
    return (
        <React.Fragment>
            <CarTable />
            {user.role === 'admin' && <UploadCarData />}
        </React.Fragment>
    )
}

export default CarScreen
