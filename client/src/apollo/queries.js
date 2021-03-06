import gql from 'graphql-tag';

/**
 * Item and user-related queries and mutations.
 */

const ItemFields = gql`
  fragment ItemFields on Item {
    # @TODO: Create a fragment to query the following fields for an item:
    #
    # id
    # title
    # imageurl
    # description
    # created
    # tags (id and title fields)
    # itemowner (id, fullname, email, and bio fields)
    # borrower (id, fullname, email, and bio fields)
    #
    # See the Apollo docs for instructions on how to use fragments:
    # https://www.apollographql.com/docs/angular/features/fragments.html
    id
    title
    imageurl
    description
    created
    tags {
      id
      title
    }
    itemowner {
      id
      fullname
      email
      bio
    }
    borrower {
      id
      fullname
      email
      bio
    }
  }
`;

// export const ITEM_QUERY = gql`
//   query items($id: ID!) {
//     # @TODO: Query an item by its id and return the ItemFields fragment.
//     items(filter: $id) {
//       ...ItemFields
//     }
//   }
//   ${ItemFields}
// `;

export const ALL_ITEMS_QUERY = gql`
  query items($filter: ID) {
    items(filter: $filter) {
      ...ItemFields
    }
    # @TODO: Query items (optionally by tag id) and return the ItemFields fragment.
  }
  ${ItemFields}
`;

// export const ALL_USER_ITEMS_QUERY = gql`
//   query user($id: ID!) {
   
//   }
//   ${ItemFields}
// `;

export const ALL_TAGS_QUERY = gql`
  query {
    tags{
      id
      title
    }
  }
`;

export const ADD_ITEM_MUTATION = gql`
  mutation ($ownerid: ID!, $title: String!, $description: String!,
      $tags: [AssignedTag]!, $image: Upload!) {
        addItem(ownerid: $ownerid, title: $title, description: $description, tags: $tags, image: $image ) 
  }
`;

// /**
//  * Auth-related queries and mutations.
//  */

export const VIEWER_QUERY = gql`
  query {
    # @TODO: Query the id, email, fullname, and bio fields for the viewer.
    viewer {
      id 
      email
      fullname
      bio
    }
  }
`;
// export const LOGOUT_MUTATION = gql`
//   mutation {
//     # @TODO: Run the logout mutation.
//   }
// `;

// export const SIGNUP_MUTATION = gql`
//   mutation signup($user: SignupInput!) {
//     # @TODO: Pass the user into the signup mutation as an argument
//     # and return the id of the new user when the mutation is complete.
//   }
// `;

export const LOGIN_MUTATION = gql`
  mutation ($email: String!, $password: String!) {
  login(email: $email, password: $password)
  }
`;
