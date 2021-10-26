import React from 'react'
import { Paper, Box, Typography, TextField } from '@material-ui/core'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'

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

const PaymentDetailsForm = ({ t }) => {
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
                        <Typography className={classes.inputTitle}>{t('Payment.cash.payedAt')}</Typography>
                        <TextField className={classes.input} label={formatedCashPayedAt} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Gekauft von</Typography>
                        <TextField className={classes.input} label={selectedPayment.cashPayment.boughtFrom} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('Payment.cash.sum')}</Typography>
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
                        <Typography className={classes.inputTitle}>{t('ContractNumberInputLabel')}</Typography>
                        <TextField className={classes.input} label={selectedPayment.creditPayment.contractNumber} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('BuyedBy')}</Typography>
                        <TextField className={classes.input} label={selectedPayment.creditPayment.boughtFrom} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('CreditStartDateInputLabel')}</Typography>
                        <TextField className={classes.input} label={formatedFinansesCreditStartDate} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('MonthlyCreditPaymentInputLabel')}</Typography>
                        <TextField className={classes.input} label={selectedPayment.creditPayment.monthlyCreditPayment} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('CreditPaymentInterestInputLabel')}</Typography>
                        <TextField className={classes.input} label={selectedPayment.creditPayment.interestRate} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('CreditLastsForInputLabel')}</Typography>
                        <TextField className={classes.input} label={`${selectedPayment.creditPayment.creditLastsFor} ${selectedPayment.creditPayment.creditLastsFor === 1 ? t('monthSingular') : t('monthPlural')}`} disabled fullWidth />
                    </Box>
                    {selectedPayment.creditPayment.closingRate &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('PaymentFinansesClosingRate')}</Typography>
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
                        <Typography className={classes.inputTitle}>{t('ContractNumberInputLabel')}</Typography>
                        <TextField className={classes.input} label={selectedPayment.leasingPayment.contractNumber} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('BuyedBy')}</Typography>
                        <TextField className={classes.input} label={selectedPayment.leasingPayment.boughtFrom} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('MaintenancePackage')}</Typography>
                        <TextField className={classes.input} label={selectedPayment.leasingPayment.maintenancePackage === true ? "Yes" : "No"} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('LeasingStartDateInputLabel')}</Typography>
                        <TextField className={classes.input} label={formatedLeasingStartDate} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('MonthlyLeasingPaymentInputLabel')}</Typography>
                        <TextField className={classes.input} label={selectedPayment.leasingPayment.monthlyLeasingPayment} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('LeasingLastsForInputLabel')}</Typography>
                        <TextField className={classes.input} label={`${t('LeasingLastsForInputLabel')}: ${selectedPayment.leasingPayment.leasingLastsFor} months`} disabled fullWidth />
                    </Box>

                    {selectedPayment.leasingPayment.remainingPayment &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('RestvertInputLabel')}</Typography>
                            <TextField className={classes.input} label={selectedPayment.leasingPayment.remainingPayment} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.allowedYearlyKilometers &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('AllowedYearlyKilometersInputLabel')}</Typography>
                            <TextField className={classes.input} label={selectedPayment.leasingPayment.allowedYearlyKilometers} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.costsForMoreKilometers &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('CostsForMoreKilometersInputLabel')}</Typography>
                            <TextField className={classes.input} label={selectedPayment.leasingPayment.costsForMoreKilometers} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.costsForLessKilometers &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('CostsForLessKilometers')}</Typography>
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
                    : <Typography variant="h6">Noch keine Zahlungsdetails.</Typography>

    )
}

export default withNamespaces()(PaymentDetailsForm)
