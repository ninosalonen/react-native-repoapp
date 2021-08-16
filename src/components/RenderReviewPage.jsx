import React from 'react';
import {View, FlatList, StyleSheet } from 'react-native';
import OwnReviewItem from './OwnReviewItem';
import { useQuery } from '@apollo/client';
import { OWN_REVIEWS } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'lightgrey'
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RenderReviewPage = () => {

  const {data} = useQuery(OWN_REVIEWS, {fetchPolicy: 'cache-and-network'});

  const reviewNodes = data ? data.authorizedUser.reviews.edges.map(edge => edge.node) : [];

  const renderItem = ({item}) => {
    return <OwnReviewItem item={item}/>;
  };

  return(
    <View style={{flexShrink: 1, flexGrow :1}}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(_item,index) => index.toString()}
      />
    </View>
  );
};

export default RenderReviewPage;