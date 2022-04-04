import React from 'react'
import { Grid, Typography, Box, Paper, TextField, useMediaQuery, Divider } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles'
import { useData } from '../contexts/DataContext';
import EditUserDetails from '../components/UI/Users/EditUserDetails';
import { withNamespaces } from 'react-i18next';
import Page from '../components/Page'

const useStyles = makeStyles(theme => ({
    myProfileEdit: {
        display: 'flex',
        alignItems: 'center'
    },
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
            // height: '100%'
        },
        [theme.breakpoints.up('md')]: {
            width: '50%'
        },
        [theme.breakpoints.up('lg')]: {
            width: '35%',
            // height: '100%'
        },
        [theme.breakpoints.up('xl')]: {
            width: '35%',
            // height: '100%',
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

const AccountScreen = ({ t }) => {
    const classes = useStyles()
    const { user } = useData()

    const matches = useMediaQuery('(max-width: 600px)')

    return (
        <Page title="SE Carmanagement | Konto">
            <Grid container className={classes.gridContainer}>
                <Grid className={classes.gridChildTwo} xs={12} sm={12}>
                    <Box className={classes.myProfileEdit}>
                        <Typography variant="h5" style={{ padding: !matches ? '10px 0' : 0 }}>
                            {t('MyProfile')}
                        </Typography>
                        <EditUserDetails />
                    </Box>
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
                                            {t('FirstNameInputLabel')}
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
                                            {t('LastNameInputLabel')}
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
                                            {t('GenderNewUser')}
                                        </Typography>
                                        <TextField
                                            variant="standard"
                                            disabled
                                            value={user.gender === 'Mr' ? t('GenderMale') : t('GenderFemale')}
                                        />
                                    </Box>
                                </Box>

                                <Box className={classes.inputSingleBox}>
                                    <Box className={classes.inputContentVertical}>
                                        <Typography style={{ fontWeight: '400' }}>
                                            {t('CityInputLabel')}
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
                                            {t('StreetInputLabel')}
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
                                            {t('PostNumberInputLabel')}
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
                                {user.phoneNumber &&
                                    <Box className={classes.inputSingleBox}>
                                        <Box className={classes.inputContentVertical}>
                                            <Typography style={{ fontWeight: '400' }}>
                                                {`${t('PhoneNumberInputLabel')}`}
                                            </Typography>
                                            <TextField
                                                variant="standard"
                                                disabled
                                                value={user.phoneNumber}
                                            />
                                        </Box>
                                    </Box>}
                                {user.smartphoneNumber &&
                                    <Box className={classes.inputSingleBox}>
                                        <Box className={classes.inputContentVertical}>
                                            <Typography style={{ fontWeight: '400' }}>
                                                {`${t('PhoneNumberInputLabel')} ${t('SmartphoneLabel')}`}
                                            </Typography>
                                            <TextField
                                                variant="standard"
                                                disabled
                                                value={user.smartphoneNumber}
                                            />
                                        </Box>
                                    </Box>}
                            </Box>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Page>
    )
}

export default withNamespaces()(AccountScreen)
