import React from 'react'
import { useData } from '../../contexts/DataContext'
import { Grid, Typography, Box, TextField, } from '@material-ui/core'
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
        marginBottom: 10,
        width: '100%'
    },
}))

const VehicleDetailsGrid = ({ t }) => {
    const classes = useStyles()
    const { selectedCar } = useData()

    const { AU, HSN, TSN, TUV, model, allowedYearlyKilometers, firstVehicleRegistration, firstVehicleRegistrationOnOwner, kilometersDriven, mark, monthlyInsurancePayment, nextTechnicalInspection, yearlyTax, lastTechnicalInspection } = selectedCar

    const formatedLastTechnicalInspection = new Date(lastTechnicalInspection).toDateString()
    const formatedAu = new Date(AU).toDateString()
    const formatedTuv = new Date(TUV).toDateString()
    const formatedFirstVehicleReg = new Date(firstVehicleRegistration).toDateString()
    const formatedFirstVehOnOwner = new Date(firstVehicleRegistrationOnOwner).toDateString()
    const formatedNextTehInsp = new Date(nextTechnicalInspection).toDateString()

    return (
        <Grid item xs={12}>
            <Typography variant="h5" align="center" style={{ marginBottom: 15 }}>{t('VehicleDetailsTitle')}</Typography>
            <Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('MarkInputLabel')}</Typography>
                    <TextField className={classes.input} label={mark} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('ModelInputLabel')}</Typography>
                    <TextField className={classes.input} label={model} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('LTIInputLabel')}</Typography>
                    <TextField className={classes.input} label={formatedLastTechnicalInspection} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('NTIInputLabel')}</Typography>
                    <TextField className={classes.input} label={formatedNextTehInsp} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('AUInputLabel')}</Typography>
                    <TextField className={classes.input} label={formatedAu} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('TUVInputLabel')}</Typography>
                    <TextField className={classes.input} label={formatedTuv} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('FVRInputLabel')}</Typography>
                    <TextField className={classes.input} label={formatedFirstVehicleReg} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('FVROOInputLabel')}</Typography>
                    <TextField className={classes.input} label={formatedFirstVehOnOwner} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('HSNInputLabel')}</Typography>
                    <TextField className={classes.input} label={HSN} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('TSNInputLabel')}</Typography>
                    <TextField className={classes.input} label={TSN} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('AllowedYearlyKilometersInputLabel')}</Typography>
                    <TextField className={classes.input} label={allowedYearlyKilometers} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('KilometersDrivenInputLabel')}</Typography>
                    <TextField className={classes.input} label={kilometersDriven} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('MonthlyInsurancePaymentInputLabel')}</Typography>
                    <TextField className={classes.input} label={monthlyInsurancePayment} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('YearlyTaxInputLabel')}</Typography>
                    <TextField className={classes.input} label={yearlyTax} disabled />
                </Box>
            </Box>
        </Grid>
    )
}

export default withNamespaces()(VehicleDetailsGrid)
