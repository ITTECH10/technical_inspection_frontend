import React from 'react';
import { useData } from '../../../contexts/DataContext';
import UploadCarData from '../../VEHICLES/UploadCarData';
import CarCard from './../../VEHICLES/CarCard'

export default function UsersCarTab() {
    const {myVehicles, user} = useData()

    const cars = myVehicles.map(v => (
        <CarCard key={v._id} car={v} />
    ))

    return (
        <>
            {cars}
            <UploadCarData />
        </>
    )
}
