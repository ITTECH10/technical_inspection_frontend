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

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
        // marginBottom: 10
        marginRight: 10
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
    }
}));

const GalleryContent = ({ image, onHandleFileDeleteAlert }) => {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false)

    const formatedTitle = `${new Date(image.createdAt).toLocaleDateString()} ${new Date(image.createdAt).toLocaleTimeString()}`

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
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
                        <Typography>
                            {image.format === 'jpg' || image.format === 'png' ? formatedTitle
                                : `${image._id}.${image.format}`
                            }
                        </Typography>
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
                    </Box> : <Button variant="contained" size="large" color="primary">Download pdf</Button>}
                {/* </DialogContent> */}
            </Dialog>
        </>
    )
}

export default GalleryContent
