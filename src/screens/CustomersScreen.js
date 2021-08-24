import React, { useState } from 'react'
import NewUserCreation from '../components/UI/NewUserCreation'
import Alerts from '../components/UI/Alerts'
import { withNamespaces } from 'react-i18next'
import CustomersTable from '../components/UI/Users/CustomersTable'

const CustomersScreen = ({ t }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            <CustomersTable />
            <NewUserCreation handleAlertOpening={setOpen} />
            <Alerts open={open} handleOpening={setOpen} message={t('AlertGeneralSuccessful')} />
        </>
    )
}

export default withNamespaces()(CustomersScreen)
