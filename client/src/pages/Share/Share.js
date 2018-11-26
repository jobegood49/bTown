import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm'

import ShareItemPreview from '../../components/ShareItemPreview';
import styles from './styles'
import { connect } from 'react-redux'

const Share = (props) => {
  const { classes, shareItemPreview } = props
  console.log(shareItemPreview, classes)
  // console.log(props.shareItemPreview, 'toto')
  return (
    <div className={classes.container}>
      <ShareItemPreview />
      <ShareItemForm />
    </div>
  );
};

const mapStateToProps = state => ({
  shareItemPreview: state.shareItemPreview
})

export default connect(mapStateToProps)(withStyles(styles)(Share));
