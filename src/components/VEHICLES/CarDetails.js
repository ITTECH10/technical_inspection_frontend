import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Box, Divider, Typography } from '@material-ui/core'
import axios from 'axios'
import VehicleDetailsGrid from './VehicleDetailsGrid'
// import InsuranceHouseGrid from '../INSURANCES/InsuranceHouseGrid'
// import BankGrid from '../BANKS/BankGrid'
import PaymentVariants from '../BANKS/PaymentVariants'
import InsurancePaymentVariants from '../INSURANCES/InsurancePaymentVariants'
import GalleryAlternative from './../UI/GalleryAlternative'
import UserInfoBlock from '../UI/Users/UserInfoBlock'
import PaymentDetailsForm from '../BANKS/PaymentDetailsForm'
import InsurancePaymentDetailsForm from '../INSURANCES/InsurancePaymentDetailsForm'
import { withNamespaces } from 'react-i18next'
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

const CarDetails = ({ setOnHandleDeleteOpen, setOnHandleUpdateOpen, t }) => {
    const { selectedCar, selectedUser, user, users, setSelectedCarInsurance, setSelectedUser, getSelectedCar, setGeneralAlertOptions } = useData()
    const classes = useStyles()
    const history = useHistory()
    const { insuranceHouse, vehicleOwner } = selectedCar
    const { role } = user
    let corelatedCar

    if (vehicleOwner) {
        corelatedCar = users.find(u => u._id === vehicleOwner._id)
    }

    const getCarInsurance = React.useCallback(() => {
        axios.get(`/insuranceHouse/${insuranceHouse}`)
            .then(res => {
                if (res.status === 200) {
                    setSelectedCarInsurance(res.data.insurance)
                }
            })
            .catch(err => {
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 2500
                })
                // console.log(err.response)
            })
    }, [insuranceHouse, setSelectedCarInsurance, setGeneralAlertOptions])

    // OPTIONAL
    let carId = history.location.pathname.split('/')[2]
    useEffect(() => {
        getSelectedCar(carId)
        if (user.role === 'admin') {
            setSelectedUser(corelatedCar)
        }
    }, [carId, getSelectedCar, setSelectedUser, user.role, corelatedCar])

    useEffect(() => {
        if (selectedCar.insuranceHouse !== undefined && role === 'user') {
            getCarInsurance()
        }
    }, [selectedCar, getCarInsurance, setSelectedUser, role])

    return (
        selectedCar._id ?
            <Grid container className={classes.mainContainer} direction="column">
                {selectedUser && <UserInfoBlock />}
                <VehicleDetailsGrid
                    setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                    setOnHandleUpdateOpen={setOnHandleUpdateOpen}
                />
                {/* <InsuranceHouseGrid /> */}

                <Typography variant="h5" align="left" style={{ margin: '10px 0' }}>{t('Payment.title')}</Typography>
                <Divider style={{ marginBottom: 10 }} />
                <Box>
                    <PaymentVariants />
                    <PaymentDetailsForm />
                </Box>

                <Typography variant="h5" align="left" style={{ margin: '10px 0' }}>{t('InsurancesTitle')}</Typography>
                <Divider style={{ marginBottom: 10 }} />
                <Box>
                    <InsurancePaymentVariants />
                    <InsurancePaymentDetailsForm />
                </Box>
                <GalleryAlternative
                    setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                />
            </Grid> : <Loader />
    )
}

export default withNamespaces()(CarDetails)
