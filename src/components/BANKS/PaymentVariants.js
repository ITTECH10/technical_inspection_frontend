import React from 'react'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BarDialog from './BarDialog'
import FinansesDialog from './FinansesDialog'
import LeasingDialog from './LeasingDialog'
import { useData } from '../../contexts/DataContext'

const useStyles = makeStyles(theme => ({
    flexContent: {
        width: 320,
        display: 'flex',
        justifyContent: 'space-between'
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
        user.role === 'admin' &&
        <Box className={classes.container}>
            <Box className={classes.flexContent}>
                <BarDialog />
                <FinansesDialog />
                <LeasingDialog />
            </Box>
        </Box>
    )
}

export default PaymentVariants
