import React, { useState } from 'react'
import { Grid, Typography, Box, TextField, Paper } from '@material-ui/core'
import { useData } from '../../contexts/DataContext'
import BankDialog from './BankDialog'
import { makeStyles } from '@material-ui/core/styles'
import Alerts from '../UI/Alerts'
import { withNamespaces } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    inputTitle: {
        fontSize: 13,
        lineHeight: 0,
        marginTop: 10,
        fontWeight: '600'
    },
    input: {
        marginBottom: 10,
        width: '100%'
    },
}))

const BankGrid = ({ t }) => {
    const { banks, selectedCarBank, user, selectedCar } = useData()
    const selectedBank = banks.find(el => el._id === selectedCar.vehiclePaymentType)
    const classes = useStyles()
    const [alertOpen, setAlertOpen] = useState(false)

    // console.log(selectedCar.vehiclePaymentType.toLowerCase())

    return (
        <>
            <Alerts message={t('AlertSuccessfulConnection')} open={alertOpen} handleOpening={setAlertOpen} />
            <Grid item xs={12}>
                <Typography variant="h5" align="left" style={{ marginBottom: 10 }}>{t('BankDetailsTitle')}</Typography>
                {selectedBank && user.role === 'admin' ?
                    <Paper elevation={3} style={{ padding: 12, marginBottom: 5 }}>
                        <Box>
                            <Typography className={classes.inputTitle}>Name</Typography>
                            <TextField className={classes.input} label={selectedBank && selectedBank.name} disabled />
                        </Box>
                        <Box>
                            <Typography className={classes.inputTitle}>Address</Typography>
                            <TextField className={classes.input} label={selectedBank && `${selectedBank.name}, ${selectedBank.streetAddress} ${selectedBank.numberAddress}, ${selectedBank.postNumber}`} disabled />
                        </Box>
                        <Box>
                            <Typography className={classes.inputTitle}>Phone</Typography>
                            <TextField className={classes.input} label={selectedBank && selectedBank.phoneNumber} disabled />
                        </Box>
                    </Paper> : selectedCarBank._id && user.role === 'user' ?
                        <Box>
                            <Box>
                                <Typography className={classes.inputTitle}>Name</Typography>
                                <TextField className={classes.input} label={selectedCarBank && selectedCarBank.name} disabled />
                            </Box>
                            <Box>
                                <Typography className={classes.inputTitle}>Address</Typography>
                                <TextField className={classes.input} label={selectedCarBank && `${selectedCarBank.name}, ${selectedCarBank.streetAddress} ${selectedCarBank.numberAddress}, ${selectedCarBank.postNumber}`} disabled />
                            </Box>
                            <Box>
                                <Typography className={classes.inputTitle}>Phone</Typography>
                                <TextField className={classes.input} label={selectedCarBank && selectedCarBank.phoneNumber} disabled />
                            </Box>
                        </Box> : selectedCar.vehiclePaymentType && selectedCar.vehiclePaymentType.toLowerCase() === 'cash' ? <Typography variant="h4">
                            Customer payed with cash.
                        </Typography> : <Typography variant="h4">{t('NoBankConnectedYetTitle')}</Typography>}
                {user.role === 'admin' &&
                    <Box style={{ margin: '10px 0' }}>
                        <BankDialog handleAlertOpening={setAlertOpen} />
                    </Box>}
            </Grid>
        </>
    )
}

export default withNamespaces()(BankGrid)
