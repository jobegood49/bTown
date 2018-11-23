import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm'
import ShareItemPreview from '../../components/ShareItemPreview'

import styles from './styles';

const Share = ({ classes }) => {
  return (
    <div className={classes.container}>
      <ShareItemPreview />
      <ShareItemForm />
    </div>
  );
};

export default withStyles(styles)(Share);
