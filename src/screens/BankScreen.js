import React from 'react'
import BanksTable from '../components/BANKS/BanksTable'
import UploadBankData from './../components/BANKS/UploadBankData'

const BankScreen = () => {
    return (
        <React.Fragment>
            <BanksTable />
            <UploadBankData />
        </React.Fragment>
    )
}

export default BankScreen
