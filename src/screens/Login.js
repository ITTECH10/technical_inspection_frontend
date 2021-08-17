import React, { useState } from 'react'
import { IconButton, Grid, Paper, Box, TextField, Button, Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import AppLogo from './../assets/images/logo.svg'
import axios from 'axios'
import { setAuthorizationHeader } from './../utils/setAuthorizationHeader'
import { useData } from '../contexts/DataContext'
import ForgotPasswordForm from './../components/UI/Users/ForgotPasswordForm'

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
        height: '60%',
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
        width: 80,
        margin: '0 auto'
    }
}))

const Login = (props) => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const { setAuthenticated, setLoading } = useData()

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
            setLoading(true)
            if (res.status === 201) {
                setAuthorizationHeader(res.data.token)
                setAuthenticated(true)
                setLoading(false)
                props.history.push('/')
            }
        })
            .catch(err => {
                setErrors({
                    message: err.response.data.message
                })
                setLoading(false)
                console.log(err.response)
            })
    }

    const classes = useStyles()

    return (
        <Grid container className={classes.mainContainer}>
            <Grid item xs={false} sm={3} className={classes.gridChildOne} />

            <Grid item xs={12} sm={6} className={classes.gridChildTwo}>
                <Paper elevation={2} className={classes.mainPaper}>
                    <Box className={classes.mainBox}>
                        <Box className={classes.logoBox}>
                            <img src={AppLogo} alt="Logo" className={classes.logo} />
                        </Box>
                        {/* <Typography style={{ fontWeight: '500' }} variant="h4" align="center">Login</Typography> */}
                        <Box className={classes.inputContainer}>
                            <form className={classes.inputForm} onSubmit={handleSubmit} id="form__login">
                                <TextField name="email" autoFocus className={classes.input} id="mail-standard" onChange={handleChange} label="E-Mail" type="email" error={errors.message && errors.message.length > 0} helperText={errors.message && errors.message} />
                                <TextField name="password" className={classes.input} id="pwd-standard" onChange={handleChange} label="Password" type="password" error={errors.message && errors.message.length > 0} helperText={errors.message && errors.message} />

                                <Button className={classes.btnSubmit} color="primary" variant="contained" type="submit">Login</Button>
                                <ForgotPasswordForm />
                            </form>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={false} sm={3} className={classes.gridChildThree} />
        </Grid>
    )
}

export default Login
