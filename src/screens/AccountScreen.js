import React from 'react'
import { Grid, Typography, Box, Paper, TextField, useMediaQuery, Divider } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles'
import { useData } from '../contexts/DataContext';

const useStyles = makeStyles(theme => ({
    gridContainer: {
        position: 'relative',
        height: '100%'
    },
    gridChildOne: {
        display: 'none',
        marginTop: 50,
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    gridChildTwo: {
        position: 'relative',
        marginTop: 0,
        // marginLeft: -9,
        marginRight: 18,
        [theme.breakpoints.up('sm')]: {
            // marginTop: 110,
            // marginLeft: 10
        }
    },
    gridTwoContent: {
        // height: 600,
        width: '100%',
        padding: '5px 9px',
        // marginLeft: 20,
        // overflowY: 'scroll',
        [theme.breakpoints.up('sm')]: {
            // height: 520
            width: '65%',
            height: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
        [theme.breakpoints.up('lg')]: {
            width: '35%',
            height: '100%'
        },
        [theme.breakpoints.up('xl')]: {
            width: '35%',
            height: '100%',
            // margin: '0 auto'
        }
    },
    settingsContent: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContentSettings: {
        marginTop: 10,
    },
    settingsListItem: {
        marginBottom: 15,
        cursor: 'pointer'
    },
    imageBtnsContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnsProfileFlex: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 80
    },
    circleContainer: {
        height: 100,
        width: 100,
        position: 'relative',
        border: '2px solid #eee',
        borderRadius: '50%',
        margin: '0 auto'
    },
    circleIcon: {
        height: '100%',
        width: '100%'
    },

    // USER CONTENT
    userContent: {},
    inputsContent: {
        marginTop: 20
    },
    userNameBoxFlex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    inputContentVertical: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20,
        width: '100%'
    }
}))

const AccountScreen = () => {
    const classes = useStyles()
    const { user } = useData()

    const formatedBirthDate = new Date(user.birthDate).toLocaleDateString()
    const matches = useMediaQuery('(max-width: 600px)')

    return (
        <Grid container className={classes.gridContainer}>
            <Grid className={classes.gridChildTwo} xs={12} sm={12}>
                <Typography variant="h5" style={{ padding: !matches ? '10px 0' : 0 }}>
                    Mein Profil
                </Typography>
                <Divider style={{ marginBottom: 10 }} />
                <Paper elevation={2} className={classes.gridTwoContent}>
                    <Box className={classes.imageBtnsContent}>
                        <Box className={classes.circleContainer}>
                            <AccountCircleIcon color="primary" className={classes.circleIcon} />
                        </Box>
                    </Box>
                    <Box className={classes.userContent}>
                        <Typography align="center" variant="h6" style={{ letterSpacing: '.05em' }}>
                            {`${user.firstName} ${user.lastName}`}
                        </Typography>

                        <Box className={classes.inputsContent}>
                            <Box className={classes.userNameBoxFlex}>
                                <Box className={classes.inputContentVertical}>
                                    <Typography style={{ fontWeight: '400' }}>
                                        Vorname
                                    </Typography>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={user.firstName}
                                        style={{ width: '97%' }}
                                    />
                                </Box>
                                <Box className={classes.inputContentVertical}>
                                    <Typography style={{ fontWeight: '400' }}>
                                        Nachname
                                    </Typography>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={user.lastName}
                                        fullWidth
                                    />
                                </Box>
                            </Box>

                            <Box className={classes.inputSingleBox}>
                                <Box className={classes.inputContentVertical}>
                                    <Typography style={{ fontWeight: '400' }}>
                                        Geburtstag
                                    </Typography>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={formatedBirthDate}
                                    />
                                </Box>
                            </Box>

                            <Box className={classes.inputSingleBox}>
                                <Box className={classes.inputContentVertical}>
                                    <Typography style={{ fontWeight: '400' }}>
                                        Stadt
                                    </Typography>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={user.city}
                                    />
                                </Box>
                            </Box>

                            <Box className={classes.inputSingleBox}>
                                <Box className={classes.inputContentVertical}>
                                    <Typography style={{ fontWeight: '400' }}>
                                        Strasse
                                    </Typography>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={user.street}
                                    />
                                </Box>
                            </Box>

                            <Box className={classes.inputSingleBox}>
                                <Box className={classes.inputContentVertical}>
                                    <Typography style={{ fontWeight: '400' }}>
                                        Postzahl
                                    </Typography>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={user.postCode}
                                    />
                                </Box>
                            </Box>
                            <Box className={classes.inputSingleBox}>
                                <Box className={classes.inputContentVertical}>
                                    <Typography style={{ fontWeight: '400' }}>
                                        E-mail
                                    </Typography>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={user.email}
                                    />
                                </Box>
                            </Box>
                            <Box className={classes.inputSingleBox}>
                                <Box className={classes.inputContentVertical}>
                                    <Typography style={{ fontWeight: '400' }}>
                                        Telephone
                                    </Typography>
                                    <TextField
                                        variant="standard"
                                        disabled
                                        value={user.phoneNumber}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AccountScreen
