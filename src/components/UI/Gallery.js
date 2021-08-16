import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { Typography } from "@material-ui/core";
import { useData } from './../../contexts/DataContext'

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

function GalleryCmp() {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const { carImages } = useData()

    const formatedPhotos = carImages.map(image => {
        const formatedTitle = `${new Date(image.createdAt).toLocaleDateString()} ${new Date(image.createdAt).toLocaleTimeString()}`
        return {
            src: image.url,
            height: 3,
            width: 5,
            title: `Uploaded on: ${formatedTitle}`
        }
    })

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div>
            <Typography variant="h5" align="center">Images</Typography>
            <Gallery direction="column" columns={2} photos={formatedPhotos} onClick={openLightbox} />
            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={formatedPhotos.map((x) => ({
                                ...x,
                                srcset: x.srcSet,
                                caption: x.title
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </div>
    );
}

export default GalleryCmp