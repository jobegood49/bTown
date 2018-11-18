import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import ShareItemForm from '../../components/ShareItemForm'

import styles from './styles';

const Share = ({ classes }) => {
  return (
    <div>
      <ShareItemForm />
    </div>
  );
};

export default withStyles(styles)(Share);
