import React, {useEffect} from 'react';
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
            // padding: '5px 24px',
        },
    }
}));

export default function UserDetailsInformation({location}) {
    const classes = useStyles();
    const { loading, getSelectedUser, user, getUserVehicles } = useData()
    const history = useHistory()
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    let userId = user._id
    if(user && user.role === 'admin') {
        userId = location.pathname.split('/')[2]
    }

    useEffect(() => {
        getSelectedUser(userId)
        getUserVehicles(userId)
    }, [getSelectedUser, getUserVehicles, userId])

    return (
        !loading ?
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
                    <Tab label="Fahrzeuge" {...a11yProps(0)} />
                </Tabs>
                <TabPanel className={classes.tabPanel} value={value} index={0}>
                    <UserCarsTab />
                </TabPanel>
            </div> : <Loader />
    );
}