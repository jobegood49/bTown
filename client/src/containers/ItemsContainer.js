import { adopt } from 'react-adopt';
import { Query, Mutation } from 'react-apollo';
import React from 'react';

// @TODO: Uncommment this line when the ViewerProvider is added to the app.
// import { ViewerContext } from '../context/ViewerProvider'
// -------------------------------

import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  // ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries';

const itemsData = ({ render }) => {
  return (
    <Query query={ALL_ITEMS_QUERY}>
      {({ loading, error, data: { items } = {} }) =>
        render({ loading, error, items })
      }
    </Query>
  )


  /**
   * @TODO: Use Apollo's <Query /> component to fetch all the items.
   *
   * Note: Your query will need to filter out borrowed items.
   *
   * The final query will ultimately filter out items that belong to the
   * currently logged-in user once you have added authentication.
   */

};

// const userItemsData = ({ userId, render }) => {
  /**
   * @TODO: Use Apollo's <Query /> component to fetch all of a user's items.
   *
   * Note: Your query will need to retrieve only items that belong to a
   * specific user id.
   */
//   return undefined;
// };

const tagData = ({ render }) => {
  return(
    <Query query={ALL_TAGS_QUERY}>
    {({ loading, error, data: { tags } = {} }) =>
      render({ loading, error, tags })
    }
  </Query>
  )

};

const addItem = ({ render }) => {
  return (
    <Mutation
    mutation={ADD_ITEM_MUTATION}
  >
    {(mutation, { data, error, loading }) =>
      render({ mutation, data, error, loading })}
  </Mutation>
  )
};
const ItemsContainer = adopt({
  // @TODO: Uncomment each line as you write the corresponding query.
  tagData,
  itemsData,
  // userItemsData,
  addItem
  // -------------------------------
});

export default ItemsContainer;
