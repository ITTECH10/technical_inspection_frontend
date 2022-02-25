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

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

function CarTableAdvanced({ t }) {
    const classes = useStyles();
    const { myVehicles, user, selectedUser, customersVehicles } = useData()
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const matches = useMediaQuery('(max-width: 600px)')

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            {selectedUser && <UserInfoBlock />}
            <Typography variant="h5" style={{ padding: !matches ? '10px 0' : 0 }}>
                {user.role === 'admin' ? t('CustomersVehicles') : t('MyVehicles')}
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <Paper className={classes.root} >
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('MarkInputLabel')}</TableCell>
                                <TableCell>{t('ModelInputLabel')}</TableCell>
                                <TableCell>{t('RegistrationNumberInputLabel')}</TableCell>
                                {user.role === 'admin' && <TableCell>TUV AU {t('AndGeneral')} Service Status ({t('CalculatedForTwoMonths')})</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.role === 'admin' ?
                                customersVehicles.map(mv => (
                                    <CarRow key={mv._id} car={mv} />
                                )).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : myVehicles.map(mv => (
                                    <CarRow key={mv._id} car={mv} />
                                )).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={user.role === 'admin' ? customersVehicles.length : myVehicles.length}
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