import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const BankRow = ({ bank }) => {
    const { postNumber, streetAddress, numberAddress } = bank
    const formatedAddress = `${streetAddress} ${numberAddress}, ${postNumber}`
    return (
        <TableRow className='table__row--root' key={bank._id}>
            <TableCell component="th" scope="row">
                {bank.name}
            </TableCell>
            <TableCell>{formatedAddress}</TableCell>
        </TableRow>
    )
}

export default BankRow
