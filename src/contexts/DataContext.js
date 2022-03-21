import React, { useContext, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const DataContext = React.createContext()

export const useData = () => {
    return useContext(DataContext)
}

const DataContextProvider = ({ children }) => {
    const history = useHistory()
    // GENERAL
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [appLoading, setAppLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [dashboardAdaptiveTitle, setDashboardAdaptiveTitle] = useState('')
    const [generalAlertOptions, setGeneralAlertOptions] = useState({
        open: false,
        message: '',
        severity: '',
        hideAfter: 2500
    })

    // USERS
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    // VEHICLES
    const [vehicles, setVehicles] = useState([])
    const [myVehicles, setMyVehicles] = useState([])
    const [customersVehicles, setCustomersVehicles] = useState([])
    const [selectedCar, setSelectedCar] = useState([])
    const [carImages, setCarImages] = useState([])
    const [vehiclesPage, setVehiclesPage] = useState('allVehicles')

    // INSURANCES
    const [insurances, setInsurances] = useState([])
    const [selectedCarInsurance, setSelectedCarInsurance] = useState({})

    // BANKS
    const [banks, setBanks] = useState([])
    const [selectedCarBank, setSelectedCarBank] = useState({})

    // CONTRACTS
    const [selectedPayment, setSelectedPayment] = useState({})

    const dashboardGeneratedTitle = (title) => {
        if (vehiclesPage === 'customersVehicles') {
            setVehiclesPage('allVehicles')
        }

        setDashboardAdaptiveTitle(title)
    }

    const getCorespondingPayment = useCallback((paymentId) => {
        axios.get(`/cars/payments/${paymentId}`).then(res => {
            if (res.status === 200) {
                setSelectedPayment(res.data.payments)
            }
        }).catch(err => {
            // console.log(err.response)
            setGeneralAlertOptions({
                open: true,
                message: 'Beim Abrufen der Zahlungsdaten ist ein Fehler aufgetreten.',
                severity: 'error',
                hideAfter: 2500
            })
        })
    }, [])

    const getCorespondingInsurance = useCallback((insuranceId) => {
        axios.get(`/insuranceHouse/${insuranceId}`).then(res => {
            if (res.status === 200) {
                setSelectedCarInsurance(res.data.insurance)
            }
        }).catch(err => {
            // console.log(err.response)
            setGeneralAlertOptions({
                open: true,
                message: 'Beim Abrufen der Versicherungsdaten ist ein Fehler aufgetreten.',
                severity: 'error',
                hideAfter: 2500
            })
        })
    }, [])


    const acceptPrivacyPolicy = useCallback((id) => {
        axios(`/users/me/privacyPolicy/${id}`)
            .then(res => {
                // console.log(res.data)
            })
            .catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const getAllVehicles = useCallback(() => {
        axios.get('/cars')
            .then(res => {
                // console.log(res.data)
                if (res.status === 200) {
                    setVehicles(res.data.vehicles)
                }
            })
            .catch(err => {
                // setAppLoading(false)
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Beim Abrufen aller Fahrzeuge ist ein Fehler aufgetreten.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const getCarImages = (id) => {
        axios(`/cars/images/${id}`).then(res => {
            setCarImages(res.data.images)
        })
            .catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Es gab einen Fehler beim Laden von Fahrzeugbildern.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }

    const logout = useCallback((history) => {
        setAppLoading(true)
        localStorage.removeItem('authenticated')
        localStorage.removeItem('user')
        localStorage.removeItem('selectedUser')
        localStorage.removeItem('menuSelectedIndex')
        setAuthenticated(false)
        delete axios.defaults.headers.common['Authorization']
        setTimeout(() => {
            setAppLoading(false)
            history.push('/')
            history.go(0) //non optional :/
        }, 2000)
    }, [])

    const getAllUsers = useCallback(() => {
        axios('/users').then(res => {
            setUsers(res.data.users)
        })
            .catch(err => {
                // setAppLoading(false)
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Es gab einen Fehler beim Laden von Kunden.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const getUserData = useCallback(() => {
        setAppLoading(true)
        axios('/users/me').then(res => {
            if (res.status === 200) {
                setUser(res.data.user)
                if (res.data.user.role !== 'admin') {
                    setSelectedUser(res.data.user)
                }
                localStorage.setItem('user', JSON.stringify(res.data.user))
                setAppLoading(false)
            }
        })
            .catch(err => {
                setAppLoading(false)
                // console.log(err.response)
                if (err.response && err.response.data.message.includes('Ungültiges Token!')) {
                    logout(history)
                }
                setGeneralAlertOptions({
                    open: true,
                    message: 'Es ist ein Fehler beim Laden Ihrer Kontodaten aufgetreten.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const getSelectedUser = useCallback((id) => {
        axios(`/userst/${id}`).then(res => {
            if (res.status === 200) {
                setSelectedUser(res.data.user)
                localStorage.setItem('selectedUser', JSON.stringify(res.data.user))
            }
        })
            .catch(err => {
                // setLoading(false)
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Es ist ein Fehler beim Laden von Kundendaten aufgetreten.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const getSelectedCar = useCallback((id) => {
        axios(`/cars/car/${id}`).then(res => {
            if (res.status === 200) {
                setSelectedCar(res.data.vehicle)
                getCarImages(id)
            }
        })
            .catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Beim Laden der Fahrzeugdaten ist ein Fehler aufgetreten.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const getUserVehicles = useCallback((id) => {
        // setAppLoading(true)

        axios(`/cars/${id}`).then(res => {
            if (res.status === 200) {
                setMyVehicles(res.data.userVehicles)
                // setAppLoading(false)
            }
        })
            .catch(err => {
                // setAppLoading(false)
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Beim Laden der Daten von Kundenfahrzeugen ist ein Fehler aufgetreten.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const getInsurances = useCallback(() => {
        axios.get('/insuranceHouse').then(res => {
            if (res.status === 200) {
                setInsurances(res.data.insurances)
            }
        })
            .catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Es gab einen Fehler beim Laden von Versicherungen.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const getBanks = useCallback(() => {
        axios.get('/payment').then(res => {
            if (res.status === 200) {
                setBanks(res.data.banks)
            }
        })
            .catch(err => {
                // console.log(err.response)
                setGeneralAlertOptions({
                    open: true,
                    message: 'Es gab einen Fehler beim Laden von Banken.',
                    severity: 'error',
                    hideAfter: 2500
                })
            })
    }, [])

    const value = {
        authenticated,
        setAuthenticated,
        loading,
        setLoading,
        setAppLoading,
        logout,
        getUserData,
        user,
        getAllUsers,
        users,
        setUsers,
        myVehicles,
        setMyVehicles,
        setUser,
        getSelectedUser,
        selectedUser,
        setSelectedUser,
        appLoading,
        getUserVehicles,
        insurances,
        getInsurances,
        setInsurances,
        banks,
        setBanks,
        getBanks,
        getSelectedCar,
        selectedCar,
        setSelectedCar,
        selectedCarInsurance,
        setSelectedCarInsurance,
        selectedCarBank,
        setSelectedCarBank,
        getCarImages,
        carImages,
        setCarImages,
        getAllVehicles,
        vehicles,
        setVehicles,
        customersVehicles,
        setCustomersVehicles,
        acceptPrivacyPolicy,
        vehiclesPage,
        setVehiclesPage,
        getCorespondingPayment,
        getCorespondingInsurance,
        selectedPayment,
        setSelectedPayment,
        selectedIndex,
        setSelectedIndex,
        dashboardAdaptiveTitle,
        dashboardGeneratedTitle,
        setDashboardAdaptiveTitle,
        generalAlertOptions,
        setGeneralAlertOptions
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
