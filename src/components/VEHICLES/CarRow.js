import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory } from 'react-router-dom';

const CarRow = ({ car }) => {
    const history = useHistory()

    return (
        <TableRow onClick={() => history.push(`/cars/${car._id}`)} key={car._id}>
            <TableCell component="th" scope="row">
                {car.mark}
            </TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{new Date(car.lastTechnicalInspection).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(car.lastTechnicalInspection).toLocaleDateString()}</TableCell>
        </TableRow>
    )
}

export default CarRow
