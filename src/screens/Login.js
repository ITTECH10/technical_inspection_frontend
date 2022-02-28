import React, { useState } from 'react'
import { Grid, Paper, Box, TextField, Button, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AppLogo from './../assets/images/logo.svg'
import axios from 'axios'
import { setAuthorizationHeader } from './../utils/setAuthorizationHeader'
import { useData } from '../contexts/DataContext'
import ForgotPasswordForm from './../components/UI/Users/ForgotPasswordForm'
import PoliciesFooter from '../components/UI/Users/PoliciesFooter'
import { withNamespaces } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    mainContainer: {
        height: '100vh',
        background: '#fafafa'
    },
    gridChildOne: {
        // backgroundColor: 'red'
    },
    gridChildTwo: {
        // backgroundColor: 'green'
        height: '60%',
        position: 'relative',
        top: '20%'
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
        // height: '60%',
        marginBottom: 20,
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
    logoBox: {
        // height: 200,
        width: 280,
        margin: '0 auto',
        marginTop: 50
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

const Login = ({ history, t }) => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const { setAuthenticated, setAppLoading, appLoading, setSelectedIndex } = useData()
    const [disableSubmiting, setDisableSubmiting] = useState(false)

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = { ...fields }
        axios.post('/users/login', data).then(res => {
            // console.log(res.data)
            // setAppLoading(true)
            if (res.status === 201) {
                setAuthorizationHeader(res.data.token)
                setAuthenticated(true)

                if (!appLoading) {
                    history.push('/')
                    setSelectedIndex(0)
                }
            }
        })
            .catch(err => {
                // console.log(err.response)
                setAppLoading(false)
                setErrors({
                    message: err.response ? err.response.data.message : 'Etwas ist schief gelaufen...'
                })
            })
    }

    const classes = useStyles()

    return (
        <>
            <Grid container className={classes.mainContainer}>
                <Grid item xs={false} sm={4} className={classes.gridChildOne} />

                <Grid item xs={12} sm={4} className={classes.gridChildTwo}>
                    <Paper elevation={2} className={classes.mainPaper}>
                        <Box className={classes.mainBox}>
                            <Box className={classes.logoBox}>
                                <img src={AppLogo} alt="Logo" className={classes.logo} />
                            </Box>
                            <Box className={classes.inputContainer}>
                                <form className={classes.inputForm} onSubmit={handleSubmit} id="form__login">
                                    <TextField
                                        name="email"
                                        className={classes.input}
                                        id="mail-standard"
                                        onChange={handleChange}
                                        label="E-Mail"
                                        type="email"
                                        error={errors.message && errors.message.length > 0}
                                        helperText={errors.message && errors.message}
                                    />
                                    <TextField
                                        name="password"
                                        className={classes.input}
                                        id="pwd-standard"
                                        onChange={handleChange}
                                        label="Password"
                                        type="password"
                                        error={errors.message && errors.message.length > 0}
                                        helperText={errors.message && errors.message}
                                    />

                                    <Button disabled={disableSubmiting} className={classes.btnSubmit} color="primary" variant="contained" type="submit">{t('LoginScreenLoginButton')}</Button>
                                </form>
                                <ForgotPasswordForm onDisableLoginForm={setDisableSubmiting} />
                                <Box sx={{display: 'flex',
                                    flexDirection: 'column' ,
                                    justifyContent: 'center',
                                    textAlign: 'center'}}>
                                    <Box sx={{
                                        marginTop: 20,
                                        mt: .6 }}>
                                        Haben Sie noch keinen Zugang, dann setzen Sie sich bitte mit uns in Verbindung.
                                    </Box>
                                    <Box sx={{marginTop: 20}}>
                                        <Link href="https://www.se-carmanagement.de" target="_blank">
                                            Zurück zur Hauptseite
                                        </Link>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Grid>

                <Grid item xs={false} sm={4} className={classes.gridChildThree} />
            </Grid>
            <PoliciesFooter />
        </>
    )
}

export default withNamespaces()(Login)
