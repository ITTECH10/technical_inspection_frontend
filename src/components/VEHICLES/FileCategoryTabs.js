import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import GalleryContent from './../UI/GalleryContent'
import { withNamespaces } from 'react-i18next';
import DocumentCategories from './DocumentCategoryProvider'
import { Typography } from '@material-ui/core';

// const content = value === idx ? (
//     <GalleryContent
//         key={filteredFileIndex}
//         image={filteredFile}
//         setOnHandleDeleteOpen={setOnHandleDeleteOpen}
//     />
// ) : (
//     <Typography variant="h2">
//         Emir Salihovic
//     </Typography>
// )
// return content

// {categories.map((fileCategory, idx) => {
//     return <TabPanel key={idx} value={value} index={idx}>
//         {files.filter(file => file.category === fileCategory.categoryId).map((filteredFile, filteredFileIndex) => {
//             return <GalleryContent
//                 key={filteredFileIndex}
//                 image={filteredFile}
//                 setOnHandleDeleteOpen={setOnHandleDeleteOpen}
//             />
//         })}
//     </TabPanel>
// })}

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

const categories = DocumentCategories.getDocumentCategories()

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

function FileCategoryTabs({ files, setOnHandleDeleteOpen, t }) {
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
                    {categories.map((fc, idx) => (
                        <Tab key={fc.categoryId} label={t(`${fc.name}`)} {...a11yProps(idx)} />
                    ))}
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                {files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_VERTRAG').length > 0 ?
                    files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_VERTRAG').map((el, i) => {
                        return <GalleryContent
                            key={i}
                            image={el}
                            setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                        />
                    }) : <Typography variant="h6">Noch keine Vertrags.</Typography>}
            </TabPanel>
            <TabPanel value={value} index={1}>
                {files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_FAHRZEUGSCHEIN').length > 0 ?
                    files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_FAHRZEUGSCHEIN').map((el, i) => {
                        return <GalleryContent
                            key={i}
                            image={el}
                            setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                        />
                    }) : <Typography variant="h6">Noch keine Fahrzeugschein.</Typography>}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_SCHADEN').length > 0 ?
                    files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_SCHADEN').map((el, i) => {
                        return <GalleryContent
                            key={i}
                            image={el}
                            setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                        />
                    }) : <Typography variant="h6">Noch kein schaeden.</Typography>}
            </TabPanel>
            <TabPanel value={value} index={3}>
                {files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_RECHNUNG').length > 0 ?
                    files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_RECHNUNG').map((el, i) => {
                        return <GalleryContent
                            key={i}
                            image={el}
                            setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                        />
                    }) : <Typography variant="h6">Noch kein rechnungen.</Typography>}
            </TabPanel>
            <TabPanel value={value} index={4}>
                {files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_SONSTIGES').length > 0 ?
                    files.filter((file, fileIdx) => file.category === 'DOCUMENT_TYPE_SONSTIGES').map((el, i) => {
                        return <GalleryContent
                            key={i}
                            image={el}
                            setOnHandleDeleteOpen={setOnHandleDeleteOpen}
                        />
                    }) : <Typography variant="h6">Noch keine sonstiges.</Typography>}
            </TabPanel>
        </div>
    );
}

export default withNamespaces()(FileCategoryTabs)