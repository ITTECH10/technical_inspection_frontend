import React from 'react'
import SelectedUserDetailed from './../components/UI/Users/SelectedUserDetailed'
import { Typography } from '@material-ui/core'
import { useData } from '../contexts/DataContext'

const Profile = () => {
    const {selectedUser} = useData()
    return (
        <React.Fragment>
            {selectedUser._id ? <SelectedUserDetailed /> : <Typography variant="h4">No customer selected.</Typography>}
        </React.Fragment>
    )
}

export default Profile
