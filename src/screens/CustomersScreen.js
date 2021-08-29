import React, { useState } from 'react'
import NewUserCreation from '../components/UI/NewUserCreation'
import Alerts from '../components/UI/Alerts'
import { withNamespaces } from 'react-i18next'
import CustomersTable from '../components/UI/Users/CustomersTable'
import { Box } from '@material-ui/core'
import { useData } from '../contexts/DataContext'

const CustomersScreen = ({ t }) => {
    const [open, setOpen] = useState(false)
    const { authenticated } = useData()

    return (
        <Box style={{ position: 'relative' }}>
            <CustomersTable />
            <NewUserCreation handleAlertOpening={setOpen} />
            <Alerts open={open} handleOpening={setOpen} message={t('AlertGeneralSuccessful')} />
        </Box>
    )
}

export default withNamespaces()(CustomersScreen)
