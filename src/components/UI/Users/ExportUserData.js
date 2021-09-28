import React from 'react'
// import CsvDownload from 'react-json-to-csv'
import { json2csv } from 'json-2-csv'
import { useData } from '../../../contexts/DataContext'
import GetAppIcon from '@material-ui/icons/GetApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withNamespaces } from 'react-i18next';
import { CSVLink } from "react-csv";

const ExportUserData = ({ t }) => {
    const [data, setData] = React.useState('')
    const { users, vehicles } = useData()

    // console.log('rendering...')

    let myData = []

    if (vehicles) {
        vehicles.map(el => {
            // console.log('looping...')
            myData.push({
                firstName: el.vehicleOwner.firstName,
                lastName: el.vehicleOwner.lastName,
                email: el.vehicleOwner.email,
                mark: el.mark,
                model: el.model
            })
        })
    }

    // CONSIDER AGGREGATION ON BACKEND
    // console.log(vehicles)

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

    React.useEffect(() => {
        let isMounted = true

        if (isMounted) {
            json2csv(myData, (err, csv) => {
                if (err) {
                    console.log(err)
                }
                if (csv) {
                    setData(csv)
                }
            })
        }

        return () => {
            isMounted = false
        }
    }, [myData])

    const listItemStyle = {
        border: 'none',
        backgroundColor: '#fff',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit'
    }

    return (
        users.length >= 2 ?
            <CSVLink filename={'users-data.csv'} className="btn-export" data={data.replaceAll(undefined, ',')} style={listItemStyle}>
                <ListItem>
                    <ListItemIcon><GetAppIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={t('MenuExport')} />
                </ListItem>
            </CSVLink> : null
    )
}

export default withNamespaces()(ExportUserData)
