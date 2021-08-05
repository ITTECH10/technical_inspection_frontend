import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import CarTest from './../../assets/images/car-test.webp'

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
        minHeight: 250,
        marginBottom: 10
    },
    media: {
        height: 140,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
});

const CarCard = ({car}) => {
    const classes = useStyles();
    const history = useHistory()
    const {image, model, modelDetails} = car

    return (
        <Card className={classes.root}>
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image={CarTest}
                title="Car"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {model}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {modelDetails}
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button variant="contained" size="small" color="primary">
                Details
            </Button>
            <Button variant="contained" size="small" color="secondary">
                Delete
            </Button>
        </CardActions>
    </Card>
    )
}

export default CarCard
