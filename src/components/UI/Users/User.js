import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useHistory } from 'react-router-dom';

const User = ({ userInfo }) => {
    const history = useHistory()
    const { email } = userInfo

    const onHandleNavigate = () => {
        history.push('/user', userInfo)
    }

    return (
        <ListItem onClick={() => onHandleNavigate()}>
            <ListItemAvatar>
                <Avatar>
                    <AssignmentIndIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={email}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                    <ExpandMoreIcon color="primary" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default User
