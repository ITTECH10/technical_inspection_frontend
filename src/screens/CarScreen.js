import React from 'react'
import UploadCarData from '../components/VEHICLES/UploadCarData'
import CarTable from '../components/VEHICLES/CarTable'

const CarScreen = () => {
    return (
        <React.Fragment>
            <CarTable />
            <UploadCarData />
        </React.Fragment>
    )
}

export default CarScreen
