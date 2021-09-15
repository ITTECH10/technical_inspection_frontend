import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GalleryContent from './../UI/GalleryContent'

const FILE_CATEGORIES = [
    {
        name: 'X',
        icon: ''
    },
    {
        name: 'Y',
        icon: ''
    },
    {
        name: 'Z',
        icon: ''
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: 32
    },
    tabPanelBox: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        }
    }
}));

function TabPanel(props) {
    const classes = useStyles()
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box className={classes.tabPanelBox}>
                    {children}
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
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

export default function FileCategoryTabs({ files, setOnHandleDeleteOpen }) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {FILE_CATEGORIES.map((fc, idx) => (
                        <Tab key={idx} label={fc.name} {...a11yProps(idx)} />
                    ))}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {files.filter(f => f.category === 'X').map((file, idx) => (
                    <GalleryContent key={idx} image={file} setOnHandleDeleteOpen={setOnHandleDeleteOpen} />
                ))}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {files.filter(f => f.category === 'Y').map((file, idx) => (
                    <GalleryContent key={idx} image={file} setOnHandleDeleteOpen={setOnHandleDeleteOpen} />
                ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {files.filter(f => f.category === 'Z').map((file, idx) => (
                    <GalleryContent key={idx} image={file} setOnHandleDeleteOpen={setOnHandleDeleteOpen} />
                ))}
            </TabPanel>
        </div>
    );
}
