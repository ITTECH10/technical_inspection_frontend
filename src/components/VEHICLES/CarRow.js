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

    // console.log(dashboardAdaptiveTitle)

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
                    {new Date(TUVDate) > new Date() && new Date(TUVDate) < new Date().setMonth(new Date().getMonth() + 1) &&
                        <Chip
                            label={`TÜV fällig in ${TUVDiff} Tag(en)`}
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
                    {new Date(AUDate) > new Date() && new Date(AUDate) < new Date().setMonth(new Date().getMonth() + 1) &&
                        <Chip
                            label={`AU fällig in ${HUDiff} Tag(en)`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginRight: 5 }}
                        />
                    }
                    {new Date(NTIDate) > new Date() && new Date(NTIDate) < new Date().setMonth(new Date().getMonth() + 1) &&
                        <Chip
                            label={`Service fällig in ${NTIDiff} Tag(en)`}
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                    {carTuvExpired &&
                        <Chip
                            label="TÜV abgelaufen"
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginLeft: 5 }}
                        />
                    }
                    {carAuExpired &&
                        <Chip
                            label="AU abgelaufen"
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer', marginLeft: 5 }}
                        />
                    }
                    {NTIExpired &&
                        <Chip
                            label="Service abgelaufen"
                            color="primary"
                            size="small"
                            variant="default"
                            style={{ cursor: 'pointer' }}
                        />
                    }
                </TableCell>}
            {user.role !== 'admin' && dashboardAdaptiveTitle !== '' && (
                <TableCell>
                    {dashboardAdaptiveTitle === 'Finanzierung' && car.vehiclePaymentTypeVariant === 'credit' && car.contractExpirationDate ? CreditDate.toLocaleDateString('de-DE') :
                        dashboardAdaptiveTitle === 'Leasing' && car.vehiclePaymentTypeVariant === 'leasing' && car.contractExpirationDate ? LeasingDate.toLocaleDateString('de-DE')
                            : dashboardAdaptiveTitle === 'Service läuft in 30 Tagen ab' && car.nextTechnicalInspection ? NTIDate.toLocaleDateString('de-DE')
                                : dashboardAdaptiveTitle === 'SERVICE (NTI) überfällig' && car.nextTechnicalInspection ? NTIDate.toLocaleDateString('de-DE')
                                    : car.TUV && TUVDate.toLocaleDateString('de-DE')}
                </TableCell>
            )}
        </TableRow>
    )
}

export default withNamespaces()(CarRow)
