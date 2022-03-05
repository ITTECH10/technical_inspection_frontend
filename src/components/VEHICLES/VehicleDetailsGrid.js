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
        marginTop: 10,
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

    const { AU, HSN, TSN, TUV, model, allowedYearlyKilometers, firstVehicleRegistration, lastUUV, nextUUV, registrationNumber, varantyExpiresAt, firstVehicleRegistrationOnOwner, kilometersDriven, mark, monthlyInsurancePayment, nextTechnicalInspection, yearlyTax, lastTechnicalInspection, chassisNumber } = selectedCar

    const formatedLastTechnicalInspection = new Date(lastTechnicalInspection).toDateString()
    const formatedAu = new Date(AU).toDateString()
    const formatedTuv = new Date(TUV).toDateString()
    const formatedFirstVehicleReg = new Date(firstVehicleRegistration).toDateString()
    const formatedFirstVehOnOwner = new Date(firstVehicleRegistrationOnOwner).toDateString()
    const formatedNextTehInsp = new Date(nextTechnicalInspection).toDateString()
    const formatedVaranty = new Date(varantyExpiresAt).toDateString()
    const formatedLastUUV = new Date(lastUUV).toDateString()
    const formatedNextUUV = new Date(nextUUV).toDateString()

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
                    <TextField className={classes.input} label={chassisNumber ? chassisNumber : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('MarkInputLabel')}</Typography>
                    <TextField className={classes.input} label={mark} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('ModelInputLabel')}</Typography>
                    <TextField className={classes.input} label={model} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('RegistrationNumberInputLabel')}</Typography>
                    <TextField className={classes.input} label={registrationNumber} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('VarantyExpirationDate')}</Typography>
                    <TextField className={classes.input} label={varantyExpiresAt ? formatedVaranty : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('LastUUVInputLabel')}</Typography>
                    <TextField className={classes.input} label={lastUUV ? formatedLastUUV : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('NextUUVInputLabel')}</Typography>
                    <TextField className={classes.input} label={nextUUV ? formatedNextUUV : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('LTIInputLabel')}</Typography>
                    <TextField className={classes.input} label={lastTechnicalInspection ? formatedLastTechnicalInspection : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('NTIInputLabel')}</Typography>
                    <TextField className={classes.input} label={nextTechnicalInspection ? formatedNextTehInsp : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('AUInputLabel')}</Typography>
                    <TextField className={classes.input} label={AU ? formatedAu : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('TUVInputLabel')}</Typography>
                    <TextField className={classes.input} label={TUV ? formatedTuv : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('FVRInputLabel')}</Typography>
                    <TextField className={classes.input} label={firstVehicleRegistration ? formatedFirstVehicleReg : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('FVROOInputLabel')}</Typography>
                    <TextField className={classes.input} label={firstVehicleRegistrationOnOwner ? formatedFirstVehOnOwner : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('HSNInputLabel')}</Typography>
                    <TextField className={classes.input} label={HSN ? HSN : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('TSNInputLabel')}</Typography>
                    <TextField className={classes.input} label={TSN ? TSN : t('VehicleDetailsDataNotSetYet')} disabled />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('AllowedYearlyKilometersInputLabel') + ' ' + '(km)'}</Typography>
                    <NumberFormat
                        value={allowedYearlyKilometers && allowedYearlyKilometers}
                        thousandSeparator={true}
                        customInput={TextField}
                        className={classes.input}
                        style={{ marginTop: '1rem' }}
                        disabled
                    />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('KilometersDrivenInputLabel')}</Typography>
                    <NumberFormat
                        value={kilometersDriven && kilometersDriven}
                        thousandSeparator={true}
                        customInput={TextField}
                        className={classes.input}
                        style={{ marginTop: '1rem' }}
                        disabled
                    />
                </Box>
                <Box>
                    <Typography className={classes.inputTitle}>{t('YearlyTaxInputLabel')}</Typography>
                    <NumberFormat
                        value={yearlyTax && yearlyTax}
                        thousandSeparator={true}
                        customInput={TextField}
                        className={classes.input}
                        style={{ marginTop: '1rem' }}
                        disabled
                        prefix="€"
                    />
                </Box>
            </Paper>
        </Grid>
    )
}

export default withNamespaces()(VehicleDetailsGrid)
