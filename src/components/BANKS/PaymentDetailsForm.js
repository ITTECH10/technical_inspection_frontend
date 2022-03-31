import React from 'react'
import { Paper, Box, Typography, TextField } from '@material-ui/core'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
import NumberFormat from 'react-number-format'

const useStyles = makeStyles(theme => ({
    inputTitle: {
        fontSize: 13,
        lineHeight: 0,
        margin: '8px 0',
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
                        <TextField className={classes.input} value={formatedCashPayedAt} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>Gekauft von</Typography>
                        <TextField className={classes.input} value={selectedPayment.cashPayment.boughtFrom} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('Payment.cash.sum')}</Typography>
                        <NumberFormat
                            value={selectedPayment.cashPayment.cashSum && selectedPayment.cashPayment.cashSum}
                            thousandSeparator={true}
                            customInput={TextField}
                            className={classes.input}
                            fullWidth
                            disabled
                            prefix="€"
                        />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('Payment.cash.kilometersDrivenWhenPurchased')}</Typography>
                        {/* <TextField className={classes.input} label={selectedPayment.cashPayment.kilometersDrivenWhenPurchased} disabled fullWidth /> */}
                        <NumberFormat
                            value={selectedPayment.cashPayment.kilometersDrivenWhenPurchased && selectedPayment.cashPayment.kilometersDrivenWhenPurchased}
                            thousandSeparator={true}
                            customInput={TextField}
                            className={classes.input}
                            fullWidth
                            disabled
                        />
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
                        <TextField className={classes.input} value={selectedPayment.creditPayment.contractNumber} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('BuyedBy')}</Typography>
                        <TextField className={classes.input} value={selectedPayment.creditPayment.boughtFrom} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('CreditStartDateInputLabel')}</Typography>
                        <TextField className={classes.input} value={formatedFinansesCreditStartDate} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('MonthlyCreditPaymentInputLabel')}</Typography>
                        <NumberFormat
                            value={selectedPayment.creditPayment.monthlyCreditPayment && selectedPayment.creditPayment.monthlyCreditPayment}
                            thousandSeparator={true}
                            customInput={TextField}
                            className={classes.input}
                            fullWidth
                            disabled
                            prefix="€"
                        />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('CreditPaymentInterestInputLabel')}</Typography>
                        <NumberFormat
                            value={selectedPayment.creditPayment.interestRate && selectedPayment.creditPayment.interestRate}
                            thousandSeparator={true}
                            customInput={TextField}
                            className={classes.input}
                            fullWidth
                            disabled
                            prefix="%"
                        />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('CreditLastsForInputLabel')}</Typography>
                        <TextField className={classes.input} value={`${selectedPayment.creditPayment.creditLastsFor} ${selectedPayment.creditPayment.creditLastsFor === 1 ? t('monthSingular') : t('monthPlural')}`} disabled fullWidth />
                    </Box>
                    {selectedPayment.creditPayment.closingRate &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('PaymentFinansesClosingRate')}</Typography>
                            <NumberFormat
                                value={selectedPayment.creditPayment.closingRate && selectedPayment.creditPayment.closingRate}
                                thousandSeparator={true}
                                customInput={TextField}
                                className={classes.input}
                                fullWidth
                                disabled
                                prefix="€"
                            />
                        </Box>}
                    <Box>
                        <Typography className={classes.inputTitle}>{t('Payment.cash.kilometersDrivenWhenPurchased')}</Typography>
                        <NumberFormat
                            value={selectedPayment.creditPayment.kilometersDrivenWhenPurchased && selectedPayment.creditPayment.kilometersDrivenWhenPurchased}
                            thousandSeparator={true}
                            customInput={TextField}
                            className={classes.input}
                            fullWidth
                            disabled
                        />
                    </Box>
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
                        <TextField className={classes.input} value={selectedPayment.leasingPayment.contractNumber} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('BuyedBy')}</Typography>
                        <TextField className={classes.input} value={selectedPayment.leasingPayment.boughtFrom} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('MaintenancePackage')}</Typography>
                        <TextField className={classes.input} value={selectedPayment.leasingPayment.maintenancePackage === true ? "Yes" : "No"} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('LeasingStartDateInputLabel')}</Typography>
                        <TextField className={classes.input} value={formatedLeasingStartDate} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('MonthlyLeasingPaymentInputLabel')}</Typography>
                        <TextField className={classes.input} value={selectedPayment.leasingPayment.monthlyLeasingPayment} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('LeasingLastsForInputLabel')}</Typography>
                        <TextField className={classes.input} value={`${t('LeasingLastsForInputLabel')}: ${selectedPayment.leasingPayment.leasingLastsFor} months`} disabled fullWidth />
                    </Box>

                    {selectedPayment.leasingPayment.remainingPayment &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('RestvertInputLabel')}</Typography>
                            <TextField className={classes.input} value={selectedPayment.leasingPayment.remainingPayment} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.moreDetails &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('MoreDetailsLeasingCreation')}</Typography>
                            <TextField className={classes.input} value={selectedPayment.leasingPayment.moreDetails} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.costsForMoreKilometers &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('CostsForMoreKilometersInputLabel')}</Typography>
                            <TextField className={classes.input} value={selectedPayment.leasingPayment.costsForMoreKilometers} disabled fullWidth />
                        </Box>
                    }
                    {selectedPayment.leasingPayment.costsForLessKilometers &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('CostsForLessKilometers')}</Typography>
                            <TextField className={classes.input} value={selectedPayment.leasingPayment.costsForLessKilometers} disabled fullWidth />
                        </Box>
                    }
                    <Box>
                        <Typography className={classes.inputTitle}>{t('Payment.cash.kilometersDrivenWhenPurchased')}</Typography>
                        <TextField className={classes.input} value={selectedPayment.leasingPayment.kilometersDrivenWhenPurchased} disabled fullWidth />
                    </Box>
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
                    : <Typography variant="h6" style={{ fontSize: 14, marginLeft: 10 }}>{t('NoPaymentDetailsYet')}</Typography>
    )
}

export default withNamespaces()(PaymentDetailsForm)
