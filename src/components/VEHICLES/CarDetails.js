import React, { useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box } from '@material-ui/core'
import axios from 'axios'
import VehicleDetailsGrid from './VehicleDetailsGrid'
import InsuranceHouseGrid from '../INSURANCES/InsuranceHouseGrid'
import BankGrid from '../BANKS/BankGrid'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        padding: '15px'
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
    const { selectedCar, user, setSelectedCarInsurance, setSelectedCarBank } = useData()
    const classes = useStyles()
    // const history = useHistory()

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

    // OPTIONAL
    // let carId = history.location.pathname.split('/')[2]
    // useEffect(() => {
    //     getSelectedCar(carId)
    // }, [])


    useEffect(() => {
        if (selectedCar.insuranceHouse !== undefined && user.role === 'user') {
            getCarInsurance()
        }
    }, [selectedCar])

    useEffect(() => {
        if (selectedCar.vehiclePaymentType !== undefined
            && selectedCar.vehiclePaymentType !== 'Cash'
            && user.role === 'user') {
            getCarBankInfo()
        }
    }, [selectedCar])



    return (
        <Grid container className={classes.mainContainer} direction="column">
            {selectedCar.image && (
                <Box className={classes.imageBox}>
                    <img src={selectedCar.image} style={{ height: '100%', width: '100%' }} alt="car" />
                </Box>
            )}
            <VehicleDetailsGrid />
            <InsuranceHouseGrid />
            <BankGrid />
        </Grid>
    )
}

export default CarDetails
