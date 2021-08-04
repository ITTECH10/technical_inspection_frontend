import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UserInfoTab from '../components/UI/Users/UserInfoTab';
import { useData } from '../contexts/DataContext';
import Loader from './../utils/Loader'

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

export default function UserDetails(props) {
    const classes = useStyles();
    const { loading, getSelectedUser } = useData()
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const userId = props.location.pathname.split('/')[2]
    useEffect(() => {
        getSelectedUser(userId)
    }, [getSelectedUser, userId])

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
                    <Tab label="User" {...a11yProps(0)} />
                    <Tab label="History" {...a11yProps(1)} />
                </Tabs>
                <TabPanel className={classes.tabPanel} value={value} index={0}>
                    <UserInfoTab userId={userId} />
                </TabPanel>
                <TabPanel className={classes.tabPanel} value={value} index={1}>
                    Lorem ipsum dolor sir amet.
                </TabPanel>
            </div> : <Loader />
    );
}
