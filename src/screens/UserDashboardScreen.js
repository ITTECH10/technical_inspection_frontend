import React from 'react'
import { Box, Typography, Divider, Button, Card, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { yellow, red } from '@material-ui/core/colors'
import { useHistory } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import BuildIcon from '@material-ui/icons/Build';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { withNamespaces } from 'react-i18next'

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
        [theme.breakpoints.up('md')]: {
            width: 300,
            marginBottom: 0
        },
        boxShadow: '0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)',
        marginRight: 20,
    },
    dashboardBoxThree: {
        position: 'relative',
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
    const { setSelectedIndex, user, getUserVehicles, myVehicles, setMyVehicles, dashboardGeneratedTitle } = useData()

    const { _id } = user

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

    const myVehiclesWithAddedContract = myVehicles.filter(v => v.contractExpiresOn)
    const myVehiclesWithCreditsContractExpiringInTwoMonths = myVehiclesWithAddedContract.filter(v => new Date(v.contractExpirationDate) > new Date() && v.contractExpiresInNextTwoMonths && v.vehiclePaymentTypeVariant === 'credit')
    const myVehiclesWithLeasingsContractExpiringInTwoMonths = myVehiclesWithAddedContract.filter(v => new Date(v.contractExpirationDate) > new Date() && v.contractExpiresInNextTwoMonths && v.vehiclePaymentTypeVariant === 'leasing')

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
        getUserVehicles(_id)
    }, [getUserVehicles, _id])

    const UserTUVExpiresInThirtyDays = myVehicles.filter(v => v.TUVExpiresInOneMonth)
    const UserTUVExpiresInFourteenDays = myVehicles.filter(v => v.TUVExpiresInFourteenDays)
    const UserTUVExpired = myVehicles.filter(v => new Date(v.TUV) < new Date())

    const handleNavigateFinansesVehicles = () => {
        setMyVehicles(myVehiclesWithCreditsContractExpiringInTwoMonths)
        setSelectedIndex(1)

        history.push('/cars')
    }

    const handleNavigateCreditVehicles = () => {
        setMyVehicles(myVehiclesWithLeasingsContractExpiringInTwoMonths)
        setSelectedIndex(1)

        history.push('/cars')
    }

    const handleNavigateTuvExpiredVehicles = () => {
        setMyVehicles(UserTUVExpired)
        setSelectedIndex(1)

        history.push('/cars')
        dashboardGeneratedTitle('TÜV überfällig')
    }

    const handleNavigateTuvFourteenVehicles = () => {
        setMyVehicles(UserTUVExpiresInFourteenDays)
        setSelectedIndex(1)

        history.push('/cars')
        dashboardGeneratedTitle('TÜV läuft in 14 Tagen ab')
    }

    const handleNavigateTuvThirtyDaysVehicles = () => {
        setMyVehicles(UserTUVExpiresInThirtyDays)
        setSelectedIndex(1)

        history.push('/cars')
        dashboardGeneratedTitle('TÜV läuft in 30 Tagen ab')
    }

    const handleAllVehiclesNavigate = () => {
        history.push('/cars')
        setSelectedIndex(1)
    }

    return (
        <Box className={classes.dashboardContainer}>
            <Box className={classes.titleDividerBox}>
                <Typography className={classes.title} variant="h4">
                    {`Hallo, ${user.firstName} ${user.lastName}`}
                </Typography>
                <Divider className={classes.divider} />
            </Box>

            <Box className={classes.boxFlexContainer}>
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
                                {myVehicles.length}
                            </Typography>
                            <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleAllVehiclesNavigate}>
                                {t('MyVehicles')}
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
                                    {UserTUVExpiresInThirtyDays.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateTuvThirtyDaysVehicles}>
                                    {t('Dashboard.tuvBtn30')}
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {UserTUVExpiresInFourteenDays.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} className={classes.btnWarning} onClick={handleNavigateTuvFourteenVehicles}>
                                    {t('Dashboard.tuvBtn14')}
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {UserTUVExpired.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} className={classes.btnDanger} onClick={handleNavigateTuvExpiredVehicles}>
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
                                    {myVehiclesWithCreditsContractExpiringInTwoMonths.length}
                                </Typography>
                                <Button size="small" variant="text" style={{ marginTop: 20 }} color="secondary" onClick={handleNavigateFinansesVehicles}>
                                    {t('Dashboard.financingStatusBtnFinancing')}
                                </Button>
                            </Box>
                            <Box className={classes.dashboardContentFlexTuv}>
                                <Typography className={classes.countTitle} variant="h4" component="h4">
                                    {myVehiclesWithLeasingsContractExpiringInTwoMonths.length}
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
    )
}

export default withNamespaces()(DashboardScreen)
