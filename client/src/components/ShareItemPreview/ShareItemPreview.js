import React from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';
import ItemCard from '../ItemCard'
import { connect } from 'react-redux'



const ShareItemPreview = ({ classes}) => {
    console.log(this.props, 'props')
    return (
        <div>
            <ItemCard item={{
                imageurl: require('../../tekashi.jpg'),
                title: 'toto',
                description: 'toto1'
            }
            } />
        </div>
    );
};

const mapStateToProps = state => ({
    shareItemPreview: state.shareItemPreview
})

// export default withStyles(styles)(ShareItemPreview);

export default connect(mapStateToProps)(withStyles(styles)(ShareItemPreview))
