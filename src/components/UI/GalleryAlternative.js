import React from 'react'
import { useData } from '../../contexts/DataContext'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GalleryContent from './GalleryContent'
import Alerts from './Alerts'
import { withNamespaces } from 'react-i18next'

const useStyles = makeStyles(theme => ({
    boxFlex: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        }
    }
}));

const GalleryAlternativeReal = ({ t }) => {
    const { carImages } = useData()
    const classes = useStyles()
    const [fileDeleteOpen, setFileDeleteOpen] = React.useState(false)

    const content = carImages.map(x => {
        return <GalleryContent key={x.url} image={x} onHandleFileDeleteAlert={setFileDeleteOpen} />
    })

    return (
        <>
            <Alerts severity="error" message={t('AlertGeneralDeleted')} open={fileDeleteOpen} handleOpening={setFileDeleteOpen} />
            <Typography variant="h5" align="center">
                {t('VehicleDocumentsTitle')}
            </Typography>

            <Box className={classes.boxFlex}>
                {content}
            </Box>
        </>
    )
}

export default withNamespaces()(GalleryAlternativeReal)
