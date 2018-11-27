import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemCard'
import { connect } from 'react-redux'

const ShareItemPreview = (props) => {
    const { classes, shareItemPreview } = props
    console.log(props,'this the props')
    
    return (
        <div>
            <ItemCard item={shareItemPreview}/>
        </div>
    );
};

const mapStateToProps = state => ({
    shareItemPreview: state.shareItemPreview
})

export default connect(mapStateToProps)(withStyles(styles)(ShareItemPreview))
