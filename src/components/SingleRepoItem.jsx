import React from 'react';
import RepositoryItem from './RepositoryItem';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import Text from './Text';
import { useParams } from 'react-router';
import { SINGLE_REPO } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import * as Linking from 'expo-linking';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    padding: 10,
    borderRadius: 60/3
  },
  touchable: {
    marginLeft: 110,
    marginRight: 110,
    backgroundColor: '#00b894',
    marginBottom: 10,
    padding: 2,
    borderRadius: 12
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey'
  },
});

const ItemSeparator = () => <View style={styles.separator} />;


const SingleRepoItem = () => {
  const { id } = useParams();
  const {data, fetchMore, loading} = useQuery(SINGLE_REPO, {variables: {id, first: 8}, fetchPolicy: 'cache-and-network'});

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        variables: {searchKeyword: id}
      },
    });
  };

  const items = data ? data.repository : null;
  const reviewNodes = data ? data.repository.reviews.edges.map(edge => edge.node) : [];

  const renderItem = ({ item }) => (
    <ReviewItem item={item} />
  );

  const onEndReached = () => {
    handleFetchMore();
  };

  if(items === null){
    return <View></View>;
  }

  return(
    <View style={{flexGrow: 1, flexShrink: 1, paddingBottom: 15}}>
      <RepositoryItem item={items}/>
      <TouchableOpacity style={styles.touchable} onPress={() => Linking.openURL(items.url)}>
        <Text style={styles.button}fontWeight='bold' fontSize='subheading'>Open in GitHub</Text>
      </TouchableOpacity>
      <View style={{padding: 0.5, backgroundColor: 'lightgrey'}}></View>
      <FlatList
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(_review,index) => index.toString()}
      />
    </View>
  );
};

export default SingleRepoItem;