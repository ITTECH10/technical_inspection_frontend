import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import VehicleDetailsGrid from './VehicleDetailsGrid'
import InsuranceHouseGrid from '../INSURANCES/InsuranceHouseGrid'
import BankGrid from '../BANKS/BankGrid'
// import Gallery from './../UI/Gallery'
import GalleryAlternative from './../UI/GalleryAlternative'
import UserInfoBlock from '../UI/Users/UserInfoBlock'
import Loader from './../../utils/Loader'

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        // padding: '15px'
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
    const { selectedCar, user, setSelectedCarInsurance, getSelectedCar, setSelectedCarBank, carImages, appLoading, vehiclesPage } = useData()
    const classes = useStyles()
    const history = useHistory()
    const { insuranceHouse, vehiclePaymentType } = selectedCar
    const { role } = user

    const getCarInsurance = React.useCallback(() => {
        axios.get(`/insuranceHouse/${insuranceHouse}`)
            .then(res => {
                if (res.status === 200) {
                    setSelectedCarInsurance(res.data.insurance)
                }
            })
            .catch(err => console.log(err.response))
    }, [insuranceHouse, setSelectedCarInsurance])

    const getCarBankInfo = React.useCallback(() => {
        axios.get(`/payment/${vehiclePaymentType}`)
            .then(res => {
                if (res.status === 200) {
                    setSelectedCarBank(res.data.bank)
                }
            })
            .catch(err => console.log(err.response))
    }, [setSelectedCarBank, vehiclePaymentType])

    // OPTIONAL
    let carId = history.location.pathname.split('/')[2]
    useEffect(() => {
        getSelectedCar(carId)
    }, [carId, getSelectedCar])

    useEffect(() => {
        if (selectedCar.insuranceHouse !== undefined && role === 'user') {
            getCarInsurance()
        }
    }, [selectedCar, getCarInsurance, role])

    useEffect(() => {
        if (vehiclePaymentType !== undefined
            && vehiclePaymentType !== 'Cash'
            && role === 'user') {
            getCarBankInfo()
        }
    }, [selectedCar, role, getCarBankInfo, vehiclePaymentType])

    return (
        !appLoading ?
            <Grid container className={classes.mainContainer} direction="column">
                {/* {selectedCar.thumbnail && (
                <Box className={classes.imageBox}>
                    <img src={selectedCar.thumbnail} style={{ height: '100%', width: '100%' }} alt="car" />
                </Box>
            )} */}
                {vehiclesPage !== 'allVehicles' && <UserInfoBlock />}
                <VehicleDetailsGrid />
                <InsuranceHouseGrid />
                <BankGrid />
                {carImages.length > 0 && <GalleryAlternative />}
            </Grid> : <Loader />
    )
}

export default CarDetails
