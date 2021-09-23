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
import { useData } from '../../../contexts/DataContext';
import SearchCustomers from './SearchCustomers';
import CustomersRow from './CustomersRow';

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

function CustomersTableAdvanced({ t }) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const { users, user } = useData()
    const matches = useMediaQuery('(max-width: 600px)')
    // FILTERING
    const [fields, setFields] = React.useState({
        query: ''
    })

    const { query } = fields

    const filteredContent = users && [...users].reverse().filter(el => el._id !== user._id).filter(el => el.role !== 'admin').filter(x => x.firstName.toLowerCase().includes(query.toLowerCase()) || x.lastName.toLowerCase().includes(query.toLowerCase())).map(c => {
        return <CustomersRow key={c._id} customer={c} />
    })
    const content = users && [...users].reverse().filter(el => el._id !== user._id).filter(el => el.role !== 'admin').slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(c => {
        return <CustomersRow key={c._id} customer={c} />
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
            <Typography variant="h4" style={{ padding: !matches && '10px 0' }}>
                {t('CustomersTitle')}
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <SearchCustomers fields={fields} setFields={setFields} noCustomers={users.length === 1} />
            <Paper className={classes.root} >
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('FirstNameInputLabel')}</TableCell>
                                <TableCell>{t('LastNameInputLabel')}</TableCell>
                                <TableCell>{t('EmailInputLabel')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {query !== '' ? filteredContent : content}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={users.filter(el => el.role !== 'admin').length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}

export default withNamespaces()(CustomersTableAdvanced)