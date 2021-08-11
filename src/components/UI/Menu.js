import React, { useState, useEffect } from 'react';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useData } from '../../contexts/DataContext';

const useStyles = makeStyles(theme => ({
    root: {
        width: 240,
        position: 'relative',
        zIndex: 1400,
    },
    listItemRoot: {
        cursor: 'pointer'
    },
    backdropRoot: {
        zIndex: '-1 !important'
    }
}))

export default function TemporaryDrawer() {
    const [open, setOpen] = useState(true)
    const history = useHistory()
    const classes = useStyles()
    const matches = useMediaQuery('(min-width:600px)');
    const {user} = useData()

    useEffect(() => {
        if (!matches) {
            setOpen(false)
        }

        if (matches) {
            setOpen(true)
        }
    }, [matches])

    const handleOpening = () => {
        setOpen(prevState => !prevState)
    }

    const handleClosing = () => {
        setOpen(false)
    }

    const onHandleNavigation = (route) => {
        history.push(route)
        if (!matches) {
            setOpen(false)
        }
    }

    return (
        <div>
            <React.Fragment>
                {!matches && <IconButton onClick={handleOpening}><MenuIcon /></IconButton>}
                <Drawer style={{zIndex: 0, width: 240}} elevation={1} PaperProps={{ className: classes.root, style: {paddingTop: !matches && 56} }} BackdropProps={{ invisible: true, open: matches ? false : true, className: classes.backdropRoot }} anchor="left" open={open} onClose={handleClosing}>
                    {user.role === 'admin' ?
                    <List>
                        <ListItem className={classes.listItemRoot} onClick={() => onHandleNavigation(`/profile`)}>
                            <ListItemIcon><AccountCircleIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="User" />
                        </ListItem>
                        <ListItem className={classes.listItemRoot} onClick={() => onHandleNavigation('/')}>
                            <ListItemIcon><GroupIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Customers" />
                        </ListItem>
                        <ListItem className={classes.listItemRoot} onClick={() => onHandleNavigation('/cars')}>
                            <ListItemIcon><DriveEtaIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Fahrzeuge" />
                        </ListItem>
                        <ListItem className={classes.listItemRoot} onClick={() => onHandleNavigation('/insurances')}>
                            <ListItemIcon><VerifiedUserIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Insurances" />
                        </ListItem>
                        <ListItem className={classes.listItemRoot} onClick={() => onHandleNavigation('/banks')}>
                            <ListItemIcon><AccountBalanceIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Banks" />
                        </ListItem>
                    </List>
                    : 
                    <List>
                        <ListItem className={classes.listItemRoot} onClick={() => onHandleNavigation('/')}>
                            <ListItemIcon><DriveEtaIcon color="primary" /></ListItemIcon>
                            <ListItemText primary="Fahrzeuge" />
                        </ListItem>
                    </List> }
                </Drawer>
            </React.Fragment>
        </div>
    );
}
