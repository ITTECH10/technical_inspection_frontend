import React, {useState} from 'react';
import { useData } from '../../../contexts/DataContext';
import UploadCarData from '../../VEHICLES/UploadCarData';
import CarCard from './../../VEHICLES/CarCard'
import Alerts from './../Alerts'

export default function UsersCarTab() {
    const {myVehicles} = useData()
    const [open, setOpen] = useState(false)

    const cars = myVehicles.map(v => (
        <CarCard handleAlertOpening={setOpen} key={v._id} car={v} />
    ))

    return (
        <>
            {cars}
            <UploadCarData />
            <Alerts message="Successfully deleted!" open={open} handleOpening={setOpen} severity="error" />
        </>
    )
}
