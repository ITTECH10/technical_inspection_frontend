import React from 'react'
import { Box, Typography, Divider, Button, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { yellow, red } from '@material-ui/core/colors'
import { useHistory } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import GroupIcon from '@material-ui/icons/Group';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import BuildIcon from '@material-ui/icons/Build';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { withNamespaces } from 'react-i18next'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    dashboardContainer: {},
    titleDividerBox: {
        padding: '10px 0'
    },
    title: {},
    boxTitleFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    divider: {
        marginTop: 10
    },
    dashboardBoxOne: {
        position: 'relative',
        marginBottom: 10,
        // margin: '0px 14px 10px 14px',
        [theme.breakpoints.up('md')]: {
            width: 300,
            marginBottom: 0,
            marginRight: 20
        },
        boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
        // marginRight: 20,
    },
    dashboardBoxThree: {
        position: 'relative',
        marginBottom: 10,
        // margin: '0px 14px 10px 14px',
        // flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            width: 300,
            marginBottom: 0,
            marginRight: 20
        },
        boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
        // marginRight: 20,
    },
    dashboardBoxBlueBox: {
        position: 'absolute',
        top: -10,
        left: 2,
        backgroundColor: 'blue',
        borderRadius: 5,
        color: '#fff',
        padding: 2
    },
    tuvBoxBtnsFlex: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    finansesBoxBtnsFlex: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    dashboardContentFlexTuv: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginRight: 10
    },
    dashboardContentFlex: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    countTitle: {},
    mainBtn: {},
    titleBlue: {
        fontSize: 15
    },
    boxFlexContainer: {
        display: 'flex',
        // justifyContent: 'space-between',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            marginTop: 5
        }
    },
    mainBoxTitle: {
        fontSize: 14,
        fontWeight: 600
    },
    mainBoxDivider: {
        marginTop: 5,
        backgroundColor: '#1976d2'
    },
    btnWarning: {
        color: yellow[700]
    },
    btnDanger: {
        color: red[700]
    }
}))

const DashboardScreen = ({ t }) => {
    const classes = useStyles()
    const history = useHistory()
    const { users, vehicles, setVehicles, getAllVehicles, setSelectedIndex, user, dashboardGeneratedTitle } = useData()

    const ordinaryIconSizePositioning = {
        position: 'absolute',
        right: '-35px',
        bottom: '-45px',
        height: '140px',
        width: '140px',
        fill: '#eee'
    }

    const distortedIconPositioning = {
        position: 'absolute',
        right: '-35px',
        bottom: '-57px',
        height: '140px',
        width: '140px',
        fill: '#eee'
    }

    const vehiclesWithAddedContract = vehicles.filter(v => v.contractExpiresOn)
    const vehiclesWithCreditsContractExpiringInTwoMonths = vehiclesWithAddedContract.filter(v => new Date(v.contractExpirationDate) > new Date() && new Date(v.contractExpirationDate) < new Date(new Date().setMonth(new Date().getMonth() + 8)) && v.vehiclePaymentTypeVariant === 'credit')
    const vehiclesWithLeasingsContractExpiringInTwoMonths = vehiclesWithAddedContract.filter(v => new Date(v.contractExpirationDate) > new Date() && new Date(v.contractExpirationDate) < new Date(new Date().setMonth(new Date().getMonth() + 8)) && v.vehiclePaymentTypeVariant === 'leasing')
    // MIGRATE TO BACKEND
    const vehiclesWithNTIExpired = vehicles.filter(vehicle => new Date(vehicle.nextTechnicalInspection) < new Date())

    React.useEffect(() => {
        let privacyPageTimeout

        if (user && !user.policiesAccepted) {
            privacyPageTimeout = setTimeout(() => {
                history.push('/privacyPolicy')
                history.go(0)
            }, 2000)
        }

        return () => {
            clearTimeout(privacyPageTimeout)
        }
    }, [history, user])

    React.useEffect(() => {
        getAllVehicles()
    }, [getAllVehicles])

    // const oneMonthAhead = new Date(new Date().setMonth(new Date().getMonth() + 1))
    // FIX LATER// NOT OKAY// BECAUSE OF UPDATING VEHICLE IT PERSISTS // LATER IT IS WRONG
    // const TUVExpiresInThirtyDays = vehicles.filter(v => v.TUVExpiresInOneMonth)
    const TUVExpiresInThirtyDays = vehicles.filter(v => new Date(v.TUV) > new Date && new Date(v.TUV) < new Date(new Date().setMonth(new Date().getMonth() + 1)))
    const TUVExpired = vehicles.filter(v => new Date(v.TUV) < new Date())
    const NTIExpiresInThirtyDays = vehicles.filter(v => new Date(v.nextTechnicalInspection) > new Date && new Date(v.nextTechnicalInspection) < new Date(new Date().setMonth(new Date().getMonth() + 1)))

    const handleNavigateFinansesVehicles = () => {
        setVehicles(vehiclesWithCreditsContractExpiringInTwoMonths)
        setSelectedIndex(2)

        history.push('/cars')
        dashboardGeneratedTitle('Finanzierung')
    }

    const handleNavigateCreditVehicles = () => {
        setVehicles(vehiclesWithLeasingsContractExpiringInTwoMonths)
        setSelectedIndex(2)
        history.push('/cars')
        dashboardGeneratedTitle('Leasing')
    }

    const handleNavigateTuvExpiredVehicles = () => {
        setVehicles(TUVExpired)
        setSelectedIndex(2)

        history.push('/cars')
        dashboardGeneratedTitle('TÜV überfällig')
    }

    const handleNavigateNtiExpiredVehicles = () => {
        setVehicles(vehiclesWithNTIExpired)
        setSelectedIndex(2)

        history.push('/cars')
        dashboardGeneratedTitle('SERVICE (NTI) überfällig')
    }

    const handleNavigateNtiThirtyDaysVehicles = () => {
        setVehicles(NTIExpiresInThirtyDays)
        setSelectedIndex(2)

        history.push('/cars')
        dashboardGeneratedTitle('Service läuft in 30 Tagen ab')
    }

    const handleNavigateTuvThirtyDaysVehicles = () => {
        setVehicles(TUVExpiresInThirtyDays)
        setSelectedIndex(2)

        history.push('/cars')
        dashboardGeneratedTitle('TÜV läuft in 30 Tagen ab')
    }

    const handleCustomersNavigate = () => {
        history.push('/customers')
        setSelectedIndex(1)
    }

    const handleAllVehiclesNavigate = () => {
        history.push('/cars')
        setSelectedIndex(2)

        dashboardGeneratedTitle('Alle Fahrzeuge')
    }

    return (
        <Page title="SE Carmanagement | Fuhrparkmanager">
            <Box className={classes.dashboardContainer}>
                <Box className={classes.titleDividerBox}>
                    <Typography className={classes.title} variant="h4">
                        {`${t('Dashboard.admin.greeting')}, Admin`}
                    </Typography>
                    <Divider className={classes.divider} />
                </Box>

                <Box className={classes.boxFlexContainer}>
                    <Card className={classes.dashboardBoxOne} variant="outlined" elevation={3}>
                        <CardContent>
                            <Box className={classes.boxTitleFlex}>
                                <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                                    {t('Dashboard.customersBox')}
                                </Typography>
                                <GroupIcon style={ordinaryIconSizePositioning} color="secondary" />
                            </Box>

                            <Box className={classes.dashboardContentFlex}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {users.filter(el => el.role !== 'admin').length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleCustomersNavigate}>
                                    {t('Dashboard.customersBtn')}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card className={classes.dashboardBoxOne} variant="outlined">
                        <CardContent>
                            <Box className={classes.boxTitleFlex}>
                                <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                                    {t('Dashboard.vehicleBox')}
                                </Typography>
                                <DriveEtaIcon style={ordinaryIconSizePositioning} color="secondary" />
                            </Box>

                            <Box className={classes.dashboardContentFlex}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {vehicles.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleAllVehiclesNavigate}>
                                    {t('Dashboard.vehiclesBtn')}
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card className={classes.dashboardBoxThree} variant="outlined">
                        <CardContent>
                            <Box className={classes.boxTitleFlex}>
                                <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                                    {t('Dashboard.tuvBox')}
                                </Typography>
                                <BuildIcon style={distortedIconPositioning} color="secondary" />
                            </Box>

                            <Box className={classes.tuvBoxBtnsFlex}>
                                <Box className={classes.dashboardContentFlexTuv}>
                                    <Typography className={classes.countTitle} variant="h4" component="h4">
                                        {TUVExpiresInThirtyDays.length}
                                    </Typography>
                                    <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateTuvThirtyDaysVehicles}>
                                        {t('Dashboard.tuvBtn30')}
                                    </Button>
                                </Box>
                                <Box className={classes.dashboardContentFlexTuv}>
                                    <Typography className={classes.countTitle} variant="h4" component="h4">
                                        {TUVExpired.length}
                                    </Typography>
                                    <Button size="small" variant="text" style={{ marginTop: 20 }} className={classes.btnDanger} onClick={handleNavigateTuvExpiredVehicles}>
                                        {t('Dashboard.tuvBtnExpired')}
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card className={classes.dashboardBoxThree} variant="outlined">
                        <CardContent>
                            <Box className={classes.boxTitleFlex}>
                                <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                                    {t('Dashboard.ntiBoxSingle')}
                                </Typography>
                                <BuildIcon style={distortedIconPositioning} color="secondary" />
                            </Box>

                            <Box className={classes.tuvBoxBtnsFlex}>
                                <Box className={classes.dashboardContentFlexTuv}>
                                    <Typography className={classes.countTitle} variant="h4" component="h4">
                                        {NTIExpiresInThirtyDays.length}
                                    </Typography>
                                    <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateNtiThirtyDaysVehicles}>
                                        {t('Dashboard.tuvBtn30')}
                                    </Button>
                                </Box>
                                <Box className={classes.dashboardContentFlexTuv}>
                                    <Typography className={classes.countTitle} variant="h4" component="h4">
                                        {vehiclesWithNTIExpired.length}
                                    </Typography>
                                    <Button disabled={vehiclesWithNTIExpired.length === 0} size="small" variant="text" style={{ marginTop: 20 }} className={classes.btnDanger} onClick={handleNavigateNtiExpiredVehicles}>
                                        {t('Dashboard.tuvBtnExpired')}
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card className={classes.dashboardBoxOne} variant="outlined">
                        <CardContent>
                            <Box className={classes.boxTitleFlex}>
                                <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                                    {t('Dashboard.financingStatusBox')}
                                </Typography>
                                <LocalAtmIcon style={ordinaryIconSizePositioning} color="secondary" />
                            </Box>

                            <Box className={classes.finansesBoxBtnsFlex}>
                                <Box className={classes.dashboardContentFlexTuv}>
                                    <Typography className={classes.countTitle} variant="h4" component="h4">
                                        {vehiclesWithCreditsContractExpiringInTwoMonths.length}
                                    </Typography>
                                    <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateFinansesVehicles}>
                                        {t('Dashboard.financingStatusBtnFinancing')}
                                    </Button>
                                </Box>
                                <Box className={classes.dashboardContentFlexTuv}>
                                    <Typography className={classes.countTitle} variant="h4" component="h4">
                                        {vehiclesWithLeasingsContractExpiringInTwoMonths.length}
                                    </Typography>
                                    <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateCreditVehicles}>
                                        {t('Dashboard.financingStatusBtnLeasing')}
                                    </Button>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Page>
    )
}

export default withNamespaces()(DashboardScreen)
