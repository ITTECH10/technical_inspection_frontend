import React, {useState} from 'react'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EditUserDetails from './EditUserDetails';
import DeleteUser from './DeleteUser'
import { useData } from '../../../contexts/DataContext';
import Alerts from './../Alerts'

const useStyles = makeStyles({
    root: {},
    title: {
        marginBottom: 10
    },
    emailTitle: {
        fontWeight: 'bold',
        fontSize: 14
    },
    emailText: {
        fontSize: 9
    },
    box: {
        '&:not(:last-child)': {
            marginBottom: 25
        }
    },
    actionButtonBoxFLex: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

const UserInfoTab = () => {
    const classes = useStyles()
    const {selectedUser, user} = useData()
    const { email, _id , lastInspected, vehicleModel } = selectedUser

    let userFormatedLastInspected
    let formatedLastInspected

    if(lastInspected) {
        formatedLastInspected = lastInspected.split('T')[0].split('-').reverse().join('-')
    }

    if(user.lastInspected) {
        userFormatedLastInspected = user.lastInspected.split('T')[0].split('-').reverse().join('-')
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h6" className={classes.title}>Account Settings</Typography>
            <Box className={classes.box}>
                <Typography className={classes.emailTitle}>Email address</Typography>
                <Typography className={classes.emailText}>Your email address is <span style={{ fontWeight: 'bold' }}>{user.role === 'admin' ? email : user.email}</span></Typography>
            </Box>
            <Box className={classes.box}>
                <Typography className={classes.emailTitle}>Tehnical inspection</Typography>
                <Typography className={classes.emailText}>Your last technical inspection was on <span style={{ fontWeight: 'bold' }}>{user.role === 'admin' && lastInspected ? formatedLastInspected : userFormatedLastInspected}</span></Typography>
            </Box>
            <Box className={classes.box}>
                <Typography className={classes.emailTitle}>Vehicle details</Typography>
                <Typography className={classes.emailText}>Your vehicle model <span style={{ fontWeight: 'bold' }}>{user.role === 'admin' ? vehicleModel : user.vehicleModel}</span></Typography>
            </Box>

            <Box className={classes.actionButtonBoxFLex}>
                <EditUserDetails userId={_id} />
                <DeleteUser userId={_id} />
            </Box>
        </Box>
    )
}

export default UserInfoTab
