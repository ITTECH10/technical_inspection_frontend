import React from 'react'
import { Paper, Box, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withNamespaces } from 'react-i18next'
// import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    boxRoot: {
        height: 150,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
    },
    paperRoot: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textRoot: {
        margin: 15
    },
    btn: {}
}))

const PoliciesFooter = ({ t }) => {
    const classes = useStyles()
    // const history = useHistory()
    const [showPrivacyBanner, setShowPrivacyBanner] = React.useState(true)

    let bannerTimeout

    React.useEffect(() => {
        bannerTimeout = setTimeout(() => {
            setShowPrivacyBanner(false)
        }, 5000)
    }, [])

    React.useEffect(() => {
        return () => {
            clearTimeout(bannerTimeout)
        }
    }, [])

    return (
        showPrivacyBanner &&
        <Box className={classes.boxRoot}>
            <Paper elevation={2} className={classes.paperRoot}>
                <Typography variant="body2" className={classes.textRoot}>
                    {t('LoginScreenPrivacyPolicyWarning')}
                </Typography>
                <Button size="small" onClick={() => setShowPrivacyBanner(false)} color="primary" variant="contained" className={classes.btn}>{t('LoginScreenPrivacyPolicyButtonConfirm')}</Button>
            </Paper>
        </Box>
    )
}

export default withNamespaces()(PoliciesFooter)
