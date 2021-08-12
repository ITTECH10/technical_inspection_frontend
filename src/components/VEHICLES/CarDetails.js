import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Typography, TextField, Button, Box } from '@material-ui/core'
import InsuranceDialog from './../INSURANCES/InsuranceDialog'
import BankDialog from './../BANKS/BankDialog'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        padding: '15px'
    },
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
    imageBox: {
        height: 220,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            height: 350,
            width: '50%',
            margin: '0 auto'
        }
    }
}))

const CarDetails = () => {
    const { selectedCar, insurances, banks, user, setSelectedCarInsurance, setSelectedCarBank, selectedCarInsurance, selectedCarBank } = useData()
    const classes = useStyles()
    const { AU, HSN, insuranceHouse, TSN, TUV, model, allowedYearlyKilometers, firstVehicleRegistration, firstVehicleRegistrationOnOwner, kilometersDriven, mark, monthlyInsurancePayment, nextTechnicalInspection, vehiclePaymentType, yearlyTax, lastTechnicalInspection } = selectedCar
    const history = useHistory()

    const selectedInsurance = insurances.find(el => el._id === selectedCar.insuranceHouse)
    const selectedBank = banks.find(el => el._id === selectedCar.vehiclePaymentType)

    const formatedLastTechnicalInspection = new Date(lastTechnicalInspection).toDateString()
    const formatedAu = new Date(AU).toDateString()
    const formatedTuv = new Date(TUV).toDateString()
    const formatedFirstVehicleReg = new Date(firstVehicleRegistration).toDateString()
    const formatedFirstVehOnOwner = new Date(firstVehicleRegistrationOnOwner).toDateString()
    const formatedNextTehInsp = new Date(nextTechnicalInspection).toDateString()

    const getCarInsurance = () => {
        axios.get(`/insuranceHouse/${selectedCar.insuranceHouse}`)
            .then(res => {
                if (res.status === 200) {
                    setSelectedCarInsurance(res.data.insurance)
                }
            })
            .catch(err => console.log(err.response))
    }

    const getCarBankInfo = () => {
        axios.get(`/payment/${selectedCar.vehiclePaymentType}`)
            .then(res => {
                if (res.status === 200) {
                    setSelectedCarBank(res.data.bank)
                }
            })
            .catch(err => console.log(err.response))
    }
    
    // let carId = history.location.pathname.split('/')[2]
    useEffect(() => {
        if(!selectedCar._id) {
            history.push('/')
        }
        // getSelectedCar(carId)
    }, [])


    useEffect(() => {
        if (selectedCar.insuranceHouse && user.role === 'user') {
            getCarInsurance()
            getCarBankInfo()
        }
    }, [selectedCar])

    return (
        <Grid container className={classes.mainContainer} direction="column">
            {selectedCar.image && (
                <Box className={classes.imageBox}>
                    <img src={selectedCar.image} style={{height: '100%', width: '100%'}} alt="car"/>
                </Box>
            )}
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
                        <Typography className={classes.inputTitle}>Vehicle payment type</Typography>
                        <TextField className={classes.input} label={vehiclePaymentType} disabled />
                    </Box>
                </Box>
            </Grid>
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
                        <InsuranceDialog />
                    </Box>}
            </Grid>
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
                        <BankDialog />
                    </Box>}
            </Grid>
        </Grid>
    )
}

export default CarDetails
