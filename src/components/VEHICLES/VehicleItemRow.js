import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';

const VehicleItemRow = ({ vehicle, dashboardAdaptiveTitle }) => {
    const history = useHistory()
    const { vehicles, setSelectedCar, setCarImages } = useData()

    const onHandleCarRender = () => {
        const selectedCar = vehicles.find(v => v._id === vehicle._id)
        setSelectedCar(selectedCar)
        setCarImages([])
        history.push(`/cars/${selectedCar._id}`)
    }

    const TuvDate = vehicle.TUV ? new Date(vehicle.TUV).toLocaleDateString('de-DE') : ''
    const LeasingDate = vehicle.contractExpirationDate ? new Date(vehicle.contractExpirationDate).toLocaleDateString('de-DE') : ''
    const CreditDate = vehicle.contractExpirationDate ? new Date(vehicle.contractExpirationDate).toLocaleDateString('de-DE') : ''

    const NtiServiceDate = vehicle.nextTechnicalInspection ? new Date(vehicle.nextTechnicalInspection).toLocaleDateString('de-DE') : ''

    return (
        <TableRow className='table__row--root' onClick={() => onHandleCarRender()}>
            <TableCell component="th" scope="row">
                {vehicle.mark}
            </TableCell>
            <TableCell>{vehicle.model}</TableCell>
            <TableCell>{vehicle.registrationNumber}</TableCell>
            <TableCell>
                {`${vehicle.vehicleOwner.firstName} ${vehicle.vehicleOwner.lastName}`}
            </TableCell>
            {
                dashboardAdaptiveTitle !== '' &&
                <TableCell>
                    {dashboardAdaptiveTitle === 'Finanzierung' && vehicle.vehiclePaymentTypeVariant === 'credit' ? CreditDate :
                        dashboardAdaptiveTitle === 'Leasing' && vehicle.vehiclePaymentTypeVariant === 'leasing' ? LeasingDate
                            : dashboardAdaptiveTitle === 'Service läuft in 30 Tagen ab' ? NtiServiceDate : dashboardAdaptiveTitle === 'SERVICE (NTI) überfällig' ? NtiServiceDate : TuvDate}
                </TableCell>
            }
        </TableRow>
    )
}

export default VehicleItemRow
