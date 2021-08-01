import React from 'react'
import { Typography, Grid, Paper, Box, TextField } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import AppLogo from './../assets/images/car-insurance.svg'

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
        height: 130,
        width: 130,
        margin: '0 auto'
    },
    logo: {
        height: '100%',
        width: '100%'
    }
}))

const Login = () => {
    const classes = useStyles()

    return (
        <Grid container className={classes.mainContainer}>
            <Grid xs={0} sm={3} className={classes.gridChildOne} />

            <Grid xs={12} sm={6} className={classes.gridChildTwo}>
                <Paper elevation="2" className={classes.mainPaper}>
                    <Box className={classes.mainBox}>
                        <Box className={classes.logoBox}>
                            <img src={AppLogo} alt="Logo" className={classes.logo} />
                        </Box>
                        <Typography style={{fontWeight: '500'}} variant="h4" align="center">Login</Typography>
                        <Box className={classes.inputContainer}>
                            <form className={classes.inputForm}>
                                <TextField className={classes.input} id="standard-basic" label="E-Mail" />
                                <TextField className={classes.input} id="standard-basic" label="Password" />
                            </form>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            <Grid xs={0} sm={3} className={classes.gridChildThree} />
        </Grid>
    )
}

export default Login
