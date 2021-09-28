import React from 'react'
import { useData } from '../contexts/DataContext'

export const useRoleDeterminator = () => {
    const { user } = useData()
    const [role, setRole] = React.useState()

    React.useEffect(() => {
        setRole(user.role)
    }, [user])

    return { role, setRole }
}