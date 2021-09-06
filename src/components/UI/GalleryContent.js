import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Dialog, Box } from '@material-ui/core';
import DeleteVehicleFiles from './../VEHICLES/DeleteVehicleFiles'
import { withNamespaces } from 'react-i18next';
import PdfIcon from './../../assets/images/pdf-icon.svg'

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    media: {
        height: 150,
        // width: 160
    },
    imgBox: {},
    img: {
        height: '100%',
        width: '100%'
    },
    fileNameBox: {
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center'
    },
    pdfIconBox: {
        // height: 25,
        width: 22,
        marginRight: 5
    },
    pdfIcon: {
        height: '100%',
        width: '100%'
    }
}));

const GalleryContent = ({ image, setOnHandleDeleteOpen, t }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const formatedTitle = `${new Date(image.createdAt).toLocaleDateString()} ${new Date(image.createdAt).toLocaleTimeString()}`

    const imgBox = {
        borderRadius: 3,
        overflow: 'hidden',
        height: '100vh',
        width: '80vw',
        background: `url(${`${image.url}`})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain'
    }

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handlePdfDownload = () => {
        var link = document.createElement('a')
        link.href = image.url
        link.target = '_blank'
        link.download = 'file.pdf'
        link.dispatchEvent(new MouseEvent('click'));
    }

    return (
        <>
            <Card className={classes.root}>
                <CardActionArea onClick={handleOpen}>
                    {image.format === 'jpg' || image.format === 'png' ?
                        <CardMedia
                            className={classes.media}
                            image={image.url}
                            title="image"
                            style={{ backgroundSize: 'cover' }}
                        /> : null}
                    <CardContent>
                        <Box className={classes.fileNameBox}>
                            {image.format === 'pdf' &&
                                <Box className={classes.pdfIconBox}>
                                    <img alt="pdf" src={PdfIcon} className={classes.pdfIcon} />
                                </Box>}
                            <Typography>
                                {image.format === 'jpg' || image.format === 'png' ? formatedTitle
                                    : `${image.name}`
                                }
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <DeleteVehicleFiles fileId={image._id} setOnHandleDeleteOpen={setOnHandleDeleteOpen} />
                </CardActions>
            </Card>

            <Dialog PaperProps={{ style: { maxWidth: '100%' } }} open={open} onClose={handleClose}>
                {/* <DialogContent> */}
                {image.format === 'jpg' || image.format === 'png' ?
                    <Box style={imgBox}>
                        {/* <img alt="gallery-car" src={image.url} className={classes.img} /> */}
                        <Typography style={{ position: 'absolute', bottom: 5, right: 10, fontSize: 20, fontWeight: 'bold' }}>{formatedTitle}</Typography>
                    </Box> : <Button variant="contained" size="large" color="primary" onClick={() => handlePdfDownload()}>{t('DownloadPdfButton')}</Button>}
                {/* </DialogContent> */}
            </Dialog>
        </>
    )
}

export default withNamespaces()(GalleryContent)
