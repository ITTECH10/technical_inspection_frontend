import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useData } from '../../../contexts/DataContext';
import { useHistory } from 'react-router-dom';
// import { useData } from '../../contexts/DataContext';

const CustomersRow = ({ customer }) => {
    const { setVehiclesPage, getSelectedUser } = useData()
    const history = useHistory()

    const onSelectUser = () => {
        setVehiclesPage('customersVehicles')
        getSelectedUser(customer._id)
        history.push(`/cars`)
    }

    return (
        <TableRow className='table__row--root' onClick={() => onSelectUser()}>
            <TableCell component="th" scope="row">
                {customer.firstName && customer.firstName}
            </TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.email}</TableCell>
        </TableRow>
    )
}

export default CustomersRow
