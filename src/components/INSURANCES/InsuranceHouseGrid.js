import React, { useState } from 'react'
import { useData } from '../../contexts/DataContext'
import { Grid, Typography, Box, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import InsuranceDialog from './InsuranceDialog'
import Alerts from '../UI/Alerts'
// import { objectIsEmpty } from './../../utils/helpers'

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

const InsuranceHouseGrid = () => {
    const classes = useStyles()
    const { insurances, user, selectedCar, selectedCarInsurance } = useData()
    const selectedInsurance = insurances.find(el => el._id === selectedCar.insuranceHouse)
    const [alertOpen, setAlertOpen] = useState(false)

    return (
        <>
            <Alerts message="Insurance connected!" open={alertOpen} handleOpening={setAlertOpen} />
            <Grid item xs={12}>
                <Typography variant="h5" align="center" style={{ marginBottom: 15 }}>Insurance Details</Typography>
                {selectedInsurance && user.role === 'admin' ?
                    <Box>
                        <Box>
                            <Typography className={classes.inputTitle}>Name</Typography>
                            <TextField className={classes.input} label={selectedInsurance && selectedInsurance.name} disabled />
                        </Box>
                        <Box>
                            <Typography className={classes.inputTitle}>Address</Typography>
                            <TextField className={classes.input} label={selectedInsurance && `${selectedInsurance.name}, ${selectedInsurance.streetAddress} ${selectedInsurance.numberAddress}, ${selectedInsurance.postNumber}`} disabled />
                        </Box>
                        <Box>
                            <Typography className={classes.inputTitle}>Phone</Typography>
                            <TextField className={classes.input} label={selectedInsurance && selectedInsurance.phoneNumber} disabled />
                        </Box>
                    </Box> : selectedCarInsurance._id && user.role === 'user' ?
                        <Box>
                            <Box>
                                <Typography className={classes.inputTitle}>Name</Typography>
                                <TextField className={classes.input} label={selectedCarInsurance && selectedCarInsurance.name} disabled />
                            </Box>
                            <Box>
                                <Typography className={classes.inputTitle}>Address</Typography>
                                <TextField className={classes.input} label={selectedCarInsurance && `${selectedCarInsurance.name}, ${selectedCarInsurance.streetAddress} ${selectedCarInsurance.numberAddress}, ${selectedCarInsurance.postNumber}`} disabled />
                            </Box>
                            <Box>
                                <Typography className={classes.inputTitle}>Phone</Typography>
                                <TextField className={classes.input} label={selectedCarInsurance && selectedCarInsurance.phoneNumber} disabled />
                            </Box>
                        </Box> : <Typography variant="h4" style={{ marginBottom: user.role === 'user' && 10 }} >No insurance yet.</Typography>}
                {user.role === 'admin' &&
                    <Box style={{ margin: '10px 0' }}>
                        <InsuranceDialog handleAlertOpening={setAlertOpen} />
                    </Box>}
            </Grid>
        </>
    )
}

export default InsuranceHouseGrid
