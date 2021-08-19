import React from 'react'
import InsuranceTable from '../components/INSURANCES/InsurancesTable'
import UploadInsuranceData from './../components/INSURANCES/UploadInsuranceData'
import { Typography } from '@material-ui/core'
import { useData } from '../contexts/DataContext'
import Loader from './../utils/Loader'

const InsuranceScreen = () => {
    const { appLoading, insurances } = useData()
    return (
        !appLoading && insurances.length > 0 ?
            <React.Fragment>
                <Typography variant="h4" style={{ padding: 10 }}>
                    Insurances
                </Typography>
                <InsuranceTable />
                <UploadInsuranceData />
            </React.Fragment> : <Loader />
    )
}

export default InsuranceScreen
