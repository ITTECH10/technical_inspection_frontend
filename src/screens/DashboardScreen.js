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
        width: 300,
        // height: 180,
        position: 'relative'
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
        justifyContent: 'space-between'
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
    const { users, vehicles, setVehicles, getAllVehicles } = useData()

    React.useEffect(() => {
        getAllVehicles()
    }, [])

    const cashVehicles = vehicles.filter(v => v.vehiclePaymentType === 'cash')
    const leasingVehicles = vehicles.filter(v => v.vehiclePaymentType !== 'cash')

    const twoMonthsAhead = new Date(new Date().setMonth(new Date().getMonth() + 2))

    const oneMonthAhead = new Date(new Date().setMonth(new Date().getMonth() + 1))
    const TUVExpiresInThirtyDays = vehicles.filter(v => new Date(v.TUV) > new Date() && new Date(v.TUV) < oneMonthAhead)

    const fourteenDaysAhead = new Date(new Date().setDate(new Date().getDate() + 14))
    const TUVExpiresInFourteenDays = vehicles.filter(v => new Date(v.TUV) < fourteenDaysAhead)

    const TUVExpired = vehicles.filter(v => new Date(v.TUV) < new Date())

    const handleNavigateFinansesVehicles = () => {
        setVehicles(cashVehicles)
        history.push('/cars')
    }

    const handleNavigateCreditVehicles = () => {
        setVehicles(leasingVehicles)
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
                            Finanzenstatus (Ablauf in 2 Monanten)
                        </Typography>
                        <Divider className={classes.mainBoxDivider} />

                        <Box className={classes.finansesBoxBtnsFlex}>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h2">
                                    {cashVehicles.length}
                                </Typography>
                                <Button size="small" variant="contained" color="secondary" onClick={handleNavigateFinansesVehicles}>
                                    Finanzierung
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h2">
                                    {leasingVehicles.length}
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
