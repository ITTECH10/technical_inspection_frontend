import React from 'react'
import { useData } from '../../../contexts/DataContext'
import SelectedUserDetailed from './SelectedUserDetailed'

const UsersProfile = () => {
    const {selectedUser} = useData()
    return selectedUser._id ? <SelectedUserDetailed /> : <h4>No user selected.</h4>
     
}

export default UsersProfile
