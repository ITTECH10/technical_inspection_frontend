import React, {useEffect} from 'react'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import EditUserDetails from './EditUserDetails';
import { useData } from '../../../contexts/DataContext';

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
    editBtnBox: {

    }
})

const UserInfoTab = ({userId}) => {
    const classes = useStyles()
    const {selectedUser} = useData()
    const { email, _id , lastInspected, vehicleModel } = selectedUser

    let formatedLastInspected
    if(lastInspected) {
        formatedLastInspected = lastInspected.split('T')[0].split('-').reverse().join('-')
    }

    return (
        <Box className={classes.root}>
            <Typography variant="h6" className={classes.title}>Account Settings</Typography>
            <Box className={classes.box}>
                <Typography className={classes.emailTitle}>Email address</Typography>
                <Typography className={classes.emailText}>Your email address is <span style={{ fontWeight: 'bold' }}>{email}</span></Typography>
            </Box>
            <Box className={classes.box}>
                <Typography className={classes.emailTitle}>Tehnical inspection</Typography>
                <Typography className={classes.emailText}>Your last technical inspection was on <span style={{ fontWeight: 'bold' }}>{lastInspected && formatedLastInspected}</span></Typography>
            </Box>
            <Box className={classes.box}>
                <Typography className={classes.emailTitle}>Vehicle details</Typography>
                <Typography className={classes.emailText}>Your vehicle model <span style={{ fontWeight: 'bold' }}>{vehicleModel}</span></Typography>
            </Box>

            <EditUserDetails userId={_id} />
        </Box>
    )
}

export default UserInfoTab
