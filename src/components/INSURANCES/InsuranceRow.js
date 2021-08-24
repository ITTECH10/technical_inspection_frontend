import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const InsuranceRow = ({ insurance }) => {
    const { postNumber, streetAddress, numberAddress } = insurance
    const formatedAddress = `${streetAddress} ${numberAddress}, ${postNumber}`
    return (
        <TableRow className='table__row--root' key={insurance._id}>
            <TableCell component="th" scope="row">
                {insurance.name}
            </TableCell>
            <TableCell>{formatedAddress}</TableCell>
        </TableRow>
    )
}

export default InsuranceRow
