import React from 'react'
import UploadCarImages from '../components/VEHICLES/UploadCarImages'
import CarDetails from '../components/VEHICLES/CarDetails'
import Alerts from '../components/UI/Alerts'
import { withNamespaces } from 'react-i18next'
import Loader from '../utils/Loader'
import { useData } from '../contexts/DataContext'

const CarDetailsScreen = ({ t }) => {
    const [onHandleAddOpen, setOnHandleAddOpen] = React.useState(false)
    const [onHandleDeleteOpen, setOnHandleDeleteOpen] = React.useState(false)
    const { loading } = useData()

    return (
        !loading ?
            <>
                <Alerts message={t('AlertGeneralSuccessful')} open={onHandleAddOpen} handleOpening={setOnHandleAddOpen} />
                <Alerts severity="error" message={t('AlertGeneralDeleted')} open={onHandleDeleteOpen} handleOpening={setOnHandleDeleteOpen} />
                <UploadCarImages
                    onHandleAddOpen={onHandleAddOpen}
                    setOnHandleAddOpen={setOnHandleAddOpen}
                />
                <CarDetails setOnHandleDeleteOpen={setOnHandleDeleteOpen} />
            </> : <Loader />
    )
}

export default withNamespaces()(CarDetailsScreen)
