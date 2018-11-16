import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles'

const ItemCard = ({classes}) => {
    return (
        <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
            </Typography>
                    <Typography component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
            </Typography>
                </CardContent>
                <Button size="small" color="primary">
                    Share
          </Button>
                <Button size="small" color="primary">
                    Learn More
          </Button>
        </Card>
    );
};

export default withStyles(styles)(ItemCard);