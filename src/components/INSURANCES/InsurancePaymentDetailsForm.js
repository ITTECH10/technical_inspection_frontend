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
                </>
            )}
        </Paper>
    )

    return (
        selectedCarInsurance._id ? <SelectedInsurancePaymentDetails /> : <Typography variant="h6" style={{ fontSize: 14, marginLeft: 10 }}>{t('NoInsuranceConnectedYetTitle')}</Typography>
    )
}

export default withNamespaces()(InsurancePaymentDetailsForm)
