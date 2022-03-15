import React from 'react'
import { Grid, Typography, Paper, Button, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Alerts from '../components/UI/Alerts'
import { useHistory } from 'react-router'
import { useData } from '../contexts/DataContext'
import { withNamespaces } from 'react-i18next'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    mainContainer: {
    },
    privacyTitle: {
        marginBottom: 30
    },
    visibleItem: {
        // position: 'relative',
        // top: 64
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

const PrivacyPolicyScreen = ({ t }) => {
    const classes = useStyles()
    const [alertOpen, setAlertOpen] = React.useState(false)
    const [alertMsg, setAlertMsg] = React.useState('')
    const history = useHistory()
    const { logout, acceptPrivacyPolicy, user } = useData()

    const navigateTimeout = React.useRef()

    React.useEffect(() => {
        return () => {
            clearTimeout(navigateTimeout.current)
        }
    }, [navigateTimeout])

    const handlePrivacyAcception = () => {
        acceptPrivacyPolicy(user._id)
        setAlertOpen(true)
        setAlertMsg("Vielen Dank, dass Sie unsere Datenschutzbestimmungen gelesen und akzeptiert haben!")

        navigateTimeout.current = setTimeout(() => {
            history.push('/changePassword')
            history.go(0)
        }, 3000)
    }

    const handlePrivacyDissagrement = () => {
        logout(history)
    }

    return (
        <Page title="SE Carmanagement | Datenschutzbestimmungen">
            <Alerts message={t('AlertPrivacyPolicyAccepted')} open={alertOpen} handleOpening={setAlertOpen} severity={alertMsg.startsWith('Thank you') ? 'success' : 'error'} />
            <Grid container className={classes.mainContainer}>
                <Grid sm={3} item />
                <Grid sm={6} item className={classes.visibleItem}>
                    <Paper className={classes.paperRoot} elevation={1}>
			    
                    </Paper>
                </Grid>
                <Grid sm={3} item />
            </Grid>
        </Page>
    )
}

export default withNamespaces()(PrivacyPolicyScreen)
