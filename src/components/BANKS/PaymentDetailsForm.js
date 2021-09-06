import React from 'react'
import { Paper, Box, Typography, TextField } from '@material-ui/core'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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

const PaymentDetailsForm = () => {
    const classes = useStyles()

    const { selectedPayment } = useData()
    let formatedCashPayedAt, formatedFinansesCreditStartDate, formatedLeasingStartDate

    if (selectedPayment.cashPayment) {
        formatedCashPayedAt = new Date(selectedPayment.cashPayment.payedAt).toLocaleString()
    }

    if (selectedPayment.creditPayment) {
        formatedFinansesCreditStartDate = new Date(selectedPayment.creditPayment.creditStartDate).toLocaleString()
    }

    if (selectedPayment.leasingPayment) {
        formatedLeasingStartDate = new Date(selectedPayment.leasingPayment.leasingStartDate).toLocaleString()
    }

    const CashPaymentForm = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedPayment.cashPayment && (
                <>
                    <Box>
                        <Typography className={classes.inputTitle}>Bezahlt am</Typography>
                        <TextField className={classes.input} label={formatedCashPayedAt} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Summe</Typography>
                        <TextField className={classes.input} label={selectedPayment.cashPayment.cashSum} disabled fullWidth />
                    </Box>
                </>
            )}
        </Paper>
    )

    const CreditPaymentForm = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedPayment.creditPayment && (
                <>
                    <Box>
                        <Typography className={classes.inputTitle}>Contract number</Typography>
                        <TextField className={classes.input} label={selectedPayment.creditPayment.contractNumber} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Credit start date</Typography>
                        <TextField className={classes.input} label={formatedFinansesCreditStartDate} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Monthly credit payment</Typography>
                        <TextField className={classes.input} label={selectedPayment.creditPayment.monthlyCreditPayment} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Interest rate</Typography>
                        <TextField className={classes.input} label={selectedPayment.creditPayment.interestRate} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Credit lasts for</Typography>
                        <TextField className={classes.input} label={`${selectedPayment.creditPayment.creditLastsFor} months`} disabled fullWidth />
                    </Box>
                    {selectedPayment.creditPayment.closingRate &&
                        <Box>
                            <Typography className={classes.inputTitle}>Closing rate</Typography>
                            <TextField className={classes.input} label={selectedPayment.creditPayment.closingRate} disabled fullWidth />
                        </Box>}
                </>
            )}
        </Paper>
    )

    const LeasingPaymentForm = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedPayment.leasingPayment && (
                <>
                    <Box>
                        <Typography className={classes.inputTitle}>Contract number </Typography>
                        <TextField className={classes.input} label={selectedPayment.leasingPayment.contractNumber} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Leasing start date</Typography>
                        <TextField className={classes.input} label={formatedLeasingStartDate} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Monthly leasing payment</Typography>
                        <TextField className={classes.input} label={selectedPayment.leasingPayment.monthlyLeasingPayment} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Leasing lasts for</Typography>
                        <TextField className={classes.input} label={`Leasing lasts for: ${selectedPayment.leasingPayment.leasingLastsFor} months`} disabled fullWidth />
                    </Box>

                    {selectedPayment.leasingPayment.remainingPayment &&
                        <Box>
                            <Typography className={classes.inputTitle}>Restvert</Typography>
                            <TextField className={classes.input} label={selectedPayment.leasingPayment.remainingPayment} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.allowedYearlyKilometers &&
                        <Box>
                            <Typography className={classes.inputTitle}>Allowed yearly kilometers</Typography>
                            <TextField className={classes.input} label={selectedPayment.leasingPayment.allowedYearlyKilometers} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.costsForMoreKilometers &&
                        <Box>
                            <Typography className={classes.inputTitle}>Costs for more kilometers</Typography>
                            <TextField className={classes.input} label={selectedPayment.leasingPayment.costsForMoreKilometers} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.costsForLessKilometers &&
                        <Box>
                            <Typography className={classes.inputTitle}>Costs for less kilometers</Typography>
                            <TextField className={classes.input} label={selectedPayment.leasingPayment.costsForLessKilometers} disabled fullWidth />
                        </Box>
                    }
                </>
            )}
        </Paper>
    )

    return (
        selectedPayment.cashPayment
            ? <CashPaymentForm /> :
            selectedPayment.creditPayment
                ? <CreditPaymentForm /> :
                selectedPayment.leasingPayment
                    ? <LeasingPaymentForm />
                    : <Typography style={{ padding: 10 }} variant="h4">Noch keine Zahlungsdetails.</Typography>

    )
}

export default PaymentDetailsForm
