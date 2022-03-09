import React, { useState } from 'react'
import axios from 'axios'
import { useData } from '../contexts/DataContext'
// mui
import { Box, Typography, TextField } from '@material-ui/core'
// others
import { Helmet } from 'react-helmet-async';
import Page from '../components/Page'
import { setAuthorizationHeader } from './../utils/setAuthorizationHeader'
import { withNamespaces } from 'react-i18next'

const NewLogin = ({ history, t }) => {
    const [fields, setFields] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const { setAuthenticated, setAppLoading, appLoading, setSelectedIndex, setGeneralAlertOptions } = useData()
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
                <Box component="header" className="header-login">
                    <Box className="logo">
                        <img src="logo.svg" />
                    </Box>
                    <Box className="separator" />
                    <Box>
                        <Box className="info">
                            <Box className="street"><span className="material-icons red-color right-margin">place</span>
                                <Typography style={{fontFamily: 'Eurostile, sans-serif'}}><a href="https://goo.gl/maps/th6gNdvVJ6ihiUA3A">Geltinger Str. 23, 85652 Pliening</a></Typography>
                            </Box>
                            <Box className="telephone"><span className="material-icons red-color right-margin">phone</span>
                                <Typography style={{fontFamily: 'Eurostile, sans-serif'}}><a href="+4981212243822">+49 8121 22 43 8 – 22</a></Typography>
                            </Box>
                            <Box className="mail"><span className="material-icons red-color right-margin">mail</span>
                                <Typography style={{fontFamily: 'Eurostile, sans-serif'}}><a href="mailto:info@se-carmanagement.de">info@se-carmanagement.de</a></Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box component="main">
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
                                    <span className="material-icons">login</span>
                                    <span className="button__text">Anmelden</span>
                                </button>
                                <Box className="forgot_password">
                                    <a href="">Passwort vergessen</a>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box component="footer">
                    <Box className="copyright">
                        <Box className="column">&copy; Copyright SE-Carmanagement 2021 - 2022 | Anschaffung, Fuhrparkmanagement und
                            Schadenservice</Box>
                    </Box>
                    <Box className="separator"></Box>
                    <Box className="links">
                        <Box className="column">
                            <a href="http://sec.togemaxx.de/impressum/">Impressum</a> <span>|</span> <a href="http://sec.togemaxx.de/datenschutzerklaerun">Datenschutz</a></Box>
                    </Box>
                </Box>
            </Box>
        </Page>
    )
}

export default withNamespaces()(NewLogin)