import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useData } from '../../../contexts/DataContext';
import { useHistory } from 'react-router-dom';
// import { useData } from '../../contexts/DataContext';

const CustomersRow = ({ data }) => {
    const { setVehiclesPage, setSelectedUser, users } = useData()
    const history = useHistory()

    const onSelectUser = () => {
        const corelatedUser = users.find(u => u._id === data._id)
        setSelectedUser(corelatedUser)
        setVehiclesPage('customersVehicles')
        history.push(`/cars`)
    }

    return (
        <TableRow className='table__row--root' onClick={() => onSelectUser()}>
            <TableCell component="th" scope="row">
                {data.firstName && data.firstName}
            </TableCell>
            <TableCell>{data.lastName}</TableCell>
            <TableCell>{data.email}</TableCell>
        </TableRow>
    )
}

export default CustomersRow
