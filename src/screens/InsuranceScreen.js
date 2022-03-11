import React from 'react'
import InsuranceTable from '../components/INSURANCES/InsurancesTable'
import UploadInsuranceData from './../components/INSURANCES/UploadInsuranceData'
import { Typography, Divider } from '@material-ui/core'
import { useData } from '../contexts/DataContext'
import Loader from './../utils/Loader'
import { withNamespaces } from 'react-i18next'
import Page from '../components/Page'

const InsuranceScreen = ({ t }) => {
    const { appLoading, insurances } = useData()
    return (
        !appLoading && insurances.length > 0 ?
            <Page title="SE Carmanagement | Versicherungen">
                <Typography variant="h4" style={{ padding: '10px 0' }}>
                    {t('InsurancesTitle')}
                </Typography>
                <Divider style={{ marginBottom: 10 }} />

                <InsuranceTable />
                <UploadInsuranceData />
            </Page> : <Loader />
    )
}

export default withNamespaces()(InsuranceScreen)
