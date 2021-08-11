import React from 'react'
import { useData } from '../../contexts/DataContext'
import UploadInsuranceData from './../INSURANCES/UploadInsuranceData'
import InsuranceTable from './InsurancesTable'

const InsurancesTab = () => {
    const {user} = useData()
    return (
        <div>
            <InsuranceTable />
            {user.role === 'admin' && <UploadInsuranceData />}
        </div> 
    )
}

export default InsurancesTab
