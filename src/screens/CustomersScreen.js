import React, { useState } from 'react'
import NewUserCreation from '../components/UI/NewUserCreation'
import Alerts from '../components/UI/Alerts'
import { withNamespaces } from 'react-i18next'
import CustomersTableAdvanced from '../components/UI/Users/CustomersTableAdvanced'
import { Box } from '@material-ui/core'
import Page from '../components/Page'

const CustomersScreen = ({ t }) => {
    const [open, setOpen] = useState(false)

    return (
        <Page title="SE Carmanagement | Kundenbereich">
            <Box>
                <CustomersTableAdvanced />
                <NewUserCreation handleAlertOpening={setOpen} />
                <Alerts open={open} handleOpening={setOpen} message={t('AlertGeneralSuccessful')} />
            </Box>
        </Page>
    )
}

export default withNamespaces()(CustomersScreen)
