import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ItemsContainer from './../../containers/ItemsContainer'


import React from 'react';

import styles from './styles';

const Items = ({ classes }) => {
  this.state = {
    spacing: '16',
  };
  const { spacing } = this.state;

  return (
    <ItemsContainer>
      {({ itemsData: { loading, error, items } }) => {
        if (loading) return 'loading';
        if (error) return 'error';
        return (
          <div>
            <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
              {items.map(value => (
                <Grid key={value} item>
                  <Paper className={classes.paper} />
                  <p>{value.title}</p>
                </Grid>
              ))}
            </Grid>
          </div>
        )
      }

      }
    </ItemsContainer>


  )

};

export default withStyles(styles)(Items);
