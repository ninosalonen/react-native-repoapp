import {gql} from '@apollo/client';

export const SIGN_IN = gql`
  mutation ($username: String!, $password: String!){
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview(
    $repositoryName: String!
    $ownerName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        repositoryName: $repositoryName
        ownerName: $ownerName
        rating: $rating
        text: $text
      }
    ) {
      repositoryId
    }
  }
`;

export const REGISTER = gql`
  mutation($username: String! $password: String!){
    createUser(user:{
      username:$username, 
      password: $password
    })
    {	
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation($id: ID!){
    deleteReview(id: $id)
  }
`;