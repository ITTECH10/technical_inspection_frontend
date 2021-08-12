import React, { useState } from 'react'
import { Grid, Typography, Box, TextField } from '@material-ui/core'
import { useData } from '../../contexts/DataContext'
import BankDialog from './BankDialog'
import { makeStyles } from '@material-ui/core/styles'
import Alerts from '../UI/Alerts'
import { objectIsEmpty } from './../../utils/helpers'

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

const BankGrid = () => {
    const { banks, selectedCarBank, user, selectedCar } = useData()
    const selectedBank = banks.find(el => el._id === selectedCar.vehiclePaymentType)
    const classes = useStyles()
    const [alertOpen, setAlertOpen] = useState(false)

    // console.log(selectedCarBank)

    return (
        <>
            <Alerts message="Bank connected!" open={alertOpen} handleOpening={setAlertOpen} />
            <Grid item xs={12}>
                <Typography variant="h5" align="center" style={{ marginBottom: 15 }}>Bank Details</Typography>
                {selectedBank && user.role === 'admin' ?
                    <Box>
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
                    </Box> : selectedCarBank._id && user.role === 'user' ?
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
                        </Box> : <Typography variant="h4">No bank details yet.</Typography>}
                {user.role === 'admin' &&
                    <Box style={{ margin: '10px 0' }}>
                        <BankDialog handleAlertOpening={setAlertOpen} />
                    </Box>}
            </Grid>
        </>
    )
}

export default BankGrid
