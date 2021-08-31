import React from 'react'
import { Box, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import BarDialog from './BarDialog'
import FinansesDialog from './FinansesDialog'
import LeasingDialog from './LeasingDialog'
import { useData } from '../../contexts/DataContext'

const useStyles = makeStyles(theme => ({
    container: {
        paddingBottom: 25
    },
    flexContent: {
        width: 310,
        display: 'flex',
        justifyContent: 'space-between'
    }
}))

const PaymentVariants = () => {
    const classes = useStyles()
    const { selectedCar, getCorespondingPayment } = useData()
    const { vehiclePaymentType } = selectedCar

    React.useEffect(() => {
        if (selectedCar._id) {
            getCorespondingPayment(vehiclePaymentType)
        }
    }, [getCorespondingPayment, selectedCar])

    return (
        <Box className={classes.container}>
            <Typography variant="h5" align="left" style={{ marginBottom: 10 }}>Bezahlung</Typography>
            <Divider style={{ marginBottom: 10 }} />

            <Box className={classes.flexContent}>
                <BarDialog />
                <FinansesDialog />
                <LeasingDialog />
            </Box>
        </Box>
    )
}

export default PaymentVariants
