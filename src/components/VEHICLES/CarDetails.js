import React from 'react'
import { useHistory } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, TextField, Button } from '@material-ui/core'
import InsuranceDialog from './../INSURANCES/InsuranceDialog'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        
    },
    inputTitle: {
        fontSize: 13,
        lineHeight: 0,
        marginTop: 10,
        fontWeight: '600'
    },
    input: {
        marginBottom: 10
    }
}))

const CarDetails = () => {
    const history = useHistory()
    const { selectedCar, insurances } = useData()
    const classes = useStyles()
    const { AU, HSN, insuranceHouse, TSN, TUV, model, allowedYearlyKilometers, firstVehicleRegistration, firstVehicleRegistrationOnOwner, kilometersDriven, mark, monthlyInsurancePayment, nextTechnicalInspection, vehiclePaymentType, yearlyTax, lastTechnicalInspection } = selectedCar

    const selectedInsurance = insurances.find(el => el._id === selectedCar.insuranceHouse)

    const formatedLastTechnicalInspection = new Date(lastTechnicalInspection).toDateString()
    const formatedAu = new Date(AU).toDateString()
    const formatedTuv = new Date(TUV).toDateString()
    const formatedFirstVehicleReg = new Date(firstVehicleRegistration).toDateString()
    const formatedFirstVehOnOwner = new Date(firstVehicleRegistrationOnOwner).toDateString()
    const formatedNextTehInsp = new Date(nextTechnicalInspection).toDateString()

    return (
        <Grid container className={classes.mainContainer}>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Mark</Typography>
                <TextField className={classes.input} label={mark} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Model</Typography>
                <TextField className={classes.input} label={model} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Insurance House</Typography>
                <TextField className={classes.input} label={selectedInsurance ? selectedInsurance.name : 'Not selected'} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>AU</Typography>
                <TextField className={classes.input} label={formatedAu} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>HSN</Typography>
                <TextField className={classes.input} label={HSN} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>TSN</Typography>
                <TextField className={classes.input} label={TSN} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>TUV</Typography>
                <TextField className={classes.input} label={formatedTuv} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Allowed yearly kilometers</Typography>
                <TextField className={classes.input} label={allowedYearlyKilometers} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>First vehicle registration</Typography>
                <TextField className={classes.input} label={formatedFirstVehicleReg} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>First vehicle registration on owner</Typography>
                <TextField className={classes.input} label={formatedFirstVehOnOwner} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Kilometers driven</Typography>
                <TextField className={classes.input} label={kilometersDriven} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Monthly insurance payment</Typography>
                <TextField className={classes.input} label={monthlyInsurancePayment} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Last technical inspection</Typography>
                <TextField className={classes.input} label={formatedLastTechnicalInspection} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Next technical inspection</Typography>
                <TextField className={classes.input} label={formatedNextTehInsp} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Vehicle payment type</Typography>
                <TextField className={classes.input} label={vehiclePaymentType} disabled />
            </Grid>
            <Grid item xs={12} md={4}>
                <Typography className={classes.inputTitle}>Yearly tax</Typography>
                <TextField className={classes.input} label={yearlyTax} disabled />
            </Grid>
            <InsuranceDialog />
        </Grid>
    )
}

export default CarDetails
