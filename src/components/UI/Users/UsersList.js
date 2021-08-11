import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useData } from '../../../contexts/DataContext';
import User from './User'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            // maxWidth: 752, // maybe change later
            margin: '0 auto'
        },
    },
}));

export default function UsersList() {
    const classes = useStyles();
    const {users, user} = useData()

    const content = users && [...users].reverse().filter(el => el._id !== user._id).map(u => {
        return <User key={u._id} userInfo={u}/>
    })

    return (
        <div className={classes.root}>
            <List dissablePadding>
                {content}
            </List>
        </div>
    );
}
