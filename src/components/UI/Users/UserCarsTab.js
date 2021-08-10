import React, {useState} from 'react';
import { useData } from '../../../contexts/DataContext';
import UploadCarData from '../../VEHICLES/UploadCarData';
import Alerts from './../Alerts'
import CarTable from '../../VEHICLES/CarTable';

export default function UsersCarTab() {
    const {user} = useData()
    const [open, setOpen] = useState(false)

    return (
        <>
            <CarTable />
            {user.role === 'admin' && <UploadCarData />}
            <Alerts message="Successfully deleted!" open={open} handleOpening={setOpen} severity="error" />
        </>
    )
}
