import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useData } from '../../../contexts/DataContext';
import { useHistory } from 'react-router-dom';
// import { useData } from '../../contexts/DataContext';

const CustomersRow = ({ customer }) => {
    const { setVehiclesPage, setSelectedUser, users } = useData()
    const history = useHistory()

    const onSelectUser = () => {
        const corelatedUser = users.find(u => u._id === customer._id)
        setSelectedUser(corelatedUser)
        setVehiclesPage('customersVehicles')
        history.push(`/cars`)
    }

    return (
        <TableRow className='table__row--root' onClick={() => onSelectUser()}>
            <TableCell component="th" scope="row">
                {customer.firstName}
            </TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.email}</TableCell>
        </TableRow>
    )
}

export default CustomersRow
