import React from 'react'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { IconButton, Tooltip } from '@material-ui/core';
import { useData } from '../../../contexts/DataContext';
import { withNamespaces } from 'react-i18next';

const MailOnClick = ({ t }) => {
    const { selectedUser, user } = useData()

    return (
        user.role === 'admin' &&
        <Tooltip title={t('tooltip.sendmailtocustomer')}>
            <IconButton href={`mailto:${selectedUser.email}`}>
                <MailOutlineIcon color="secondary" />
            </IconButton>
        </Tooltip>
    )
}

export default withNameSpaces()(MailOnClick)
