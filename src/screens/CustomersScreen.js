import React from 'react'
import { useData } from './../contexts/DataContext'
import NewUserCreation from '../components/UI/NewUserCreation'
import { withNamespaces } from 'react-i18next'
import CustomersTableAdvanced from '../components/UI/Users/CustomersTableAdvanced'
import { Box } from '@material-ui/core'
import Page from '../components/Page'

const CustomersScreen = ({ t }) => {
    const { setDashboardAdaptiveTitle } = useData()

    React.useEffect(() => {
        setDashboardAdaptiveTitle('Alle Fahrzeuge')
    }, [setDashboardAdaptiveTitle])

    return (
        <Page title="SE Carmanagement | Kundenbereich">
            <Box>
                <CustomersTableAdvanced />
                <NewUserCreation />
            </Box>
        </Page>
    )
}

export default withNamespaces()(CustomersScreen)
