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

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const curDate = new Date()
    const NTIDate = new Date(car.nextTechnicalInspection)
    const TUVDate = new Date(car.TUV)
    const AUDate = new Date(car.AU)

    const NTIDiff = Math.round(Math.abs((curDate - NTIDate) / oneDay)) + 1;
    const TUVDiff = Math.round(Math.abs((curDate - TUVDate) / oneDay)) + 1;
    const HUDiff = Math.round(Math.abs((curDate - AUDate) / oneDay)) + 1;

    return (
        <TableRow className='table__row--root' onClick={() => onHandleCarRender()} key={car._id}>
            <TableCell component="th" scope="row">
                {car.mark}
            </TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{car.registrationNumber}</TableCell>
            {user.role === 'admin' &&
                <TableCell>
                    {car.TUVExpiresInTwoMonths &&
                        <Chip
                            label={`TUV in ${TUVDiff} days`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    }
                    {car.AUExpiresInTwoMonths &&
                        <Chip
                            label={`HU in ${HUDiff} days`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    }
                    {car.technicalInspectionInNextTwoMonths &&
                        <Chip
                            label={`NTI in ${NTIDiff} days`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                </TableCell>}
        </TableRow>
    )
}

export default CarRow
