import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, TextField } from '@material-ui/core'
import { useData } from '../../../contexts/DataContext'
import EditUserDetails from './EditUserDetails'
import DeleteUser from './DeleteUser'
import ExportUserData from './ExportUserData'

const useStyles = makeStyles(theme => ({
    root: {
        // height: 100,
        padding: '0 5px 10px 5px',
        marginBottom: 10,
        borderBottom: '1px solid #eee'
    },
    actionsFlexContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 10
    },
    actionBtnsBoxFlex: {
        display: 'flex',
        alignItems: 'center',
    }
}))

const UserInfoBlock = () => {
    const { selectedUser } = useData()
    const classes = useStyles()

    return (
        selectedUser &&
        <Box className={classes.root}>
            <Box className={classes.actionsFlexContainer}>
                <Typography variant="h4">{`${selectedUser.firstName} ${selectedUser.lastName}`}</Typography>
                <Box className={classes.actionBtnsBoxFlex}>
                    <EditUserDetails userId={selectedUser._id} />
                    <DeleteUser userId={selectedUser._id} />
                </Box>
            </Box>
            <Box className={classes.userRow}>
                {/* <Typography>Name: {selectedUser.firstName}</Typography> */}
                <TextField
                    value={`Name: ${selectedUser.firstName}`}
                    disabled
                    fullWidth
                />
            </Box>
            <Box className={classes.userRow}>
                <TextField
                    value={`Surname: ${selectedUser.lastName}`}
                    disabled
                    fullWidth
                />
            </Box>
            <Box className={classes.userRow}>
                <TextField
                    value={`E-mail: ${selectedUser.email}`}
                    disabled
                    fullWidth
                />
            </Box>
            <Box className={classes.userRow}>
                <TextField
                    value={`Phone: ${selectedUser.phoneNumber}`}
                    disabled
                    fullWidth
                />
            </Box>
            <Box className={classes.userRow}>
                <TextField
                    value={`Address: ${selectedUser.address}`}
                    disabled
                    fullWidth
                />
            </Box>
        </Box>
    )
}

export default UserInfoBlock
