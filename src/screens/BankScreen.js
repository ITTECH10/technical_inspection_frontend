import React from 'react'
import BanksTable from '../components/BANKS/BanksTable'
import UploadBankData from './../components/BANKS/UploadBankData'
import { Typography } from '@material-ui/core'

const BankScreen = () => {
    return (
        <React.Fragment>
            <Typography variant="h4" style={{ padding: 10 }}>
                Banken
            </Typography>
            <BanksTable />
            <UploadBankData />
        </React.Fragment>
    )
}

export default BankScreen
