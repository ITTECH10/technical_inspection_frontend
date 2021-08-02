import React, {useContext, useState} from 'react'
import axios from 'axios'

const DataContext = React.createContext()

export const useData = () => {
    return useContext(DataContext)
}

const DataContextProvider = ({children}) => {
    const [authenticated, setAuthenticated] = useState(false)
    const [loading, setLoading] = useState(false)

    const logout = () => {
        localStorage.removeItem('token')
        setAuthenticated(false)
        delete axios.defaults.headers.common['Authorization']
    }

    const value = {
        authenticated,
        setAuthenticated,
        loading,
        setLoading,
        logout
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContextProvider
