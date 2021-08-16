import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

const CarRow = ({ car }) => {
    const history = useHistory()
    const { myVehicles, setSelectedCar } = useData()

    const onHandleCarRender = () => {
        const selectedCar = myVehicles.find(v => v._id === car._id)
        setSelectedCar(selectedCar)
        history.push(`/cars/${selectedCar._id}`)
    }

    return (
        <TableRow onClick={() => onHandleCarRender()} key={car._id}>
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
