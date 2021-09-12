import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import Chip from '@material-ui/core/Chip';
import BuildIcon from '@material-ui/icons/Build';

const CarRow = ({ car }) => {
    const history = useHistory()
    const { vehicles, setSelectedCar, myVehicles, user } = useData()
    let selectedCar

    if (user.role === 'admin') {
        selectedCar = vehicles.find(v => v._id === car._id)
    }
    if (user.role === 'user') {
        selectedCar = myVehicles.find(v => v._id === car._id)
    }

    const onHandleCarRender = () => {
        setSelectedCar(selectedCar)
        history.push(`/cars/${selectedCar._id}`)
    }

    return (
        <TableRow className='table__row--root' onClick={() => onHandleCarRender()} key={car._id}>
            <TableCell component="th" scope="row">
                {car.mark}
            </TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{car.registrationNumber}</TableCell>
            {user.role === 'admin' &&
                <TableCell>
                    {car.TUVAUExpiresInTwoMonths ?
                        <Chip
                            icon={<BuildIcon />}
                            label="TUV/AU"
                            color="primary"
                            size="small"
                            variant="outlined"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                        :
                        <Chip
                            icon={<BuildIcon />}
                            label="Not available"
                            color="secondary"
                            size="small"
                            variant="outlined"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    }
                    {car.nextTechnicalInspection ?
                        <Chip
                            icon={<BuildIcon />}
                            label={`NTI ${new Date(car.nextTechnicalInspection).toLocaleDateString()}`}
                            color="primary"
                            size="small"
                            variant="outlined"
                            style={{ cursor: 'pointer' }}
                        />
                        :
                        <Chip
                            icon={<BuildIcon />}
                            label="Not available"
                            color="primary"
                            size="small"
                            variant="outlined"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                </TableCell>}
        </TableRow>
    )
}

export default CarRow
