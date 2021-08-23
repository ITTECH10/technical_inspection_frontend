import React, { useState } from 'react'
// import UsersList from '../components/UI/Users/UsersList'
import NewUserCreation from '../components/UI/NewUserCreation'
import Alerts from '../components/UI/Alerts'
// import SearchCustomers from '../components/UI/Users/SearchCustomers'
import { withNamespaces } from 'react-i18next'
import CustomersTable from '../components/UI/Users/CustomersTable'
import { Typography } from '@material-ui/core'

const CustomersScreen = ({ t }) => {
    const [open, setOpen] = useState(false)
    return (
        <>
            {/* <UsersList /> */}
            {/* <SearchCustomers /> */}
            <CustomersTable />
            <NewUserCreation handleAlertOpening={setOpen} />
            <Alerts open={open} handleOpening={setOpen} message={t('AlertGeneralSuccessful')} />
        </>
    )
}

export default withNamespaces()(CustomersScreen)
