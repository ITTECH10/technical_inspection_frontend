import React from 'react'
import { Paper, Box, Typography } from '@material-ui/core'
import { useData } from '../../contexts/DataContext'

const PaymentDetailsForm = () => {
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
                    <Typography variant="h5" style={{ marginBottom: 10 }}>Bezahlt mit cash</Typography>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Payed at: ${formatedCashPayedAt}`}</Typography>
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Summe: ${selectedPayment.cashPayment.cashSum}`}</Typography>
                    </Box>
                </>
            )}
        </Paper>
    )

    const CreditPaymentForm = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedPayment.creditPayment && (
                <>
                    <Typography variant="h5" style={{ marginBottom: 10 }}>Bezahlt mit finanzierung</Typography>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Contract number: ${selectedPayment.creditPayment.contractNumber}`}</Typography>
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Credit start date: ${formatedFinansesCreditStartDate}`}</Typography>
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Monthly credit payment: ${selectedPayment.creditPayment.monthlyCreditPayment}`}</Typography>
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Interest Rate: ${selectedPayment.creditPayment.interestRate}`}</Typography>
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Credit lasts for: ${selectedPayment.creditPayment.creditLastsFor} months`}</Typography>
                    </Box>

                    {selectedPayment.creditPayment.closingRate &&
                        <Box style={{ marginBottom: 10 }}>
                            <Typography>{`Closing rate: ${selectedPayment.creditPayment.closingRate}`}</Typography>
                        </Box>}
                </>
            )}
        </Paper>
    )

    const LeasingPaymentForm = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedPayment.leasingPayment && (
                <>
                    <Typography variant="h5" style={{ marginBottom: 10 }}>Bezahlt mit leasing</Typography>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Contract number: ${selectedPayment.leasingPayment.contractNumber}`}</Typography>
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Leasing start date: ${formatedLeasingStartDate}`}</Typography>
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Monthly leasing payment: ${selectedPayment.leasingPayment.monthlyLeasingPayment}`}</Typography>
                    </Box>
                    <Box style={{ marginBottom: 10 }}>
                        <Typography>{`Leasing lasts for: ${selectedPayment.leasingPayment.leasingLastsFor} months`}</Typography>
                    </Box>

                    {selectedPayment.leasingPayment.remainingPayment &&
                        <Box style={{ marginBottom: 10 }}>
                            <Typography>{`Restvert: ${selectedPayment.leasingPayment.remainingPayment}`}</Typography>
                        </Box>
                    }
                    {selectedPayment.leasingPayment.allowedYearlyKilometers &&
                        <Box style={{ marginBottom: 10 }}>
                            <Typography>{`Allowed yearly kilometers: ${selectedPayment.leasingPayment.allowedYearlyKilometers}`}</Typography>
                        </Box>
                    }
                    {selectedPayment.leasingPayment.costsForMoreKilometers &&
                        <Box style={{ marginBottom: 10 }}>
                            <Typography>{`Costs for more kilometers: ${selectedPayment.leasingPayment.costsForMoreKilometers}`}</Typography>
                        </Box>
                    }
                    {selectedPayment.leasingPayment.costsForLessKilometers &&
                        <Box style={{ marginBottom: 10 }}>
                            <Typography>{`Costs for less kilometers: ${selectedPayment.leasingPayment.costsForLessKilometers}`}</Typography>
                        </Box>
                    }
                </>
            )}
        </Paper>
    )

    return (
        <>
            <Typography variant="h5" style={{ marginBottom: 10 }}>
                Payment Details
            </Typography>
            {
                selectedPayment.cashPayment
                    ? <CashPaymentForm /> :
                    selectedPayment.creditPayment
                        ? <CreditPaymentForm /> :
                        selectedPayment.leasingPayment
                            ? <LeasingPaymentForm />
                            : <Typography variant="h4">No payment details yet.</Typography>
            }
        </>
    )
}

export default PaymentDetailsForm
