import React, { useState } from 'react'
import axios from 'axios'
import { useData } from '../contexts/DataContext'
// mui
import { Box, Typography, TextField, IconButton as Icon, useMediaQuery } from '@material-ui/core'
import PlaceIcon from '@material-ui/icons/Place';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// others
import { Helmet } from 'react-helmet-async';
import Page from '../components/Page'
import { setAuthorizationHeader } from './../utils/setAuthorizationHeader'
import { withNamespaces } from 'react-i18next'
import ForgotPasswordForm from './../components/UI/Users/ForgotPasswordForm'
import PoliciesFooter from '../components/UI/Users/PoliciesFooter'

const NewLogin = ({ history, t }) => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    const { setAuthenticated, setAppLoading, appLoading, setSelectedIndex, setGeneralAlertOptions } = useData()
    const [disableSubmiting, setDisableSubmiting] = useState(false)

    const matches = useMediaQuery('(min-width:600px)');

    const handleChange = (e) => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setDisableSubmiting(true)

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
                setDisableSubmiting(false)
                setAppLoading(false)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server error...',
                    severity: 'error',
                    hideAfter: 5000
                })
            })
    }

    return (
        <Page title="Fuhrparkmanager">
            <Helmet>
                <link rel="stylesheet" href="style.css" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            </Helmet>
            <Box className="wrapper">
                {matches &&
                    <Box component="header" className="header-login">
                        <Box className="logo">
                            <img src="logo.svg" />
                        </Box>
                        <Box className="separator" />
                        <Box>
                            <Box className="info">
                                <Box className="street">
                                    <Icon>
                                        <PlaceIcon color="error" />
                                    </Icon>
                                    <Typography ><a href="https://goo.gl/maps/th6gNdvVJ6ihiUA3A">Geltinger Str. 23, 85652 Pliening</a></Typography>
                                </Box>
                                <Box className="telephone">
                                    <Icon>
                                        <PhoneIcon color="error" />
                                    </Icon>
                                    <Typography ><a href="+4981212243822">+49 8121 22 43 8 – 22</a></Typography>
                                </Box>
                                <Box className="mail">
                                    <Icon>
                                        <MailIcon color="error" />
                                    </Icon>
                                    <Typography ><a href="mailto:info@se-carmanagement.de">info@se-carmanagement.de</a></Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>}
                <Box sx={{ px: matches ? 0 : '20px' }} component="main">
                    <Box className="screen">
                        <Box className="screen__content">
                            <Box className="logo-button">
                                <div />
                            </Box>
                            <Box component="form" onSubmit={handleSubmit} className="login">
                                <Box className="login__heading"><h2>Fuhrparkmanager</h2></Box>
                                <Box className="login__subheading">
                                    Haben Sie noch keinen Zugang, dann setzen Sie sich bitte mit uns in Verbindung.
                                </Box>
                                <Box className="login__field">
                                    <i className="login__icon fas fa-user"></i>
                                    <TextField
                                        name="email"
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                        type="text"
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: 5,
                                            fontWeight: 700,
                                            fontSize: 'medium',
                                            fontFamily: 'Eurostile, sans-serif'
                                        }}
                                        fullWidth
                                        placeholder="Email"
                                    />
                                </Box>
                                <Box className="login__field">
                                    <i className="login__icon fas fa-lock"></i>
                                    <TextField
                                        name="password"
                                        onChange={handleChange}
                                        variant="outlined"
                                        size="small"
                                        type="password"
                                        style={{
                                            backgroundColor: '#fff',
                                            borderRadius: 5,
                                            fontWeight: 700,
                                            fontSize: 'medium',
                                            fontFamily: 'Eurostile, sans-serif'
                                        }}
                                        fullWidth
                                        placeholder="Passwort"
                                    />
                                </Box>
                                <button className="button login__submit" type="submit">
                                    <Icon style={{ '&:hover': { boxShadow: 'none !important' }, padding: '5px' }}>
                                        <ExitToAppIcon style={{ color: '#fff' }} />
                                    </Icon>
                                    <span className="button__text">Anmelden</span>
                                </button>
                                {/* <Box className="forgot_password">
                                    <a href="">Passwort vergessen</a>
                                </Box> */}
                                <ForgotPasswordForm onDisableLoginForm={setDisableSubmiting} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box component="footer" sx={{ fontSize: matches ? '1rem' : '.5rem', color: '#fff' }}>
                    <Box sx={{ flexDirection: 'column', ml: matches ? 0 : 1 }}>
                        <Box sx={{ mb: 1 }}>&copy; Copyright SE-Carmanagement 2021 - 2022 | Anschaffung, Fuhrparkmanagement und
                            Schadenservice</Box>
                        <Box>
                            <a href="https://goo.gl/maps/th6gNdvVJ6ihiUA3A">Geltinger Str. 23, 85652 Pliening</a>
                        </Box>
                        <Box sx={{ my: .5 }}>
                            <a href="+4981212243822">+49 8121 22 43 8 – 22</a>
                        </Box>
                        <Box>
                            <a href="mailto:info@se-carmanagement.de">info@se-carmanagement.de</a>
                        </Box>
                    </Box>
                    <Box className="separator"></Box>
                    <Box className="links">
                        <Box className="column">
                            <a href="http://sec.togemaxx.de/impressum/">Impressum</a> <span>|</span> <a href="http://sec.togemaxx.de/datenschutzerklaerun">Datenschutz</a></Box>
                    </Box>
                </Box>
            </Box>
            <PoliciesFooter />
        </Page>
    )
}

export default withNamespaces()(NewLogin)