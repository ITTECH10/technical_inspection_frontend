import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const BankRow = ({ bank }) => {
    const {city, postNumber, streetAddress, phoneNumber, numberAddress} = bank
    const formatedAddress = `${streetAddress} ${numberAddress}, ${postNumber}`
    return (
        <TableRow key={bank._id}>
            <TableCell component="th" scope="row">
                {bank.name}
            </TableCell>
            <TableCell>{formatedAddress}</TableCell>
        </TableRow>
    )
}

export default BankRow
