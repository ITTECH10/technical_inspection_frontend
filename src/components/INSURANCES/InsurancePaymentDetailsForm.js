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
        marginTop: 10,
        fontWeight: '600'
    },
    input: {
        marginBottom: 10
    }
}))

const InsurancePaymentDetailsForm = ({ t }) => {
    const classes = useStyles()

    const { selectedCarInsurance } = useData()

    const SelectedInsurancePaymentDetails = () => (
        <Paper style={{ padding: 10, marginBottom: 20 }}>
            {selectedCarInsurance && (
                <>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('InsuranceGesellschaftInputLabel')}</Typography>
                        <TextField className={classes.input} label={selectedCarInsurance.insuranceHouse} disabled fullWidth />
                    </Box>
                    <Box>
                        <Typography className={classes.inputTitle}>{t('ContractNumberInputLabel')}</Typography>
                        <TextField className={classes.input} label={selectedCarInsurance.contractNumber} disabled fullWidth />
                    </Box>
                    {selectedCarInsurance.fullKasko !== undefined &&
                        <Box>
                            <Typography className={classes.inputTitle}>{t('FullKasko')}</Typography>
                            <NumberFormat
                                customInput={TextField}
                                value={selectedCarInsurance.fullKasko === undefined ? '0' : selectedCarInsurance.fullKasko}
                                prefix="€"
                                className={classes.input}
                                disabled
                                style={{ marginTop: '1rem' }}
                                fullWidth
                            />
                        </Box>}
                    <Box>
                        <Typography className={classes.inputTitle}>{t('PartKasko')}</Typography>
                        <NumberFormat
                            customInput={TextField}
                            value={selectedCarInsurance.partKasko === undefined ? '0' : selectedCarInsurance.partKasko}
                            prefix="€"
                            className={classes.input}
                            disabled
                            style={{ marginTop: '1rem' }}
                            fullWidth
                        />
                    </Box>
                    {selectedCarInsurance.insuranceCost !== undefined &&
                        <Box>
                            <Typography className={classes.inputTitle}>Versicherungsbeitrag</Typography>
                            <NumberFormat
                                customInput={TextField}
                                value={selectedCarInsurance.insuranceCost}
                                prefix="€"
                                className={classes.input}
                                disabled
                                style={{ marginTop: '1rem' }}
                                fullWidth
                            />
                        </Box>}
                    {selectedCarInsurance.insuranceCostType !== undefined &&
                        <Box>
                            <Typography className={classes.inputTitle}>Zahlweise</Typography>
                            <TextField
                                value={
                                    selectedCarInsurance.insuranceCostType === 'monthly'
                                        ? 'monatlich' : selectedCarInsurance.insuranceCostType === 'yearQuarter'
                                            ? 'vierteljährlich' : selectedCarInsurance.insuranceCostType === 'halfYearly'
                                                ? 'halbjährlich' : selectedCarInsurance.insuranceCostType === 'yearly'
                                                    ? 'jährlich' : null
                                }
                                className={classes.input}
                                margin="dense"
                                disabled
                                fullWidth
                            />
                        </Box>}
                    {selectedCarInsurance.allowedYearlyKilometers !== undefined &&
                        <Box>
                            <Typography className={classes.inputTitle}>Voraussichtliche Jahresfahrleistung (km)</Typography>
                            <TextField
                                value={selectedCarInsurance.allowedYearlyKilometers}
                                className={classes.input}
                                margin="dense"
                                disabled
                                fullWidth
                            />
                        </Box>}
                    <Box>
                        <Typography className={classes.inputTitle}>Schutzbrief</Typography>
                        <TextField
                            className={classes.input}
                            value={selectedCarInsurance.protectionLetter ? 'Ja' : 'Nein'}
                            disabled
                            fullWidth
                            margin="dense"
                        />
                        <Typography className={classes.inputTitle}>ADAC</Typography>
                        <TextField
                            className={classes.input}
                            value={selectedCarInsurance.ADAC ? 'Ja' : 'Nein'}
                            disabled
                            fullWidth
                            margin="dense"
                        />
                        <Typography className={classes.inputTitle}>Mitgliedsnummer</Typography>
                        <TextField
                            className={classes.input}
                            value={selectedCarInsurance.membershipNumber ? selectedCarInsurance.membershipNumber : 'Nein'}
                            disabled
                            fullWidth
                            margin="dense"
                        />
                    </Box>
                </>
            )}
        </Paper>
    )

    return (
        selectedCarInsurance._id ? <SelectedInsurancePaymentDetails /> : <Typography variant="h6" style={{ fontSize: 14, marginLeft: 10 }}>{t('NoInsuranceConnectedYetTitle')}</Typography>
    )
}

export default withNamespaces()(InsurancePaymentDetailsForm)
