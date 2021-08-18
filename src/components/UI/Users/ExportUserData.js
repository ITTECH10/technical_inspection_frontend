import React from 'react'
import CsvDownload from 'react-json-to-csv'
import { useData } from '../../../contexts/DataContext'
import GetAppIcon from '@material-ui/icons/GetApp';

const ExportUserData = () => {
    const { selectedUser } = useData()

    const btnStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 8px',
        fontSize: '0.875rem',
        minWidth: '64px',
        boxSizing: 'border-box',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        fontFamily: "Roboto, 'Helvetica', 'Arial', sans-serif",
        fontWeight: 500,
        lineHeight: 1.75,
        borderRadius: '4px',
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
        border: 'none',
        marginTop: 5,
        backgroundColor: '#f21b3f',
        color: '#fff',
        cursor: 'pointer'
    }

    return (
        <CsvDownload className="btn-export" data={[selectedUser]} style={btnStyle}>
            Export User Data
            <GetAppIcon />
        </CsvDownload>
    )
}

export default ExportUserData
