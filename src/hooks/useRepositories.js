import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (search, orderBy, orderDirection) => {

  const {data, loading, fetchMore} = useQuery(GET_REPOSITORIES, {variables: {first: 8, searchKeyword: search, orderBy, orderDirection}, fetchPolicy: 'cache-and-network'});

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        variables: {searchKeyword: search, orderBy, orderDirection}
      },
    });
  };

  return { 
    repositories : data?.repositories,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;