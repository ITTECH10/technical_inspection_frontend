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
    const { users, vehicles, setGeneralAlertOptions } = useData()
    // let myData = []

    let myData = React.useMemo(() => {
        return []
    }, [])

    React.useEffect(() => {
        if (vehicles) {
            vehicles.map(el => {
                // console.log('looping...')
                return myData.push({
                    Vorname: el.vehicleOwner.firstName,
                    Nachname: el.vehicleOwner.lastName,
                    email: el.vehicleOwner.email,
                    Hersteller: el.mark,
                    Modell: el.model,
                    HSN: el.HSN,
                    TSN: el.TSN,
                    Fahrgestellnummer: el.chassisNumber ? el.chassisNumber : '',
                    Kennzeichen: el.registrationNumber,
                    GarantieAblaufdatum: el.varantyExpiresAt ? el.varantyExpiresAt : '',
                    LetzteUUV: el.lastUUV,
                    NächsteUVV: el.nextUUV,
                    LetzteTechnischeInspektion: el.lastTechnicalInspection,
                    NächsteTechnischeInspektion: el.nextTechnicalInspection,
                    TUV: el.TUV,
                    AU: el.AU,
                    ErstzulassungDesFahrzeugs: el.firstVehicleRegistration,
                    ZulassungAufDenBesitzer: el.firstVehicleRegistrationOnOwner,
                    Laufleistung: el.kilometersDriven,
                    JährlicheSteuer: el.yearlyTax
                })
            })
        }

        json2csv(myData, (err, csv) => {
            if (err) {
                console.log(err)
                setGeneralAlertOptions({
                    open: true,
                    message: err.response ? err.response.data.message : 'Server-Fehler......',
                    severity: 'error',
                    hideAfter: 2500
                })
            }
            if (csv) {
                // console.log(csv)
                setData(csv)
            }
        })
    }, [myData, setGeneralAlertOptions, vehicles])

    const listItemStyle = {
        border: 'none',
        backgroundColor: '#fff',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'inherit'
    }

    return (
        users.length >= 2 ?
            <CSVLink filename={'users-data.csv'} className="btn-export" data={data.replaceAll(undefined, ' ').replaceAll('T00:00:00.000Z', ' ').replaceAll(null, ' ')} style={listItemStyle}>
                <ListItem>
                    <ListItemIcon><GetAppIcon color="primary" /></ListItemIcon>
                    <ListItemText primary={t('MenuExport')} />
                </ListItem>
            </CSVLink> : null
    )
}

export default withNamespaces()(ExportUserData)
