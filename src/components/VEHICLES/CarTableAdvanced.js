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
import CarRow from './CarRow';
import UserInfoBlock from '../UI/Users/UserInfoBlock';
import SearchVehicles from './SearchVehicles'

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

function CarTableAdvanced({ t }) {
    const classes = useStyles();
    const { myVehicles, user, selectedUser, customersVehicles, dashboardAdaptiveTitle } = useData()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const matches = useMediaQuery('(max-width: 600px)')
    // FILTERING
    const [fields, setFields] = React.useState({
        query: ''
    })

    const { query } = fields

    const myVehiclesFiltered = myVehicles.filter(myVehicle => myVehicle.registrationNumber.toLowerCase().includes(query.toLowerCase()) || myVehicle.mark.toLowerCase().includes(query.toLowerCase()) || myVehicle.model.toLowerCase().includes(query.toLowerCase())).map(myVehicle => (
        <CarRow key={myVehicle._id} car={myVehicle} />
    )).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const AdaptiveTitle = dashboardAdaptiveTitle === 'Meine Fahrzeuge'
        ? t('MyVehicles') : dashboardAdaptiveTitle === 'T??V ??berf??llig'
            ? t('TUVExpiredTitle') : dashboardAdaptiveTitle === 'SERVICE (NTI) ??berf??llig'
                ? t('Dashboard.ntiBox') : dashboardAdaptiveTitle === 'T??V l??uft in 30 Tagen ab'
                    ? t('TUVExpiresIn30Days') : dashboardAdaptiveTitle === ''
                        ? t('MyVehicles') : dashboardAdaptiveTitle === 'Finanzierung'
                            ? t('FinanzierungVehicles') : dashboardAdaptiveTitle === 'Leasing'
                                ? t('LeasingVehicles') : dashboardAdaptiveTitle === 'Service l??uft in 30 Tagen ab'
                                    ? 'Service l??uft in 30 Tagen ab' : null


    return (
        <>
            {selectedUser && <UserInfoBlock />}
            <Typography variant="h5" style={{ padding: !matches ? '10px 0' : 0 }}>
                {user.role === 'admin' ? t('CustomersVehicles') : AdaptiveTitle}
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <SearchVehicles fields={fields} setFields={setFields} noVehicles={myVehicles.length === 0} />
            <Paper className={classes.root} >
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('RegistrationNumberInputLabel')}</TableCell>
                                <TableCell>{t('MarkInputLabel')}</TableCell>
                                <TableCell>{t('ModelInputLabel')}</TableCell>
                                <TableCell>Fahrer</TableCell>
                                {dashboardAdaptiveTitle !== 'Meine Fahrzeuge' && dashboardAdaptiveTitle !== '' &&
                                    <TableCell>{dashboardAdaptiveTitle === 'Alle Fahrzeuge' ? 'T??V und Service f??llig?' : 'Fallig am'}</TableCell>}
                                {/* {
                                    dashboardAdaptiveTitle !== '' &&
                                    <TableCell>{t('Date')}</TableCell>
                                } */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.role === 'admin' ?
                                customersVehicles.map(mv => (
                                    <CarRow key={mv._id} car={mv} />
                                )).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : myVehiclesFiltered}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={user.role === 'admin' ? customersVehicles.length : myVehiclesFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default withNamespaces()(CarTableAdvanced)