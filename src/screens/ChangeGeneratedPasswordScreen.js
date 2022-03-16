import React from 'react'
import { withNamespaces } from 'react-i18next'
import { Box, Typography, TextField, Button, Paper, Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useData } from '../contexts/DataContext'
import Alerts from '../components/UI/Alerts'
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        height: '100vh',
        background: '#fafafa'
    },
    gridChildOne: {},
    gridChildTwo: {
        height: '60%',
        position: 'relative',
        top: '20%'
    },
    gridChildThree: {},
    mainPaper: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainBox: {
        // marginTop: 20,
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
            width: '90%'
        }
    },
    input: {
        marginBottom: 10
    },
    logoBox: {
        // width: 280,
        margin: '0 auto',
        marginTop: 20
    },
    logo: {
        height: '100%',
        width: '100%'
    },
    btnSubmit: {
        marginTop: 10,
        width: 'auto',
        margin: '0 auto'
    }
}))

const ChangeGeneratedPasswordScreen = ({ t }) => {
    const classes = useStyles()
    const history = useHistory()
    const { user, setGeneralAlertOptions } = useData()

    const [fields, setFields] = React.useState({
        currentPassword: '',
        password: '',
        confirmPassword: ''
    })

    const [alertOpen, setAlertOpen] = React.useState(false)
    const [buttonLoading, setButtonLoading] = React.useState(false)

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleAcceptSubmit = (e) => {
        e.preventDefault()

        setButtonLoading(true)

        const data = { ...fields }

        axios.put('/users/changePassword', data)
            .then(res => {
                if (res.status === 200) {
                    setButtonLoading(false)
                    setAlertOpen(true)

                    history.push('/')
                }
            })
            .catch(err => {
                // console.log(err.response)
                setButtonLoading(false)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }

    const handleDeclineSubmit = (e) => {
        e.preventDefault()

        if (!Object.values(fields).every(val => val === '')) return

        axios('/users/skipPasswordChange')
            .then(res => {
                if (res.status === 200) {
                    history.push('/')
                    history.go(0)
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

    return (
        user.firstLogIn &&
        <Page title="SE Carmanagement | Generiertes Passwort ändern" shouldNavigate={false}>
            <Alerts message="Passwort geändert!" open={alertOpen} handleOpening={setAlertOpen} />
            <Grid container className={classes.mainContainer}>
                <Grid item xs={false} sm={4} className={classes.gridChildOne} />

                <Grid item xs={12} sm={4} className={classes.gridChildTwo}>
                    <Paper elevation={2} className={classes.mainPaper}>
                        <Box className={classes.mainBox}>
                            <Box className={classes.logoBox}>
                                <Typography align="center" variant="h5">
                                    Automatisch generiertes Passwort ändern
                                </Typography>
                                <Typography align="center" variant="body2" style={{ color: '#999', margin: '5px 15px 0 15px' }}>
                                    Wenn Sie sich das Passwort, das wir für Sie erstellt haben, nicht merken können, können Sie Ihr eigenes festlegen. (Sie können dies nur einmal nach dem ersten Einloggen tun!)
                                </Typography>
                            </Box>
                            <Box className={classes.inputContainer}>
                                <form onSubmit={Object.values(fields).some(val => val !== '') ? handleAcceptSubmit : handleDeclineSubmit} className={classes.inputForm} id="form__changeCurrentPassword">
                                    <TextField
                                        fullWidth
                                        name="currentPassword"
                                        className={classes.input}
                                        id="currentPwd-screen-input"
                                        label="Aktuelles Passwort"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        name="password"
                                        className={classes.input}
                                        id="pwd-screen-input"
                                        label="Neues Passwort"
                                        type="password"
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        fullWidth
                                        name="confirmPassword"
                                        className={classes.input}
                                        id="confirmPwd-screen-input"
                                        label="Bestätigen Sie das Passwort"
                                        type="password"
                                        onChange={handleChange}
                                    />

                                    <Box style={{ textAlign: 'center' }}>
                                        <Button style={{ marginRight: 10 }} disabled={Object.values(fields).every(el => el === '')} className={classes.btnSubmit} color="primary" variant="contained" type="submit">
                                            {buttonLoading ? <CircularProgress style={{ height: 25, width: 25, color: '#fff' }} /> : 'Weiter'}
                                        </Button>
                                        <Button disabled={!Object.values(fields).every(val => val === '')} className={classes.btnSubmit} color="primary" variant="contained" type="submit">
                                            Überspringen
                                        </Button>
                                    </Box>
                                </form>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={false} sm={4} className={classes.gridChildThree} />
            </Grid>
        </Page>
    )
}

export default withNamespaces()(ChangeGeneratedPasswordScreen)
