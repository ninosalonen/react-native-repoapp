import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import Text from './Text';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import {useHistory} from 'react-router';


const SignOut = () => {
  const history = useHistory();
  const authStorage = useAuthStorage();
  const client = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    client.resetStore();
    history.push('/');
  };

  return(
    <View>
      <TouchableOpacity onPress={signOut}>
        <View>
          <Text style={{paddingLeft: 15, paddingRight: 15, fontSize: 18}}fontWeight='bold' fontSize='subheading'>Sign out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SignOut;