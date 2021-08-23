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
    imgBox: {
        borderRadius: 3,
        overflow: 'hidden',
        height: 250,
        // width: 500,
        [theme.breakpoints.up('md')]: {
            height: 600
        }
    },
    img: {
        height: '100%',
        width: '100%'
    },
    rootPaper: {
        [theme.breakpoints.up('md')]: {
            maxWidth: 900
        }
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

const GalleryContent = ({ image, onHandleFileDeleteAlert, t }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const formatedTitle = `${new Date(image.createdAt).toLocaleDateString()} ${new Date(image.createdAt).toLocaleTimeString()}`

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
                            <Box className={classes.pdfIconBox}>
                                <img alt="pdf" src={PdfIcon} className={classes.pdfIcon} />
                            </Box>
                            <Typography>
                                {image.format === 'jpg' || image.format === 'png' ? formatedTitle
                                    : `${image.name}`
                                }
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <DeleteVehicleFiles onHandleFileDeleteAlert={onHandleFileDeleteAlert} fileId={image._id} />
                </CardActions>
            </Card>

            <Dialog PaperProps={{ className: { root: classes.rootPaper } }} open={open} onClose={handleClose}>
                {/* <DialogContent> */}
                {image.format === 'jpg' || image.format === 'png' ?
                    <Box className={classes.imgBox}>
                        <img alt="gallery-car" src={image.url} className={classes.img} />
                        <Typography style={{ position: 'absolute', bottom: 5, right: 10, fontSize: 12, color: '#fff' }}>{formatedTitle}</Typography>
                    </Box> : <Button variant="contained" size="large" color="primary" onClick={() => handlePdfDownload()}>Download pdf</Button>}
                {/* </DialogContent> */}
            </Dialog>
        </>
    )
}

export default withNamespaces()(GalleryContent)
