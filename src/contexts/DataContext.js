import React, {useContext, useState, useCallback} from 'react'
import axios from 'axios'

const DataContext = React.createContext()

export const useData = () => {
    return useContext(DataContext)
}

const DataContextProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)
    const [appLoading, setAppLoading] = useState(false)
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

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
        getSelectedUser,
        selectedUser,
        setSelectedUser,
        appLoading
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
