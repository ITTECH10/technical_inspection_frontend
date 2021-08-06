import React from 'react'
import { useHistory } from 'react-router-dom'
import { useData } from '../../contexts/DataContext'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    mainContainer: {},
    imageBox: {
        height: 250
    },
    image: {
        height: '100%',
        width: '100%'
    },
    carTitle: {
        fontWeight: 500,
    },
    textTitlesBox: {
        marginTop: 5,
        marginLeft: 5
    },
    carInspectedTitle: {
        marginTop: 10,
        fontWeight: 600
    }
}))

const CarDetails = () => {
    const history = useHistory()
    const {myVehicles} = useData()
    const classes = useStyles()

    const carId = history.location.pathname.split('/')[2]
    const corespondingCar = myVehicles.find(v => v._id === carId)
    const {image, model, modelDetails, lastTechnicalInspection} = corespondingCar

    const formatedDate = new Date(lastTechnicalInspection).toDateString()

    return (
        <Box className={classes.mainContainer}>
            <Box className={classes.imageBox}>
                <img src={image} alt="Car" className={classes.image} />
            </Box>
            <Box className={classes.textTitlesBox}>
                <Typography className={classes.carTitle} variant="h4">{model}</Typography>
                <Typography className={classes.carDetails}>
                    lorem ipsum dolor sir amet.
                    lorem ipsum dolor sir amet.
                    lorem ipsum dolor sir amet.
                    lorem ipsum dolor sir amet.
                    lorem ipsum dolor sir amet.
                </Typography>
                <Typography className={classes.carInspectedTitle}>Last car check: <span style={{fontWeight: 400}}>{formatedDate}</span></Typography>
            </Box>
        </Box>
    )
}

export default CarDetails
