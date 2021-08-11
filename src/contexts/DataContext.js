import React, {useContext, useState, useCallback} from 'react'
import axios from 'axios'

const DataContext = React.createContext()

export const useData = () => {
    return useContext(DataContext)
}

const DataContextProvider = ({children}) => {
    // GENERAL
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [appLoading, setAppLoading] = useState(false)

    // USERS
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})
    
    // VEHICLES
    const [myVehicles, setMyVehicles] = useState([])
    const [selectedCar, setSelectedCar] = useState([])
    
    // INSURANCES
    const [insurances, setInsurances] = useState([])
    const [selectedCarInsurance, setSelectedCarInsurance] = useState({})

    // BANKS
    const [banks, setBanks] = useState([])
    const [selectedCarBank, setSelectedCarBank] = useState({})

    const logout = useCallback((history) => {
        localStorage.removeItem('token')
        setAuthenticated(false)
        delete axios.defaults.headers.common['Authorization']
        history.push('/')
        history.go(0)
    }, [])

    const getAllUsers = useCallback(() => {
        axios('/users').then(res => {
            setUsers(res.data.users)
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    const getUserData = useCallback(() => {
        setAppLoading(true)
        axios('/users/me').then(res => {
            if(res.status === 200) {
                setUser(res.data.user)
                setAppLoading(false)
            }
        })
        .catch(err => {
            setAppLoading(false)
            console.log(err.response)
        })
    }, [])

    const getSelectedUser = useCallback((id) => {
        setLoading(true)
        
        axios(`/users/${id}`).then(res => {
            if(res.status === 200) {
                setLoading(false)
                setSelectedUser(res.data.user)
            }
        })
        .catch(err => {
            setLoading(false)
            console.log(err.response)
        })
    }, [])

    const getSelectedCar = useCallback((id) => {        
        axios(`/cars/car/${id}`).then(res => {
            if(res.status === 200) {
                setSelectedCar(res.data.vehicle)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    const getUserVehicles = useCallback((id) => {
        // setLoading(true)
        
        axios(`/cars/${id}`).then(res => {
            if(res.status === 200) {
                setMyVehicles(res.data.userVehicles)
            }
        })
        .catch(err => {
            // setLoading(false)
            console.log(err.response)
        })
    }, [])

    const getInsurances = useCallback(() => {
        axios.get('/insuranceHouse').then(res => {
            if(res.status === 200) {
                setInsurances(res.data.insurances)
            }
        })
        .catch(err => {
            console.log(err.response)
        })
    }, [])

    const getBanks = useCallback(() => {
        axios.get('/payment').then(res => {
            if(res.status === 200) {
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
        setSelectedCarBank
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
