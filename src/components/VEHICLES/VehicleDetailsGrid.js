import React from 'react'
import { useData } from '../../contexts/DataContext'
import { Grid, Typography, Box, TextField, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

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

const VehicleDetailsGrid = () => {
    const classes = useStyles()
    const { selectedCar } = useData()

    const { AU, HSN, TSN, TUV, model, allowedYearlyKilometers, firstVehicleRegistration, firstVehicleRegistrationOnOwner, kilometersDriven, mark, monthlyInsurancePayment, nextTechnicalInspection, yearlyTax, lastTechnicalInspection } = selectedCar

    const formatedLastTechnicalInspection = new Date(lastTechnicalInspection).toDateString()
    const formatedAu = new Date(AU).toDateString()
    const formatedTuv = new Date(TUV).toDateString()
    const formatedFirstVehicleReg = new Date(firstVehicleRegistration).toDateString()
    const formatedFirstVehOnOwner = new Date(firstVehicleRegistrationOnOwner).toDateString()
    const formatedNextTehInsp = new Date(nextTechnicalInspection).toDateString()

    return (
        <Grid item xs={12}>
            <Typography variant="h5" align="center" style={{ marginBottom: 15 }}>Vehicle Details</Typography>
            <Box>
                <Box>
                    <Typography className={classes.inputTitle}>Mark</Typography>
                    <TextField className={classes.input} label={mark} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>Model</Typography>
                    <TextField className={classes.input} label={model} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>Last technical inspection</Typography>
                    <TextField className={classes.input} label={formatedLastTechnicalInspection} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>Next technical inspection</Typography>
                    <TextField className={classes.input} label={formatedNextTehInsp} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>AU</Typography>
                    <TextField className={classes.input} label={formatedAu} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>TUV</Typography>
                    <TextField className={classes.input} label={formatedTuv} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>First vehicle registration</Typography>
                    <TextField className={classes.input} label={formatedFirstVehicleReg} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>First vehicle registration on owner</Typography>
                    <TextField className={classes.input} label={formatedFirstVehOnOwner} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>HSN</Typography>
                    <TextField className={classes.input} label={HSN} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>TSN</Typography>
                    <TextField className={classes.input} label={TSN} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>Allowed yearly kilometers</Typography>
                    <TextField className={classes.input} label={allowedYearlyKilometers} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>Kilometers driven</Typography>
                    <TextField className={classes.input} label={kilometersDriven} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>Monthly insurance payment</Typography>
                    <TextField className={classes.input} label={monthlyInsurancePayment} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>Yearly Tax</Typography>
                    <TextField className={classes.input} label={yearlyTax} disabled />
                </Box>
            </Box>
        </Grid>
    )
}

export default VehicleDetailsGrid
