import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import axios from 'axios'
import VehicleDetailsGrid from './VehicleDetailsGrid'
import InsuranceHouseGrid from '../INSURANCES/InsuranceHouseGrid'
// import BankGrid from '../BANKS/BankGrid'
import PaymentVariants from '../BANKS/PaymentVariants'
import GalleryAlternative from './../UI/GalleryAlternative'
import UserInfoBlock from '../UI/Users/UserInfoBlock'
import PaymentDetailsForm from '../BANKS/PaymentDetailsForm'

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

const CarDetails = ({ setOnHandleDeleteOpen, setOnHandleUpdateOpen }) => {
    const { selectedCar, selectedUser, user, users, setSelectedCarInsurance, setSelectedUser, getSelectedCar, carImages } = useData()
    const classes = useStyles()
    const history = useHistory()
    const { insuranceHouse, vehicleOwner } = selectedCar
    const { role } = user
    const corelatedCar = users.find(u => u._id === vehicleOwner)

    const getCarInsurance = React.useCallback(() => {
        axios.get(`/insuranceHouse/${insuranceHouse}`)
            .then(res => {
                if (res.status === 200) {
                    setSelectedCarInsurance(res.data.insurance)
                }
            })
            .catch(err => console.log(err.response))
    }, [insuranceHouse, setSelectedCarInsurance])

    // OPTIONAL
    let carId = history.location.pathname.split('/')[2]
    useEffect(() => {
        getSelectedCar(carId)
        if (user.role === 'admin') {
            setSelectedUser(corelatedCar)
        }
    }, [carId, getSelectedCar, vehicleOwner])

    useEffect(() => {
        if (selectedCar.insuranceHouse !== undefined && role === 'user') {
            getCarInsurance()
        }
    }, [selectedCar, getCarInsurance, setSelectedUser, role])

    return (
        <Grid container className={classes.mainContainer} direction="column">
            {selectedUser && <UserInfoBlock />}
            <VehicleDetailsGrid
                setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                setOnHandleUpdateOpen={setOnHandleUpdateOpen}
            />
            <InsuranceHouseGrid />
            <PaymentVariants />
            <PaymentDetailsForm />
            {carImages.length > 0 &&
                <GalleryAlternative
                    setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                />}
        </Grid>
    )
}

export default CarDetails
