import React from 'react'
import { useData } from '../../contexts/DataContext'
import UploadBankData from './../BANKS/UploadBankData'
import BanksTable from './BanksTable'

const BanksTab = () => {
    const {user} = useData()
    return (
        <div>
            <BanksTable />
            {user.role === 'admin' && <UploadBankData />}
        </div> 
    )
}

export default BanksTab
