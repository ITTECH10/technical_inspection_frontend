import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        [theme.breakpoints.up('md')]: {
            // maxWidth: 752, // maybe change later
            margin: '0 auto'
        }
    },
}));

export default function InteractiveList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AssignmentIndIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="example.forapp@test.com"
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <ExpandMoreIcon color="primary" />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AssignmentIndIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="example.forapp@test.com"
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <ExpandMoreIcon color="primary" />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AssignmentIndIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="example.forapp@test.com"
                    />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <ExpandMoreIcon color="primary" />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </div>
    );
}
