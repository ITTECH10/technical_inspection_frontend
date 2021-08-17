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
import { useData } from '../../../contexts/DataContext';

const User = ({ userInfo }) => {
    const { getSelectedUser } = useData()
    const history = useHistory()
    const { _id, firstName, lastName } = userInfo

    const onSelectUser = () => {
        getSelectedUser(_id)
        history.push(`/cars`)
    }

    return (
        <ListItem style={{ cursor: 'pointer', borderBottom: '1px solid #eee', marginBottom: '10px' }} onClick={() => onSelectUser()}>
            <ListItemAvatar>
                <Avatar>
                    <AssignmentIndIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={`${firstName} ${lastName}`}
                primaryTypographyProps={{ noWrap: true }}
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
