import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Logo from './../../assets/images/logo.svg'
import { useData } from '../../contexts/DataContext';
import GroupIcon from '@material-ui/icons/Group';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
// import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { useHistory } from 'react-router-dom';
import { Button, useMediaQuery } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 10,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    listItemRoot: {
        cursor: 'pointer'
    },
    logoBox: {
        height: 'auto',
        width: '28%',
        [theme.breakpoints.up('sm')]: {
            width: '15%'
        },
        [theme.breakpoints.up('md')]: {
            width: '8%'
        },
    },
    logo: {
        height: '100%',
        width: '100%',
        filter: 'brightness(0) saturate(100%) invert(100%) sepia(3%) saturate(12%) hue-rotate(103deg) brightness(105%) contrast(105%)'
    }
}));


export default function MiniDrawer({ open, setOpen }) {
    const classes = useStyles();
    const theme = useTheme();
    const { user, setVehiclesPage, logout } = useData()
    const history = useHistory()
    const [url, setUrl] = React.useState('/')
    const matches = useMediaQuery('(max-width: 600px)')

    history.listen((location, action) => {
        setUrl(location.pathname)
    })

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onHandleNavigation = (route) => {
        if (route === '/cars') {
            setVehiclesPage('allVehicles')
        }
        history.push(route)
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box className={classes.logoBox}>
                        <img src={Logo} className={classes.logo} />
                    </Box>

                    <Button style={{ position: 'absolute', right: 15 }} onClick={() => logout(history)} color="inherit">Logout</Button>
                    {url !== '/' && url !== '/banks' && url !== '/insurances' && !open && <IconButton style={{ position: 'absolute', right: 75 }} onClick={() => history.goBack()}><ArrowBackIcon /></IconButton>}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                {user.role === 'admin' ?
                    <List>
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
                    </List>}
            </Drawer>
        </div>
    );
}
