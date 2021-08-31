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

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
    container: {
        // maxHeight: 440,

    },
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

    const filteredContent = users && [...users].reverse().filter(el => el._id !== user._id).filter(x => x.firstName.toLowerCase().includes(query.toLowerCase()) || x.lastName.toLowerCase().includes(query.toLowerCase())).map(c => {
        return <CustomersRow key={c._id} customer={c} />
    })
    const content = users && [...users].reverse().filter(el => el._id !== user._id).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(c => {
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
            <Typography variant="h4" style={{ padding: !matches ? '10px 0' : 0 }}>
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
                    count={users.length}
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