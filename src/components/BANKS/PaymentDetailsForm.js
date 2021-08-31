import React from 'react'
import { Paper, Box, TextField, Typography } from '@material-ui/core'
import { useData } from '../../contexts/DataContext'

const PaymentDetailsForm = () => {
    const { selectedPayment } = useData()

    const CashPaymentForm = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedPayment.cashPayment && (
                <>
                    <Typography variant="h5" style={{ marginBottom: 10 }}>Bezahlt mit cash</Typography>
                    <TextField
                        value={`Payed at: ${selectedPayment.cashPayment.payedAt}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        value={`Summe: ${selectedPayment.cashPayment.cashSum}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                </>
            )}
        </Paper>
    )

    const CreditPaymentForm = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedPayment.creditPayment && (
                <>
                    <Typography variant="h5" style={{ marginBottom: 10 }}>Bezahlt mit finanzierung</Typography>
                    <TextField
                        value={`Contract number: ${selectedPayment.creditPayment.contractNumber}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        value={`Credit start date: ${selectedPayment.creditPayment.creditStartDate}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        value={`Monthly credit payment: ${selectedPayment.creditPayment.monthlyCreditPayment}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        value={`Interest Rate: ${selectedPayment.creditPayment.interestRate}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        value={`Credit lasts for: ${selectedPayment.creditPayment.creditLastsFor} months`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    {selectedPayment.creditPayment.closingRate &&
                        <TextField
                            value={`Closing rate: ${selectedPayment.creditPayment.closingRate}`}
                            fullWidth
                            disabled
                            style={{ marginBottom: 10 }}
                        />}
                </>
            )}
        </Paper>
    )

    const LeasingPaymentForm = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedPayment.leasingPayment && (
                <>
                    <Typography variant="h5" style={{ marginBottom: 10 }}>Bezahlt mit leasing</Typography>
                    <TextField
                        value={`Contract number: ${selectedPayment.leasingPayment.contractNumber}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        value={`Leasing start date: ${selectedPayment.leasingPayment.leasingStartDate}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        value={`Monthly leasing payment: ${selectedPayment.leasingPayment.monthlyLeasingPayment}`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    <TextField
                        value={`Leasing lasts for: ${selectedPayment.leasingPayment.leasingLastsFor} months`}
                        fullWidth
                        disabled
                        style={{ marginBottom: 10 }}
                    />
                    {selectedPayment.leasingPayment.remainingPayment &&
                        <TextField
                            value={`Restvert: ${selectedPayment.leasingPayment.remainingPayment}`}
                            fullWidth
                            disabled
                            style={{ marginBottom: 10 }}
                        />}
                    {selectedPayment.leasingPayment.allowedYearlyKilometers &&
                        <TextField
                            value={`Allowed yearly kilometers: ${selectedPayment.leasingPayment.allowedYearlyKilometers}`}
                            fullWidth
                            disabled
                            style={{ marginBottom: 10 }}
                        />}
                    {selectedPayment.leasingPayment.costsForMoreKilometers &&
                        <TextField
                            value={`Costs for more kilometers: ${selectedPayment.leasingPayment.costsForMoreKilometers}`}
                            fullWidth
                            disabled
                            style={{ marginBottom: 10 }}
                        />}
                    {selectedPayment.leasingPayment.costsForLessKilometers &&
                        <TextField
                            value={`Costs for less kilometers: ${selectedPayment.leasingPayment.costsForLessKilometers}`}
                            fullWidth
                            disabled
                            style={{ marginBottom: 10 }}
                        />}
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
