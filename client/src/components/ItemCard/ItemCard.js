import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './styles'

const ItemCard = ({classes, item}) => {
    return (
        <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image={item.imageurl}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {item.title}
            </Typography>
                    <Typography component="p">
                        {item.description}
            </Typography>
                </CardContent>
                <Button size="small" color="primary">
                    Buy
          </Button>
                <Button size="small" color="primary">
                    Details
          </Button>
        </Card>
    );
};

export default withStyles(styles)(ItemCard);