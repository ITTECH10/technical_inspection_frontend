import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { IconButton, Tooltip } from '@material-ui/core';
import { useData } from '../../../contexts/DataContext';

const MailOnClick = () => {
    const { selectedUser, user } = useData()

    return (
        user.role === 'admin' &&
        <Tooltip title="Email kunde">
            <IconButton href={`mailto:${selectedUser.email}`}>
                <MailOutlineIcon color="secondary" />
            </IconButton>
        </Tooltip>
    )
}

export default MailOnClick
