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
        },
        boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
        marginRight: 20,
    },
    dashboardBoxThree: {
        marginBottom: 10,
        // flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            width: 415,
            marginBottom: 0
        },
        boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
        marginRight: 20,
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
        // justifyContent: 'space-between',
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
        color: yellow[700]
    },
    btnDanger: {
        color: red[700]
    }
}))

const DashboardScreen = () => {
    const classes = useStyles()
    const history = useHistory()
    const { users, vehicles, setVehicles, getAllVehicles, selectedCar } = useData()

    const vehiclesWithAddedContract = vehicles.filter(v => v.contractExpiresOn)
    const vehiclesWithCreditsContractExpiringInTwoMonths = vehiclesWithAddedContract.filter(v => new Date(v.contractExpirationDate) > new Date() && v.contractExpiresInNextTwoMonths && v.vehiclePaymentTypeVariant === 'credit')
    const vehiclesWithLeasingsContractExpiringInTwoMonths = vehiclesWithAddedContract.filter(v => new Date(v.contractExpirationDate) > new Date() && v.contractExpiresInNextTwoMonths && v.vehiclePaymentTypeVariant === 'leasing')

    React.useEffect(() => {
        getAllVehicles()
    }, [])

    // const oneMonthAhead = new Date(new Date().setMonth(new Date().getMonth() + 1))
    const TUVExpiresInThirtyDays = vehicles.filter(v => v.TUVExpiresInOneMonth)
    const TUVExpiresInFourteenDays = vehicles.filter(v => v.TUVExpiresInFourteenDays)
    const TUVExpired = vehicles.filter(v => new Date(v.TUV) < new Date())

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
                <Card className={classes.dashboardBoxOne} variant="outlined" elevation={3}>
                    <CardContent>
                        <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                            Kunden
                        </Typography>

                        <Box className={classes.dashboardContentFlex}>
                            <Typography className={classes.countTitle} variant="h4" component="h4">
                                {users.length}
                            </Typography>
                            <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={() => history.push('/customers')}>
                                Alle Kunden
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card className={classes.dashboardBoxOne} variant="outlined">
                    <CardContent>
                        <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                            Vervaltete Fahrzeuge
                        </Typography>

                        <Box className={classes.dashboardContentFlex}>
                            <Typography className={classes.countTitle} variant="h4" component="h4">
                                {vehicles.length}
                            </Typography>
                            <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={() => history.push('/cars')}>
                                Alle Fahrzeuge
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                <Card className={classes.dashboardBoxThree} variant="outlined">
                    <CardContent>
                        <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                            TUV/AU Status (fallig)
                        </Typography>

                        <Box className={classes.tuvBoxBtnsFlex}>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {TUVExpiresInThirtyDays.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateTuvThirtyDaysVehicles}>
                                    In 30 tagen
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {TUVExpiresInFourteenDays.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} className={classes.btnWarning} onClick={handleNavigateTuvFourteenVehicles}>
                                    In 14 Tagen
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {TUVExpired.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} className={classes.btnDanger} onClick={handleNavigateTuvExpiredVehicles}>
                                    Uberfallig
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
                <Card className={classes.dashboardBoxOne} variant="outlined">
                    <CardContent>
                        <Typography className={classes.mainBoxTitle} variant="h5" component="h5">
                            Finanzenstatus (Ablauf in 2 Monaten)
                        </Typography>

                        <Box className={classes.finansesBoxBtnsFlex}>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {vehiclesWithCreditsContractExpiringInTwoMonths.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateFinansesVehicles}>
                                    Finanzierung
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {vehiclesWithLeasingsContractExpiringInTwoMonths.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateCreditVehicles}>
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
