import React from 'react'
import InsuranceTable from '../components/INSURANCES/InsurancesTable'
import UploadInsuranceData from './../components/INSURANCES/UploadInsuranceData'

const InsuranceScreen = () => {
    return (
        <React.Fragment>
            <InsuranceTable />
            <UploadInsuranceData />
        </React.Fragment>
    )
}

export default InsuranceScreen
