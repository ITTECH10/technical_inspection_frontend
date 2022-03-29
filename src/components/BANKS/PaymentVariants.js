import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BarDialog from './BarDialog'
import FinansesDialog from './FinansesDialog'
import LeasingDialog from './LeasingDialog'
import SellCarDialog from '../VEHICLES/SellCarDialog'
import { useData } from '../../contexts/DataContext'

const useStyles = makeStyles(theme => ({
    flexContent: {
        // width: 320,
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            // width: 500,
            flexDirection: 'row',
            justifyContent: 'flex-start'
        }
    }
}))

const PaymentVariants = () => {
    const classes = useStyles()
    const { selectedCar, getCorespondingPayment, setSelectedPayment, user } = useData()
    const { vehiclePaymentType } = selectedCar

    React.useEffect(() => {
        if (selectedCar._id && vehiclePaymentType) {
            getCorespondingPayment(vehiclePaymentType)
        } else {
            setSelectedPayment({})
        }
    }, [getCorespondingPayment, selectedCar, setSelectedPayment, vehiclePaymentType])

    return (

        <Box className={classes.container}>
            <Box className={classes.flexContent}>
                <BarDialog />
                <FinansesDialog />
                <LeasingDialog />
                <SellCarDialog />
            </Box>
        </Box>
    )
}

export default PaymentVariants
