import React from 'react';
import {StyleSheet, View } from 'react-native';
import AppBar from './AppBar';
import SignIn from './SignIn';
import RepositoryList from './RepositoryList';
import { Route, Switch, Redirect } from 'react-router-native';
import SingleRepoItem from './SingleRepoItem';
import CreateReview from './CreateReview';
import Register from './Register';
import RenderReviewPage from './RenderReviewPage';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  }
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Switch>
        <Route exact path='/reviews'>
          <RenderReviewPage/>
        </Route>
        <Route exact path='/signin'>
          <SignIn/>
        </Route>
        <Route exact path='/register'>
          <Register/>
        </Route>
        <Route exact path='/create-review'>
          <CreateReview/>
        </Route>
        <Route path='/:id'>
          <SingleRepoItem/>
        </Route>
        <Route exact path='/'>
          <RepositoryList/>
        </Route>
        <Redirect to='/'/>
      </Switch>
    </View>
  );
};

export default Main;