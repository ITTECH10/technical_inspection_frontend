import React from 'react'
import { useData } from '../../contexts/DataContext'
import { Typography, Divider } from '@material-ui/core'
import { withNamespaces } from 'react-i18next'
import FileCategoryTabs from './../VEHICLES/FileCategoryTabs'

const GalleryAlternativeReal = ({ t, setOnHandleDeleteOpen }) => {
    const { carImages } = useData()

    return (
        <>
            {carImages.length > 0 ? (
                <>
                    <Typography variant="h5" align="left" style={{ margin: '10px 0' }}>
                        {t('VehicleDocumentsTitle')}
                    </Typography>
                    <Divider style={{ marginBottom: 10 }} />
                </>
            ) : (
                <>
                    <Typography variant="h5" align="left" style={{ margin: '10px 0' }}>
                        {t('NoVehicleDocumentsYet')}
                    </Typography>
                    <Divider style={{ marginBottom: 10 }} />
                </>
            )
            }

            <FileCategoryTabs files={carImages} setOnHandleDeleteOpen={setOnHandleDeleteOpen} />
        </>
    )
}

export default withNamespaces()(GalleryAlternativeReal)
