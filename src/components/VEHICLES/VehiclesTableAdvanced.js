import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withNamespaces } from 'react-i18next';
import { useData } from './../../contexts/DataContext';
import VehicleItemRow from './VehicleItemRow';
import SearchVehicles from './SearchVehicles';

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        // maxHeight: 440,
    },
});

function VehiclesTableAdvanced({ t }) {
    const classes = useStyles();
    const { vehicles, user, dashboardAdaptiveTitle } = useData()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const AdaptiveTitle = dashboardAdaptiveTitle === 'Alle Fahrzeuge'
        ? t('VehiclesTitle') : dashboardAdaptiveTitle === 'TÜV überfällig'
            ? t('TUVExpiredTitle') : dashboardAdaptiveTitle === 'SERVICE (NTI) überfällig'
                ? t('Dashboard.ntiBox') : dashboardAdaptiveTitle === 'Service läuft in 30 Tagen ab'
                    ? 'Service läuft in 30 Tagen ab' : dashboardAdaptiveTitle === 'TÜV läuft in 30 Tagen ab'
                        ? t('TUVExpiresIn30Days') : dashboardAdaptiveTitle === ''
                            ? t('VehiclesTitle') : dashboardAdaptiveTitle === 'Finanzierung'
                                ? t('FinanzierungVehicles') : dashboardAdaptiveTitle === 'Leasing'
                                    ? t('LeasingVehicles') : null

    // FILTERING
    const [fields, setFields] = React.useState({
        query: ''
    })

    const matches = useMediaQuery('(max-width: 600px)')

    const { query } = fields

    // const skipAdmin = users.slice(1, users.length)

    // vehicles.map(v => v.vehicleOwner).map((el, idx) => {
    //     return skipAdmin.find((u, idx) => u._id === el)
    // }).map((el, i) => {
    //     vehicles[i].formatedName = `${el.firstName} ${el.lastName}`
    //     return vehicles
    // })

    const filteredContent = vehicles.filter(x => x.registrationNumber.toLowerCase().includes(query.toLowerCase()) || x.mark.toLowerCase().includes(query.toLowerCase()) || x.model.toLowerCase().includes(query.toLowerCase())).map(v => (
        <VehicleItemRow dashboardAdaptiveTitle={dashboardAdaptiveTitle} key={v._id} vehicle={v} />
    ))

    const allCars = vehicles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(v => {
        return <VehicleItemRow dashboardAdaptiveTitle={dashboardAdaptiveTitle} key={v._id} vehicle={v} />
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Typography variant="h4" style={{ padding: !matches ? '10px 0' : 0 }}>
                {user.role === 'admin' && vehicles.length > 0 ? AdaptiveTitle : vehicles.length === 0 ? t('NoVehiclesYet') : t('MyVehicles')}
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <SearchVehicles fields={fields} setFields={setFields} noVehicles={vehicles.length === 0} />
            <Paper className={classes.root} >
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('RegistrationNumberInputLabel')}</TableCell>
                                <TableCell>{t('MarkInputLabel')}</TableCell>
                                <TableCell>{t('ModelInputLabel')}</TableCell>
                                {/* <TableCell>{t('VehicleOwner')}</TableCell> */}
                                <TableCell>Fahrer</TableCell>
                                {
                                    dashboardAdaptiveTitle !== '' && dashboardAdaptiveTitle !== 'Alle Fahrzeuge' &&
                                    <TableCell TableCell > {t('Date')}</TableCell>
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {query !== '' ? filteredContent : allCars}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={vehicles.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default withNamespaces()(VehiclesTableAdvanced)