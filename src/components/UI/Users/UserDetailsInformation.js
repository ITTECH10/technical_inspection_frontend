import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserInfoTab from './UserInfoTab'
import UserCarsTab from './UserCarsTab';
import { useData } from '../../../contexts/DataContext';
import Loader from './../../../utils/Loader'
import { useHistory } from 'react-router-dom';
import UsersList from './UsersList';
import InsurancesTab from '../../INSURANCES/InsurancesTab';
import BanksTab from '../../BANKS/BanksTab';
import CarDetails from './../../VEHICLES/CarDetails'
import UsersProfile from './UsersProfile';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        height: '100%'
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        minHeight: 'calc(100vh - 56px)',
        width: '30%',
        [theme.breakpoints.up('sm')]: {
            width: '25%'
        },
        [theme.breakpoints.up('md')]: {
            width: '15%'
        }
    },
    tabPanel: {
        width: '70%',
        [theme.breakpoints.up('sm')]: {
            width: '75%'
        },
        [theme.breakpoints.up('md')]: {
            width: '85%'
        },
        '& .MuiBox-root': {
            padding: '6px',
        },
    }
}));

export default function UserDetailsInformation({ location }) {
    const classes = useStyles();
    const { appLoading, getSelectedUser, user, getUserVehicles, selectedCar, selectedUser } = useData()
    const history = useHistory()

    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // let userId = user._id
    // if(user && user.role === 'admin' && selectedUser) {
    //     userId = selectedUser._id
    // }

    // useEffect(() => {
    //     getSelectedUser(userId)
    //     getUserVehicles(userId)
    // }, [getSelectedUser, getUserVehicles, userId])

    return (
        !appLoading ?
            <div className={classes.root}>
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                    indicatorColor="primary"
                >
                    <Tab label="User" {...a11yProps(0)} />
                    <Tab label="Customers" {...a11yProps(1)} />
                    <Tab label="Fahrzeuge" {...a11yProps(2)} />
                    <Tab label="Insurances" {...a11yProps(3)} />
                    <Tab label="Banks" {...a11yProps(4)} />
                    {value === 5 && <Tab label="Selected Car" {...a11yProps(5)} />}
                </Tabs>
                <TabPanel className={classes.tabPanel} value={value} index={0}>
                    <UsersProfile />
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={1}>
                    <UsersList onHandleTabChange={setValue} />
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={2}>
                    <UserCarsTab onHandleCarNavigation={setValue} />
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={3}>
                    <InsurancesTab />
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={4}>
                    <BanksTab />
                </TabPanel>
                {value === 5 &&
                    <TabPanel className={classes.tabPanel} value={value} index={5}>
                        <CarDetails />
                    </TabPanel>}
            </div> : <Loader />
    );
}