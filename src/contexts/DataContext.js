import React, { useContext, useState, useCallback } from 'react'
import axios from 'axios'

const DataContext = React.createContext()

export const useData = () => {
    return useContext(DataContext)
}

const DataContextProvider = ({ children }) => {
    // GENERAL
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [appLoading, setAppLoading] = useState(false)

    // USERS
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    // VEHICLES
    const [vehicles, setVehicles] = useState([])
    const [myVehicles, setMyVehicles] = useState([])
    const [selectedCar, setSelectedCar] = useState([])
    const [carImages, setCarImages] = useState([])
    const [vehiclesPage, setVehiclesPage] = useState('allVehicles')

    // INSURANCES
    const [insurances, setInsurances] = useState([])
    const [selectedCarInsurance, setSelectedCarInsurance] = useState({})

    // BANKS
    const [banks, setBanks] = useState([])
    const [selectedCarBank, setSelectedCarBank] = useState({})

    const acceptPrivacyPolicy = useCallback((id) => {
        axios(`/users/me/privacyPolicy/${id}`)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    })

    const getAllVehicles = useCallback(() => {
        // setAppLoading(true)
        axios.get('/cars')
            .then(res => {
                if (res.status === 200) {
                    setVehicles(res.data.vehicles)
                    // setAppLoading(false)
                }
            })
            .catch(err => {
                // setAppLoading(false)
                console.log(err.response)
            })
    }, [])

    const getCarImages = (id) => {
        axios(`/cars/images/${id}`).then(res => {
            setCarImages(res.data.images)
        })
            .catch(err => {
                console.log(err.response)
            })
    }

    const logout = useCallback((history) => {
        setAppLoading(true)
        localStorage.clear()
        setAuthenticated(false)
        delete axios.defaults.headers.common['Authorization']
        setTimeout(() => {
            setAppLoading(false)
            history.push('/')
            history.go(0) //non optional :/
        }, 2000)
    }, [])

    const getAllUsers = useCallback(() => {
        // setAppLoading(true)
        axios('/users').then(res => {
            setAppLoading(false)
            setUsers(res.data.users)
        })
            .catch(err => {
                setAppLoading(false)
                console.log(err.response)
            })
    }, [])

    const getUserData = useCallback(() => {
        // setAppLoading(true)
        axios('/users/me').then(res => {
            if (res.status === 200) {
                setUser(res.data.user)
                localStorage.setItem('user', JSON.stringify(res.data.user))
                setAppLoading(false)
            }
        })
            .catch(err => {
                setAppLoading(false)
                console.log(err.response)
            })
    }, [])

    const getSelectedUser = useCallback((id) => {
        // setLoading(true)

        axios(`/users/${id}`).then(res => {
            if (res.status === 200) {
                // setLoading(false)
                setSelectedUser(res.data.user)
                localStorage.setItem('selectedUser', JSON.stringify(res.data.user))
            }
        })
            .catch(err => {
                // setLoading(false)
                console.log(err.response)
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
                console.log(err.response)
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
                console.log(err.response)
            })
    }, [])

    const getInsurances = useCallback(() => {
        axios.get('/insuranceHouse').then(res => {
            if (res.status === 200) {
                setInsurances(res.data.insurances)
            }
        })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const getBanks = useCallback(() => {
        axios.get('/payment').then(res => {
            if (res.status === 200) {
                setBanks(res.data.banks)
            }
        })
            .catch(err => {
                console.log(err.response)
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
        acceptPrivacyPolicy,
        vehiclesPage,
        setVehiclesPage
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
