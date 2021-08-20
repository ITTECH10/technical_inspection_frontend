import React from 'react'
import CsvDownload from 'react-json-to-csv'
import { useData } from '../../../contexts/DataContext'
import GetAppIcon from '@material-ui/icons/GetApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withNamespaces } from 'react-i18next';

const ExportUserData = ({ t }) => {
    const { users } = useData()

    // const btnStyle = {
    //     display: 'flex',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     padding: '5px 8px',
    //     fontSize: '0.875rem',
    //     minWidth: '64px',
    //     boxSizing: 'border-box',
    //     transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    //     fontFamily: "Roboto, 'Helvetica', 'Arial', sans-serif",
    //     fontWeight: 500,
    //     lineHeight: 1.75,
    //     borderRadius: '4px',
    //     letterSpacing: '0.02857em',
    //     textTransform: 'uppercase',
    //     border: 'none',
    //     marginTop: 5,
    //     backgroundColor: '#f21b3f',
    //     color: '#fff',
    //     cursor: 'pointer'
    // }

    const listItemStyle = {
        border: 'none',
        backgroundColor: '#fff',
        cursor: 'pointer'
    }

    return (
        <CsvDownload className="btn-export" data={[users]} style={listItemStyle}>
            <ListItem>
                <ListItemIcon><GetAppIcon color="primary" /></ListItemIcon>
                <ListItemText primary={t('MenuExport')} />
            </ListItem>
        </CsvDownload>
    )
}

export default withNamespaces()(ExportUserData)
