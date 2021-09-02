import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography, TextField, Paper } from '@material-ui/core'
import { useData } from '../../../contexts/DataContext'
import EditUserDetails from './EditUserDetails'
import DeleteUser from './DeleteUser'
import { withNamespaces } from 'react-i18next'
import MailOnClick from './MailOnClick'

const useStyles = makeStyles(theme => ({
    root: {
        // height: 100,
        padding: 10,
        marginBottom: 10,
        borderBottom: '1px solid #eee'
    },
    actionsFlexContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 5,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        }
    },
    actionBtnsBoxFlex: {
        display: 'flex',
        alignItems: 'center',
    },
    userRow: {
        marginBottom: 5,
    }
}))

const UserInfoBlock = ({ t }) => {
    const { selectedUser } = useData()
    const classes = useStyles()

    return (
        selectedUser &&
        <>
            <Box className={classes.actionsFlexContainer}>
                <Typography variant="h4">{`${selectedUser.firstName} ${selectedUser.lastName}`}</Typography>
                <Box className={classes.actionBtnsBoxFlex}>
                    <MailOnClick />
                    <EditUserDetails userId={selectedUser._id} />
                    <DeleteUser userId={selectedUser._id} />
                </Box>
            </Box>
            <Paper className={classes.root}>
                <Box className={classes.userRow}>
                    {/* <Typography>Name: {selectedUser.firstName}</Typography> */}
                    <TextField
                        value={`${t('FirstNameInputLabel')}: ${selectedUser.firstName}`}
                        disabled
                        fullWidth
                    />
                </Box>
                <Box className={classes.userRow}>
                    <TextField
                        value={`${t('LastNameInputLabel')}: ${selectedUser.lastName}`}
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
                        value={`${t('PhoneNumberInputLabel')}: ${selectedUser.phoneNumber}`}
                        disabled
                        fullWidth
                    />
                </Box>
                <Box className={classes.userRow}>
                    <TextField
                        value={`Strasse: ${selectedUser.street}`}
                        disabled
                        fullWidth
                    />
                </Box>
                <Box className={classes.userRow}>
                    <TextField
                        value={`Post code: ${selectedUser.postCode}`}
                        disabled
                        fullWidth
                    />
                </Box>
                <Box className={classes.userRow}>
                    <TextField
                        value={`City: ${selectedUser.city}`}
                        disabled
                        fullWidth
                    />
                </Box>
            </Paper>
        </>
    )
}

export default withNamespaces()(UserInfoBlock)
