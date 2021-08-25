import React from 'react'
import BanksTable from '../components/BANKS/BanksTable'
import UploadBankData from './../components/BANKS/UploadBankData'
import { Typography, Divider } from '@material-ui/core'
import { useData } from '../contexts/DataContext'
import Loader from './../utils/Loader'
import { withNamespaces } from 'react-i18next'

const BankScreen = ({ t }) => {
    const { appLoading, banks } = useData()
    return (
        !appLoading && banks.length > 0 ?
            <React.Fragment>
                <Typography variant="h4" style={{ padding: '10px 0' }}>
                    {t('BanksTitle')}
                </Typography>
                <Divider style={{ marginBottom: 10 }} />

                <BanksTable />
                <UploadBankData />
            </React.Fragment> : <Loader />
    )
}

export default withNamespaces()(BankScreen)
