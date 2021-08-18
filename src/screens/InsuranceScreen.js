import React from 'react'
import InsuranceTable from '../components/INSURANCES/InsurancesTable'
import UploadInsuranceData from './../components/INSURANCES/UploadInsuranceData'
import { Typography } from '@material-ui/core'

const InsuranceScreen = () => {
    return (
        <React.Fragment>
            <Typography variant="h4" style={{ padding: 10 }}>
                Insurances
            </Typography>
            <InsuranceTable />
            <UploadInsuranceData />
        </React.Fragment>
    )
}

export default InsuranceScreen
