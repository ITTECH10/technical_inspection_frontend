import React from 'react'
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useHistory } from 'react-router-dom';
import { useData } from '../../contexts/DataContext';
import Chip from '@material-ui/core/Chip';
import { withNamespaces } from 'react-i18next';
// import BuildIcon from '@material-ui/icons/Build';

const CarRow = ({ car, t }) => {
    const history = useHistory()
    const { vehicles, setSelectedCar, myVehicles, user, dashboardAdaptiveTitle } = useData()
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
    const CreditDate = new Date(car.contractExpirationDate)
    const LeasingDate = new Date(car.contractExpirationDate)

    const NTIDiff = Math.round(Math.abs((curDate - NTIDate) / oneDay)) + 1;
    const TUVDiff = Math.round(Math.abs((curDate - TUVDate) / oneDay)) + 1;
    const HUDiff = Math.round(Math.abs((curDate - AUDate) / oneDay)) + 1;

    const carTuvExpired = new Date(car.TUV) < new Date()
    const carAuExpired = new Date(car.AU) < new Date()
    const NTIExpired = new Date(car.nextTechnicalInspection) < new Date()

    return (
        <TableRow className='table__row--root' onClick={() => onHandleCarRender()} key={car._id}>
            <TableCell component="th" scope="row">
                {car.mark}
            </TableCell>
            <TableCell>{car.model}</TableCell>
            <TableCell>{car.registrationNumber}</TableCell>
            {user.role === 'admin' &&
                <TableCell>
                    {/* {car.TUVExpiresInTwoMonths &&
                        <Chip
                            label={`TÜV in ${TUVDiff} ${t('DaysPlural')}`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    } */}
                    {new Date(TUVDate) > new Date() &&
                        <Chip
                            label={`TÜV in ${TUVDiff} ${t('DaysPlural')}`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    }
                    {/* {car.AUExpiresInTwoMonths &&
                        <Chip
                            label={`HU in ${HUDiff} ${t('DaysPlural')}`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    } */}
                    {new Date(AUDate) > new Date() &&
                        <Chip
                            label={`HU in ${HUDiff} ${t('DaysPlural')}`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    }
                    {car.technicalInspectionInNextTwoMonths &&
                        <Chip
                            label={`Service in ${NTIDiff} ${t('DaysPlural')}`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                    {carTuvExpired &&
                        <Chip
                            label="TÜV Abgelaufen"
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    }
                    {carAuExpired &&
                        <Chip
                            label="AU Abgelaufen"
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    }
                    {NTIExpired &&
                        <Chip
                            label="Service Abgelaufen"
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                </TableCell>}
            {user.role !== 'admin' && dashboardAdaptiveTitle !== '' && (
                <TableCell>
                    {dashboardAdaptiveTitle === 'Finanzierung' && car.vehiclePaymentTypeVariant === 'credit' ? CreditDate.toLocaleDateString('de-DE') :
                        dashboardAdaptiveTitle === 'Leasing' && car.vehiclePaymentTypeVariant === 'leasing' ? LeasingDate.toLocaleDateString('de-DE')
                            : dashboardAdaptiveTitle === 'Service überfällig' ? NTIDate.toLocaleDateString('de-DE') : TUVDate.toLocaleDateString('de-DE')}
                </TableCell>
            )}
        </TableRow>
    )
}

export default withNamespaces()(CarRow)
