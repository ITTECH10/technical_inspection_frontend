import React from 'react'
import { useData } from '../../contexts/DataContext'
import { Grid, Typography, Box, TextField, Paper, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
import DeleteCars from './DeleteCars'
import UpdateVehicleInformation from './UpdateVehicleInformation'
import ConfirmUserSellingCarDialog from './ConfirmUserSellingCarDialog'
import NumberFormat from 'react-number-format'

const useStyles = makeStyles(theme => ({
    inputTitle: {
        fontSize: 13,
        lineHeight: 0,
        margin: '8px 0',
        fontWeight: '600'
    },
    input: {
        marginBottom: 10,
        width: '100%'
    },
    actionsFlexContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        }
    },
    actionBtnsBoxFlex: {
        display: 'flex',
        alignItems: 'center',
    },
}))

const VehicleDetailsGrid = ({ t, setOnHandleDeleteOpen, setOnHandleUpdateOpen }) => {
    const classes = useStyles()
    const { selectedCar } = useData()

    const { AU, HSN, TSN, TUV, model, allowedYearlyKilometers, firstVehicleRegistration, lastUUV, nextUUV, driver, registrationNumber, varantyExpiresAt, firstVehicleRegistrationOnOwner, kilometersDriven, mark, monthlyInsurancePayment, nextTechnicalInspection, yearlyTax, lastTechnicalInspection, chassisNumber } = selectedCar

    const formatedLastTechnicalInspection = new Date(lastTechnicalInspection).toLocaleDateString()
    const formatedAu = new Date(AU).toLocaleDateString()
    const formatedTuv = new Date(TUV).toLocaleDateString()
    const formatedFirstVehicleReg = new Date(firstVehicleRegistration).toLocaleDateString()
    const formatedFirstVehOnOwner = new Date(firstVehicleRegistrationOnOwner).toLocaleDateString()
    const formatedNextTehInsp = new Date(nextTechnicalInspection).toLocaleDateString()
    const formatedVaranty = new Date(varantyExpiresAt).toLocaleDateString()
    const formatedLastUUV = new Date(lastUUV).toLocaleDateString()
    const formatedNextUUV = new Date(nextUUV).toLocaleDateString()

    return (
        <Grid item xs={12}>
            <Box className={classes.actionsFlexContainer}>
                <Typography variant="h5">{t('VehicleDetailsTitle')}</Typography>
                <Box className={classes.actionBtnsBoxFlex}>
                    {selectedCar.markForSelling && <ConfirmUserSellingCarDialog />}
                    <UpdateVehicleInformation setOnHandleUpdateOpen={setOnHandleUpdateOpen} />
                    <DeleteCars setOnHandleDeleteOpen={setOnHandleDeleteOpen} />
                </Box>
            </Box>
            <Divider style={{ marginBottom: 10 }} />

            <Paper elevation={3} style={{ padding: 12, marginBottom: 5 }}>
                <Box>
                    <Typography className={classes.inputTitle}>{t('ChassisNumber')}</Typography>
                    <TextField className={classes.input} value={chassisNumber ? chassisNumber : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('MarkInputLabel')}</Typography>
                    <TextField className={classes.input} value={mark} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('ModelInputLabel')}</Typography>
                    <TextField className={classes.input} value={model} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>Fahrer</Typography>
                    <TextField className={classes.input} value={driver} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('RegistrationNumberInputLabel')}</Typography>
                    <TextField className={classes.input} value={registrationNumber} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('VarantyExpirationDate')}</Typography>
                    <TextField className={classes.input} value={varantyExpiresAt ? formatedVaranty : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('lastUUVInputLabel')}</Typography>
                    <TextField className={classes.input} value={lastUUV ? formatedLastUUV : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('nextUUVInputLabel')}</Typography>
                    <TextField className={classes.input} value={nextUUV ? formatedNextUUV : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('LTIInputLabel')}</Typography>
                    <TextField className={classes.input} value={lastTechnicalInspection ? formatedLastTechnicalInspection : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('NTIInputLabel')}</Typography>
                    <TextField className={classes.input} value={nextTechnicalInspection ? formatedNextTehInsp : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('AUInputLabel')}</Typography>
                    <TextField className={classes.input} value={AU ? formatedAu : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('TUVInputLabel')}</Typography>
                    <TextField className={classes.input} value={TUV ? formatedTuv : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('FVRInputLabel')}</Typography>
                    <TextField className={classes.input} value={firstVehicleRegistration ? formatedFirstVehicleReg : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('FVROOInputLabel')}</Typography>
                    <TextField className={classes.input} value={firstVehicleRegistrationOnOwner ? formatedFirstVehOnOwner : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('HSNInputLabel')}</Typography>
                    <TextField className={classes.input} value={HSN ? HSN : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('TSNInputLabel')}</Typography>
                    <TextField className={classes.input} value={TSN ? TSN : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{`${t('AllowedYearlyKilometersInputLabel')} (km)`}</Typography>
                    {allowedYearlyKilometers ?
                        <NumberFormat
                            value={allowedYearlyKilometers}
                            thousandSeparator={true}
                            customInput={TextField}
                            className={classes.input}
                            disabled
                        /> : <TextField className={classes.input} value={allowedYearlyKilometers ? allowedYearlyKilometers : t('VehicleDetailsDataNotSetYet')} disabled />}
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('KilometersDrivenInputLabel')}</Typography>
                    <NumberFormat
                        value={kilometersDriven && kilometersDriven}
                        thousandSeparator={true}
                        customInput={TextField}
                        className={classes.input}
                        disabled
                    />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('YearlyTaxInputLabel')}</Typography>
                    {yearlyTax ?
                        <NumberFormat
                            value={yearlyTax}
                            thousandSeparator={true}
                            customInput={TextField}
                            className={classes.input}
                            disabled
                            prefix="€"
                        /> : <TextField className={classes.input} value={yearlyTax ? yearlyTax : t('VehicleDetailsDataNotSetYet')} disabled />}
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('MonthlyInsurancePaymentInputLabel')}</Typography>
                    {monthlyInsurancePayment ?
                        <NumberFormat
                            value={monthlyInsurancePayment}
                            thousandSeparator={true}
                            customInput={TextField}
                            className={classes.input}
                            disabled
                            prefix="€"
                        /> : <TextField className={classes.input} value={monthlyInsurancePayment ? monthlyInsurancePayment : t('VehicleDetailsDataNotSetYet')} disabled />}
                </Box>
            </Paper>
        </Grid>
    )
}

export default withNamespaces()(VehicleDetailsGrid)
