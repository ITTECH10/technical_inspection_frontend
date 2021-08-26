import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import { useData } from '../../../contexts/DataContext';
import CustomersRow from './CustomersRow';
import { withNamespaces } from 'react-i18next';
import SearchCustomers from './SearchCustomers';
import { useMediaQuery, Typography, Divider } from '@material-ui/core';
import Pagination from '../../../utils/Pagination';
import RenderPaginatedContent from '../../../utils/RenderPaginatedContent';

const useStyles = makeStyles({
    // table: {
    //     minWidth: 650,
    // },
});

function CarTable({ t }) {
    const classes = useStyles();
    const { users, user } = useData()
    const matches = useMediaQuery('(max-width: 600px)')

    // FILTERING
    const [fields, setFields] = React.useState({
        query: ''
    })

    const { query } = fields

    const filteredContent = users && [...users].reverse().filter(el => el._id !== user._id).filter(x => x.firstName.toLowerCase().includes(query.toLowerCase()) || x.lastName.toLowerCase().includes(query.toLowerCase()))
    const content = users && [...users].reverse().filter(el => el._id !== user._id)

    return (
        <>
            <Typography variant="h4" style={{ padding: !matches ? '10px 0' : 0 }}>
                {t('CustomersTitle')}
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <SearchCustomers fields={fields} setFields={setFields} noCustomers={users.length === 1} />
            {!matches && <Pagination
                pageLimit={matches ? 1 : 3}
                data={query !== '' ? filteredContent : content}
                dataLimit={10}
            />}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{t('FirstNameInputLabel')}</TableCell>
                            <TableCell>{t('LastNameInputLabel')}</TableCell>
                            <TableCell>{t('EmailInputLabel')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {query !== '' ? filteredContent : content} */}
                        <RenderPaginatedContent
                            data={query !== '' ? filteredContent : content}
                            RenderComponent={CustomersRow}
                            dataLimit={10}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
            {matches && <Pagination
                pageLimit={matches ? 1 : 3}
                data={query !== '' ? filteredContent : content}
                dataLimit={10}
            />}
        </>
    );
}

export default withNamespaces()(CarTable)
