import React from 'react'
import { useData } from '../../contexts/DataContext'
import { Typography } from '@material-ui/core'
import { withNamespaces } from 'react-i18next'
import FileCategoryTabs from './../VEHICLES/FileCategoryTabs'

const GalleryAlternativeReal = ({ t, setOnHandleDeleteOpen }) => {
    const { carImages } = useData()

    return (
        <>
            {carImages.length > 0 ?
                <Typography variant="h6" align="left" style={{ marginTop: 10 }}>
                    {t('VehicleDocumentsTitle')}
                </Typography> :
                <Typography variant="h6" align="left" style={{ marginTop: 10 }}>
                    {t('NoVehicleDocumentsYet')}
                </Typography>}

            <FileCategoryTabs files={carImages} setOnHandleDeleteOpen={setOnHandleDeleteOpen} />
        </>
    )
}

export default withNamespaces()(GalleryAlternativeReal)
