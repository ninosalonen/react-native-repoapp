import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();

  const signIn = async ({ username, password }) => {
    await mutate({variables: {username, password}, fetchPolicy: 'no-cache'});
  };
  if(result.data){
    authStorage.setAccessToken(result.data.authorize.accessToken);
    apolloClient.resetStore();
  }
  return [signIn, result];
};

export default useSignIn;