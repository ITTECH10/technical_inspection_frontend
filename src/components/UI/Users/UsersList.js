import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { useData } from '../../../contexts/DataContext';
import User from './User'
import SearchCustomers from './SearchCustomers';
import { useMediaQuery } from '@material-ui/core';
import { withNamespaces } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            // maxWidth: 752, // maybe change later
            margin: '0 auto'
        },
    },
}));

function UsersList({ t }) {
    const classes = useStyles();
    const { users, user } = useData()

    // FILTERING
    const [fields, setFields] = React.useState({
        query: ''
    })

    const matches = useMediaQuery('(max-width: 600px)')

    const { query } = fields

    const filteredContent = users && [...users].reverse().filter(el => el._id !== user._id).filter(x => x.firstName.toLowerCase().includes(query.toLowerCase()) || x.lastName.toLowerCase().includes(query.toLowerCase())).map(u => {
        return <User key={u._id} userInfo={u} />
    })

    const content = users && [...users].reverse().filter(el => el._id !== user._id).map(u => {
        return <User key={u._id} userInfo={u} />
    })

    return (
        <div className={classes.root}>
            <Typography variant="h4" style={{ padding: !matches ? '10px 0' : 0 }}>
                {t('CustomersTitle')}
            </Typography>
            <SearchCustomers fields={fields} setFields={setFields} noCustomers={users.length === 1} />
            <List>
                {query !== '' ? filteredContent : content}
            </List>
        </div>
    );
}

export default withNamespaces()(UsersList)