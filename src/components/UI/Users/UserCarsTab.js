import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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

export default function UsersCarTab() {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://images.unsplash.com/photo-1541443131876-44b03de101c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Bmw
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lorem ipsum dolor sir amet.
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
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://images.unsplash.com/photo-1551836989-b4622a17a792?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Mercedes
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lorem ipsum dolor sir amet.
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
        </>
    );
}
