import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import AppBarItem from './AppBarItem';
import theme from '../theme';
import { Link } from 'react-router-native';
import SignOut from './SignOut';
import { useQuery } from '@apollo/client';
import { AUTHORIZE } from '../graphql/queries';


const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBar.backgroundcolor,
    paddingTop: Constants.statusBarHeight
  }
});

const AppBar = () => {
  const {data} = useQuery(AUTHORIZE);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(data && data.authorizedUser){
      setUser(data.authorizedUser);
    }else{
      setUser(null);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={{paddingBottom: 15}}>
        {!user
        ? <View style={{flexDirection: 'row'}}>
            <Link to="/" component={TouchableOpacity}>
              <AppBarItem text='Repositories'/>
            </Link>
            <Link to="/signin" component={TouchableOpacity}>
              <AppBarItem text='Sign in'/>
            </Link> 
            <Link to='register' component={TouchableOpacity}>
              <AppBarItem text='Register'/>
            </Link>
        </View>
        : <View style={{flexDirection: 'row'}}>
                  <Link to="/" component={TouchableOpacity}>
          <AppBarItem text='Repositories'/>
        </Link>
            <Link to="/reviews" component={TouchableOpacity}>
              <AppBarItem text='My reviews'/>
            </Link> 
            <Link to="/create-review" component={TouchableOpacity}>
              <AppBarItem text='Create a review'/>
            </Link> 
            <SignOut/>
          </View>}
      </ScrollView>
    </View>
  );
};

export default AppBar;