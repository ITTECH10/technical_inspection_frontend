import React, {useContext, useState, useCallback} from 'react'
import axios from 'axios'

const DataContext = React.createContext()

export const useData = () => {
    return useContext(DataContext)
}

const DataContextProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        setAuthenticated(false)
        delete axios.defaults.headers.common['Authorization']
        window.location.replace('/') //replace later with actual history api
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
        setLoading(true)
        axios('/users/me').then(res => {
            if(res.status === 200) {
                setUser(res.data.user)
                setLoading(false)
            }
        })
        .catch(err => {
            setLoading(false)
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
        users
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
