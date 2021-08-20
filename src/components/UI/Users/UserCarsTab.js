import React, { useState } from 'react';
import { useData } from '../../../contexts/DataContext';
import UploadCarData from '../../VEHICLES/UploadCarData';
import Alerts from './../Alerts'
import CarTable from '../../VEHICLES/CarTable';
import { withNamespaces } from 'react-i18next';

function UsersCarTab({ onHandleCarNavigation, t }) {
    const { user } = useData()
    const [open, setOpen] = useState(false)

    return (
        <>
            <CarTable onHandleCarNavigation={onHandleCarNavigation} />
            {user.role === 'admin' && <UploadCarData />}
            <Alerts message={t('AlertGeneralDeleted')} open={open} handleOpening={setOpen} severity="error" />
        </>
    )
}

export default withNamespaces(UsersCarTab)
