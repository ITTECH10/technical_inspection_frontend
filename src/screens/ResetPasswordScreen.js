import React from 'react'
import { Grid, Paper, Box, TextField, Button, Typography, CircularProgress, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useData } from '../contexts/DataContext'
import { useHistory } from 'react-router-dom'
import Alerts from './../components/UI/Alerts'
import { setAuthorizationHeader } from './../utils/setAuthorizationHeader'
import { withNamespaces } from 'react-i18next'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        height: '100vh'
    },
    gridChildOne: {
        // backgroundColor: 'red'
    },
    gridChildTwo: {
        // backgroundColor: 'green'
    },
    gridChildThree: {
        // backgroundColor: 'blue'
    },
    mainPaper: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBox: {
        width: '100%',
    },
    inputContainer: {
        marginTop: 5
    },
    inputForm: {
        display: 'flex',
        flexDirection: 'column',
        width: '60%',
        margin: '0 auto',
        [theme.breakpoints.up('md')]: {
            width: '50%'
        }
    },
    btnSubmit: {
        marginTop: 10,
        width: 80,
        margin: '0 auto'
    }
}))

const ResetPasswordScreen = ({ t }) => {
    const { setAuthenticated, setGeneralAlertOptions } = useData()
    const [fields, setFields] = React.useState({
        password: '',
        confirmPassword: ''
    })
    const [buttonLoading, setButtonLoading] = React.useState(false)
    const [alertOpen, setAlertOpen] = React.useState(false)

    const history = useHistory()

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const tokenId = history.location.pathname.split('/')[2].replace('.', '')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (Object.values(fields).every(val => val === '')) return

        setButtonLoading(true)

        const data = { ...fields }
        axios.post(`/users/resetPassword/${tokenId}`, data).then(res => {
            if (res.status === 200) {
                setAlertOpen(true)

                setTimeout(() => {
                    setAuthorizationHeader(res.data.token)
                    setButtonLoading(false)
                    setAuthenticated(true)
                    history.push('/')
                }, 2000)
            }
        })
            .catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }

    const classes = useStyles()

    return (
        <Page title="SE Carmanagement | Passwort zurücksetzen">
            <Alerts message={t('AlertGeneralSuccessful')} open={alertOpen} handleOpening={setAlertOpen} />
            <Grid container className={classes.mainContainer}>
                <Grid item xs={false} sm={3} className={classes.gridChildOne} />

                <Grid item xs={12} sm={6} className={classes.gridChildTwo}>
                    <Paper elevation={2} className={classes.mainPaper}>
                        <Box className={classes.mainBox}>
                            <Typography align="center" variant="h4">Reset Your Password</Typography>
                            <Box className={classes.inputContainer}>
                                <form onSubmit={handleSubmit} className={classes.inputForm}>
                                    <TextField autoFocus name="password" className={classes.input} id="pwd-standard" onChange={handleChange} label="Password" type="password" />
                                    <TextField name="confirmPassword" className={classes.input} id="confirmPwd-standard" onChange={handleChange} label="Confirm Password" type="password" />

                                    <Button className={classes.btnSubmit} color="primary" variant="contained" type="submit">
                                        {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Reset'}
                                    </Button>
                                    <Link style={{ textAlign: 'center', cursor: 'pointer', marginTop: 5 }} onClick={() => history.push('/')}>Return to home</Link>
                                </form>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid
                    item
                    xs={false}
                    sm={3}
                    className={classes.gridChildThree}
                />
            </Grid>
        </Page>
    )
}

export default withNamespaces()(ResetPasswordScreen)
