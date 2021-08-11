import React from 'react'
import {Box, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useData } from '../../../contexts/DataContext'

const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: '1px solid #ccc',
    },
    emailBox: {
        marginBottom: 10
    },
    emailTitle: {},
    simpleDetailsBox: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        padding: 10,
        border: '1px solid #ccc'
    },
    infoBox: {},
    infoBoxMini: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: '1px solid #eee',
        padding: 10
    },
    infoTitleStrong: {
        fontSize: 12,
        fontWeight: 600
    },
    infoTitleWeak: {
        fontSize: 10,
        fontWeight: 400
    },
    actionButtonsBox: {
        display: 'flex',
        justifyContent: 'space-around'
    }
}))

const SelectedUserDetailed = () => {
    const classes = useStyles()
    const {myVehicles, selectedUser} = useData()
    const {email} = selectedUser

    return (
        <Box className={classes.root}>
            <Box className={classes.emailBox}>
                <Typography style={{fontWeight: 500}}>Email:</Typography>
                <Typography className={classes.emailTitle}>
                    {email}
                </Typography>
            </Box>

            <Box className={classes.simpleDetailsBox}>
                <Box className={classes.infoBox}>
                    <Box className={classes.infoBoxMini}>
                        <Typography className={classes.infoTitleStrong}>{myVehicles.length}</Typography>
                        <Typography className={classes.infoTitleWeak}>Cars</Typography>
                    </Box>
                </Box>
                <Box className={classes.infoBox}>
                    <Box className={classes.infoBoxMini}>
                        <Typography className={classes.infoTitleStrong}>22</Typography>
                        <Typography className={classes.infoTitleWeak}>Example</Typography>
                    </Box>
                </Box>
                <Box className={classes.infoBox}>
                    <Box className={classes.infoBoxMini}>
                        <Typography className={classes.infoTitleStrong}>320</Typography>
                        <Typography className={classes.infoTitleWeak}>Example</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default SelectedUserDetailed
