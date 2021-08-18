import React from 'react'
import { Grid, Typography, Paper, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alerts from '../components/UI/Alerts'
import { useHistory } from 'react-router'

const useStyles = makeStyles(theme => ({
    mainContainer: {},
    privacyTitle: {
        marginBottom: 30
    },
    visibleItem: {
        // padding: 10
    },
    paperRoot: {
        padding: 20
    },
    privacyInfoIntro: {
        color: '#666',
        marginBottom: 30
    },
    privacyHeadingOne: {},
    privacyActionBtns: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 10
    }
}))

const PrivacyPolicyScreen = () => {
    const classes = useStyles()
    const [privacyAccepted, setPrivacyAccepted] = React.useState(false)
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const history = useHistory()

    let navigateTimeout

    React.useEffect(() => {
        return () => {
            clearTimeout(navigateTimeout)
        }
    }, [navigateTimeout])

    React.useEffect(() => {
        localStorage.setItem('privacyAccepted', privacyAccepted)
    }, [privacyAccepted])

    const handlePrivacyAcception = () => {
        setPrivacyAccepted(true)
        localStorage.setItem('privacyAccepted', privacyAccepted)
        setAlertOpen(true)
        setAlertMsg("Thank you for reading and accepting our privacy policy!")

        navigateTimeout = setTimeout(() => {
            history.push('/')
        }, 3000)
    }

    const handlePrivacyDissagrement = () => {
        setPrivacyAccepted(false)
        setAlertOpen(true)
        setAlertMsg("Note! You won't be able to LOG IN if you don't accept our privacy policy.")
    }

    return (
        <>
            <Alerts message={alertMsg} open={alertOpen} handleOpening={setAlertOpen} severity={alertMsg.startsWith('Thank you') ? 'success' : 'error'} />
            <Grid container className={classes.mainContainer}>
                <Grid sm={3} item />
                <Grid sm={6} item className={classes.visibleItem}>
                    <Paper className={classes.paperRoot} elevation={1}>
                        <Typography className={classes.privacyTitle} align="center" variant="h5">
                            Technical Inspection Privacy Policy
                        </Typography>
                        <Typography className={classes.privacyInfoIntro}>
                            The protection of your privacy when processing personal data is important to us. We only collect, process and use your personal data in compliance with the following principles and in observance of the applicable data protection legislation.
                        </Typography>
                        <Typography className={classes.privacyHeadingOne} variant="h6">
                            1. Collection and storage of personal data and the type and purpose of their use
                        </Typography>

                        <Typography className={classes.privacyTextA}>
                            <Typography style={{ fontWeight: '600', margin: '10px 0' }}>a. When you visit the website</Typography>

                            When you visit the website https://technical-inspection-frontend.vercel.app/ , information is automatically sent by the browser used on your end device to our website servers hosted by Cloudflare Inc (101 Townsend St., San Francisco, CA 94107) and DigitalOcean LLC (101 Avenue of the Americas 10th Floor, New York, NY 10013) in the USA. This information is stored temporarily in what is called a log file. The following information is collected during this process without any action on your part and stored until it automatically deleted in accordance with applicable data protection regulations:

                            • IP address of the requesting computer,
                            • Date and time of access,
                            • Name and URL of the requested file,
                            • Website from which access is obtained (Referrer URL),
                            • Browser used and, where applicable, your computer’s operating system and the identity of your access provider.
                            The legal basis for the data processing is Article 6 (1) (f) of the General Data Protection Regulation (GDPR). Our legitimate interest is based on the data collection purposes listed above. We do not on any account use the data collected for the purpose of identifying you. The provision of this data is not required by law or contract or to enter into a contract. You are not obliged to provide the personal data. It is not, however, possible to access the website if the data are not provided.

                            We also use cookies and analysis services when you visit our website. More detailed explanations can be found below.
                        </Typography>

                        <Box className={classes.privacyActionBtns}>
                            <Button onClick={handlePrivacyAcception} variant="contained" color='primary'>I agree</Button>
                            <Button onClick={handlePrivacyDissagrement} variant="contained" color='primary' style={{ marginLeft: 10 }}>I dissagree</Button>
                        </Box>
                    </Paper>
                </Grid>
                <Grid sm={3} item />
            </Grid>
        </>
    )
}

export default PrivacyPolicyScreen
