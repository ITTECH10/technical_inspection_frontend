import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

const CarRow = ({ car }) => {
    const history = useHistory()
    const { vehicles, setSelectedCar } = useData()

    const onHandleCarRender = () => {
        const selectedCar = vehicles.find(v => v._id === car._id)
        setSelectedCar(selectedCar)
        history.push(`/cars/${selectedCar._id}`)
    }

    return (
        <TableRow className='table__row--root' onClick={() => onHandleCarRender()}>
            <TableCell component="th" scope="row">
                {car.mark}
            </TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{car.registrationNumber}</TableCell>
        </TableRow>
    )
}

export default CarRow
