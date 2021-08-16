import {gql} from '@apollo/client';

export const OWN_REVIEWS = gql`
  query{
    authorizedUser{
      reviews{
        edges{
          node{
            createdAt
            rating
            text
            repository{
              fullName
              id
            }
            user{
              username
            }
            id
          }
        }
      }
    }
  }
`;

export const GET_REPOSITORIES = gql`
  query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first){
      edges{
        cursor
        node{
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          id
        }
      }
      pageInfo{
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const SINGLE_REPO = gql`
  query ($id: ID!,$first: Int, $after: String){
    repository(id: $id) {
      id
      fullName
      url
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      ownerAvatarUrl
      reviews(after: $after, first: $first) {
        pageInfo{
          endCursor
          hasNextPage
          startCursor
        }
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const AUTHORIZE = gql`
  {
    authorizedUser {
      id
      username
    }
  }
`;