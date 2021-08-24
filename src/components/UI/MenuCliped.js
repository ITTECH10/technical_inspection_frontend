import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withNamespaces } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import { Button, IconButton, Box } from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ExportUserData from './Users/ExportUserData';
import Logo from './../../assets/images/logo.svg'
import LanguageMenu from './LanguageMenu'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    rootPaper: {
        width: 57
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: 210,
        width: `calc(100% - ${210}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
            width: `calc(100% - ${240}px)`,
        }
    },
    actionBtnsMenuBox: {
        // width: 145,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        right: 25,
        padding: '0 10px'
    },
    menuButton: {
        marginRight: 10,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: 210,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        [theme.breakpoints.up('sm')]: {
            width: 240,
        }
    },
    drawerOpen: {
        width: 210,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            width: 240,
        }
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            // width: theme.spacing(9) + 1,
            width: 57,
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

function ClippedDrawer({ open, setOpen, t }) {
    const classes = useStyles();
    const theme = useTheme();
    const { user, setVehiclesPage, logout } = useData()
    const history = useHistory()
    const [url, setUrl] = React.useState('/')
    const [selectedIndex, setSelectedIndex] = useState(0)

    React.useEffect(() => {
        let isMounted

        if (isMounted) {
            history.listen((location, action) => {
                setUrl(location.pathname)
            })
        }

        return () => {
            isMounted = false
        }
    })

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleDrawerToggling = () => {
        setOpen(prevState => !prevState)
    }

    const onHandleNavigation = (route, index) => {
        if (route === '/cars') {
            setVehiclesPage('allVehicles')
        }
        history.push(route)
        setSelectedIndex(index)
        setOpen(false)
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {!open ?
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggling}
                            edge="start"
                        >
                            <MenuIcon />
                        </IconButton>
                        :
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerToggling}
                            edge="start"
                        >
                            <CloseIcon />
                        </IconButton>}
                    <Box className={classes.logoBox}>
                        <img src={Logo} className={classes.logo} alt="Company Logo" />
                    </Box>
                    <Box className={classes.actionBtnsMenuBox}>
                        {url !== '/' && url !== '/banks' && url !== '/insurances' && <IconButton style={{ color: '#fff' }} onClick={() => history.goBack()}><ArrowBackIcon /></IconButton>}
                        <Button onClick={() => logout(history)} color="inherit">{t('LogoutButton')}</Button>
                    </Box>
                    <LanguageMenu />
                </Toolbar>
            </AppBar>
            <Drawer
                PaperProps={{ className: { root: classes.rootPaper } }}
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
                {/* <Toolbar /> */}
                <div className={classes.drawerContainer}>
                    {user.role === 'admin' ?
                        <List>
                            <ListItem selected={selectedIndex === 0} className={classes.listItemRoot} onClick={() => onHandleNavigation('/', 0)}>
                                <ListItemIcon><GroupIcon color="primary" /></ListItemIcon>
                                <ListItemText primaryTypographyProps={{ color: selectedIndex === 0 ? 'primary' : 'initial' }} primary={t('MenuCustomers')} />
                            </ListItem>
                            <ListItem selected={selectedIndex === 1} className={classes.listItemRoot} onClick={() => onHandleNavigation('/cars', 1)}>
                                <ListItemIcon><DriveEtaIcon color="primary" /></ListItemIcon>
                                <ListItemText primaryTypographyProps={{ color: selectedIndex === 1 ? 'primary' : 'initial' }} primary={t('MenuVehicles')} />
                            </ListItem>
                            <ListItem selected={selectedIndex === 2} className={classes.listItemRoot} onClick={() => onHandleNavigation('/insurances', 2)}>
                                <ListItemIcon><VerifiedUserIcon color="primary" /></ListItemIcon>
                                <ListItemText primaryTypographyProps={{ color: selectedIndex === 2 ? 'primary' : 'initial' }} primary={t('MenuInsurances')} />
                            </ListItem>
                            <ListItem selected={selectedIndex === 3} className={classes.listItemRoot} onClick={() => onHandleNavigation('/banks', 3)}>
                                <ListItemIcon><AccountBalanceIcon color="primary" /></ListItemIcon>
                                <ListItemText primaryTypographyProps={{ color: selectedIndex === 3 ? 'primary' : 'initial' }} primary={t('MenuBanks')} />
                            </ListItem>
                            <ExportUserData />
                        </List>
                        :
                        <List>
                            <ListItem selected={selectedIndex === 0} className={classes.listItemRoot} onClick={() => onHandleNavigation('/')}>
                                <ListItemIcon><DriveEtaIcon color="primary" /></ListItemIcon>
                                <ListItemText primaryTypographyProps={{ color: selectedIndex === 0 ? 'primary' : 'initial' }} primary={t('MenuVehicles')} />
                            </ListItem>
                        </List>}
                </div>
            </Drawer>
        </div>
    );
}

export default withNamespaces()(ClippedDrawer)