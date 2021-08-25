import React from 'react'
import InsuranceTable from '../components/INSURANCES/InsurancesTable'
import UploadInsuranceData from './../components/INSURANCES/UploadInsuranceData'
import { Typography, Divider } from '@material-ui/core'
import { useData } from '../contexts/DataContext'
import Loader from './../utils/Loader'
import { withNamespaces } from 'react-i18next'

const InsuranceScreen = ({ t }) => {
    const { appLoading, insurances } = useData()
    return (
        !appLoading && insurances.length > 0 ?
            <React.Fragment>
                <Typography variant="h4" style={{ padding: '10px 0' }}>
                    {t('InsurancesTitle')}
                </Typography>
                <Divider style={{ marginBottom: 10 }} />

                <InsuranceTable />
                <UploadInsuranceData />
            </React.Fragment> : <Loader />
    )
}

export default withNamespaces()(InsuranceScreen)
