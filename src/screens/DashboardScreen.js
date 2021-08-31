import React from 'react'
import { Box, Typography, Divider, Button, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { yellow, red } from '@material-ui/core/colors'
import { useHistory } from 'react-router-dom'
import { useData } from '../contexts/DataContext'

const useStyles = makeStyles(theme => ({
    dashboardContainer: {},
    titleDividerBox: {
        margin: '10px 0'
    },
    title: {},
    divider: {},
    dashboardBoxOne: {
        position: 'relative',
        marginBottom: 10,
        [theme.breakpoints.up('md')]: {
            width: 300,
            marginBottom: 0
        }
    },
    dashboardBoxThree: {
        marginBottom: 10,
        // flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            width: 400,
            marginBottom: 0
        }
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
        justifyContent: 'space-between',
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
        justifyContent: 'space-between',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        }
    },
    mainBoxTitle: {
        fontSize: 15,
        fontWeight: 600
    },
    mainBoxDivider: {
        marginTop: 5,
        backgroundColor: '#1976d2'
    },
    btnWarning: {
        color: '#fff',
        backgroundColor: yellow[700],
        "&:hover": {
            backgroundColor: yellow[800]
        }
    },
    btnDanger: {
        color: '#fff',
        backgroundColor: red[700],
        "&:hover": {
            backgroundColor: red[800]
        }
    }
}))

const DashboardScreen = () => {
    const classes = useStyles()
    const history = useHistory()
    const { users, vehicles, setVehicles, getAllVehicles, selectedCar } = useData()
    const twoMonthsAhead = new Date(new Date().setMonth(new Date().getMonth() + 2))

    const vehiclesWithAddedContract = vehicles.filter(v => v.contractExpiresOn)
    const vehiclesWithCreditsContractExpiringInTwoMonths = vehiclesWithAddedContract.filter(v => new Date(new Date().setMonth(new Date().getMonth() + v.contractExpiresOn)) > new Date() && new Date(new Date().setMonth(new Date().getMonth() + v.contractExpiresOn)) < twoMonthsAhead && v.vehiclePaymentTypeVariant === 'credit')
    const vehiclesWithLeasingsContractExpiringInTwoMonths = vehiclesWithAddedContract.filter(v => new Date(new Date().setMonth(new Date().getMonth() + v.contractExpiresOn)) > new Date() && new Date(new Date().setMonth(new Date().getMonth() + v.contractExpiresOn)) < twoMonthsAhead && v.vehiclePaymentTypeVariant === 'leasing')

    React.useEffect(() => {
        getAllVehicles()
    }, [])

    const cashVehicles = vehicles.filter(v => v.vehiclePaymentType === 'cash' && (new Date(v.paymentContractExpires) > new Date && new Date(v.paymentContractExpires) < twoMonthsAhead))
    const leasingVehicles = vehicles.filter(v => v.vehiclePaymentType !== 'cash' && (new Date(v.paymentContractExpires) > new Date && new Date(v.paymentContractExpires) < twoMonthsAhead))

    const oneMonthAhead = new Date(new Date().setMonth(new Date().getMonth() + 1))
    const TUVExpiresInThirtyDays = vehicles.filter(v => new Date(v.TUV) > new Date() && new Date(v.TUV) < oneMonthAhead)

    const fourteenDaysAhead = new Date(new Date().setDate(new Date().getDate() + 14))
    const TUVExpiresInFourteenDays = vehicles.filter(v => new Date(v.TUV) < fourteenDaysAhead && new Date(v.TUV) > new Date())

    const TUVExpired = vehicles.filter(v => new Date(v.TUV) < new Date())

    // const twoMonthsAheadVehicles = vehicles.filter(v => new Date(v.paymentContractExpires) > new Date && new Date(v.paymentContractExpires) < twoMonthsAhead)

    const handleNavigateFinansesVehicles = () => {
        setVehicles(vehiclesWithCreditsContractExpiringInTwoMonths)
        history.push('/cars')
    }

    const handleNavigateCreditVehicles = () => {
        setVehicles(vehiclesWithLeasingsContractExpiringInTwoMonths)
        history.push('/cars')
    }

    const handleNavigateTuvExpiredVehicles = () => {
        setVehicles(TUVExpired)
        history.push('/cars')
    }

    const handleNavigateTuvFourteenVehicles = () => {
        setVehicles(TUVExpiresInFourteenDays)
        history.push('/cars')
    }

    const handleNavigateTuvThirtyDaysVehicles = () => {
        setVehicles(TUVExpiresInThirtyDays)
        history.push('/cars')
    }

    return (
        <Box className={classes.dashboardContainer}>
            <Box className={classes.titleDividerBox}>
                <Typography className={classes.title} variant="h4">
                    Dashboard
                </Typography>
                <Divider className={classes.divider} />
            </Box>

            <Box className={classes.boxFlexContainer}>
                <Card className={classes.dashboardBoxOne} variant="outlined">
                    <CardContent>
                        <Typography className={classes.mainBoxTitle} variant="h5" component="h2">
                            Kunden
                        </Typography>
                        <Divider className={classes.mainBoxDivider} />

                        <Box className={classes.dashboardContentFlex}>
                            <Typography className={classes.countTitle} variant="h4" component="h2">
                                {users.length}
                            </Typography>
                            <Button size="small" variant="contained" color="secondary" onClick={() => history.push('/customers')}>
                                Alle Kunden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card className={classes.dashboardBoxOne} variant="outlined">
                    <CardContent>
                        <Typography className={classes.mainBoxTitle} variant="h5" component="h2">
                            Vervaltete Fahrzeuge
                        </Typography>
                        <Divider className={classes.mainBoxDivider} />

                        <Box className={classes.dashboardContentFlex}>
                            <Typography className={classes.countTitle} variant="h4" component="h2">
                                {vehicles.length}
                            </Typography>
                            <Button size="small" variant="contained" color="secondary" onClick={() => history.push('/cars')}>
                                Alle Fahrzeuge
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card className={classes.dashboardBoxThree} variant="outlined">
                    <CardContent>
                        <Typography className={classes.mainBoxTitle} variant="h5" component="h2">
                            TUV/AU Status (fallig)
                        </Typography>
                        <Divider className={classes.mainBoxDivider} />

                        <Box className={classes.tuvBoxBtnsFlex}>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h2">
                                    {TUVExpiresInThirtyDays.length}
                                </Typography>
                                <Button size="small" variant="contained" color="secondary" onClick={handleNavigateTuvThirtyDaysVehicles}>
                                    In 30 tagen
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h2">
                                    {TUVExpiresInFourteenDays.length}
                                </Typography>
                                <Button size="small" variant="contained" className={classes.btnWarning} onClick={handleNavigateTuvFourteenVehicles}>
                                    In 14 Tagen
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h2">
                                    {TUVExpired.length}
                                </Typography>
                                <Button size="small" variant="contained" className={classes.btnDanger} onClick={handleNavigateTuvExpiredVehicles}>
                                    Uberfallig
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Card className={classes.dashboardBoxOne} variant="outlined">
                    <CardContent>
                        <Typography className={classes.mainBoxTitle} variant="h5" component="h2">
                            Finanzenstatus (Ablauf in 2 Monaten)
                        </Typography>
                        <Divider className={classes.mainBoxDivider} />

                        <Box className={classes.finansesBoxBtnsFlex}>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h2">
                                    {vehiclesWithCreditsContractExpiringInTwoMonths.length}
                                </Typography>
                                <Button size="small" variant="contained" color="secondary" onClick={handleNavigateFinansesVehicles}>
                                    Finanzierung
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h2">
                                    {vehiclesWithLeasingsContractExpiringInTwoMonths.length}
                                </Typography>
                                <Button size="small" variant="contained" color="secondary" onClick={handleNavigateCreditVehicles}>
                                    Leasing
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default DashboardScreen
