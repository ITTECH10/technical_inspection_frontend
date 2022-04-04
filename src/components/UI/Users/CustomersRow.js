import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useData } from '../../../contexts/DataContext';
import { useHistory } from 'react-router-dom';

const CustomersRow = ({ customer }) => {
    const { setVehiclesPage, setSelectedUser, users, setCustomersVehicles, vehicles } = useData()
    const history = useHistory()

    const onSelectUser = () => {
        const corelatedUser = users.find(u => u._id === customer._id)
        setSelectedUser(corelatedUser)

        const updatedCustomerVehicles = vehicles.filter(v => v.vehicleOwner._id === customer._id)
        setCustomersVehicles(updatedCustomerVehicles)

        setVehiclesPage('customersVehicles')
        history.push(`/cars`)
    }

    return (
        <TableRow className='table__row--root' onClick={(e) => onSelectUser(e)}>
            <TableCell component="th" scope="row">
                {customer.firstName}
            </TableCell>
            <TableCell>{customer.lastName}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.customerType === 'firmenkunde' ? customer.companyName : ''}</TableCell>
        </TableRow>
    )
}

export default CustomersRow
