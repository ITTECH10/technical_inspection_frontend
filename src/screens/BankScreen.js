import React from 'react'
import BanksTable from '../components/BANKS/BanksTable'
import UploadBankData from './../components/BANKS/UploadBankData'
import { Typography } from '@material-ui/core'
import { useData } from '../contexts/DataContext'
import Loader from './../utils/Loader'

const BankScreen = () => {
    const { appLoading, banks } = useData()
    return (
        !appLoading && banks.length > 0 ?
            <React.Fragment>
                <Typography variant="h4" style={{ padding: 10 }}>
                    Banken
                </Typography>
                <BanksTable />
                <UploadBankData />
            </React.Fragment> : <Loader />
    )
}

export default BankScreen
