import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemCard'


const ShareItemPreview = ({classes}) => {
    return (
        <div>
            <ItemCard item = {{
                imageurl: require('../../tekashi.jpg'),
                title: 'toto',
                description: 'toto1'}
            }/>
        </div>
    );
};

export default withStyles(styles)(ShareItemPreview);