import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ItemsContainer from './../../containers/ItemsContainer'
import ItemCard from '../../components/ItemCard'


import React from 'react';

import styles from './styles';

const Items = ({ classes }) => {
  const spacing = 16;

  return (
    <ItemsContainer>
      {({ itemsData: { loading, error, items } }) => {
        if (loading) return 'loading';
        if (error) return 'error';
        return (
          <div>
            <Grid container className={classes.demo} justify="center" spacing={spacing}>
              {items.map(item => (
                <Grid key={item.id} item>
                  <ItemCard item={item}/>
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
