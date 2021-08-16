import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'
import { useData } from '../../../contexts/DataContext'

const useStyles = makeStyles(theme => ({
    root: {
        // height: 100,
        padding: '0 5px 10px 5px',
        marginBottom: 10,
        borderBottom: '1px solid #eee'
    },
}))

const UserInfoBlock = () => {
    const { selectedUser } = useData()
    const classes = useStyles()

    return (
        selectedUser &&
        <Box className={classes.root}>
            <Typography variant="h4">Customer</Typography>
            <Box className={classes.userRow}>
                Name: {`${selectedUser.firstName} ${selectedUser.lastName}`}
            </Box>
            <Box className={classes.userRow}>
                E-mail: {selectedUser.email}
            </Box>
        </Box>
    )
}

export default UserInfoBlock
