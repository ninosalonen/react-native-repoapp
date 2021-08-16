import React from 'react';
import ReviewItem from './ReviewItem';
import {View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Text from './Text';
import { useMutation } from '@apollo/client';
import {DELETE_REVIEW} from '../graphql/mutations';
import {OWN_REVIEWS} from '../graphql/queries';
import {useHistory} from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'space-evenly', 
    paddingBottom: 20
  },
  button:{
    backgroundColor: '#00b894',
    padding: 15,
    borderRadius: 12,
    flexGrow: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  text:{
    textAlign: 'center',
    color: 'white',
    fontSize: 16
  }
});

const OwnReviewItem = ({item}) => {

  const history = useHistory();
  const [del] = useMutation(DELETE_REVIEW);

  return(
    <View style={{flex: 1}}>
      <ReviewItem item={item} isReviewItem={true}/>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => {
          history.push(`/${item.repository.id}`);
        }}>
          <Text fontWeight='bold' style={styles.text}>View repository</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.button, backgroundColor: '#d63031'}} onPress={() => {
          Alert.alert(
            "Confirm deletion",
            "Are you sure?",
            [
              {
                text: "Cancel",
                style: "cancel"
              },
              { text: "OK", onPress: () => del({variables:{id: item.id}, refetchQueries:[OWN_REVIEWS]}) }
            ]
          );
        }}>
          <Text fontWeight='bold' style={styles.text}>Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OwnReviewItem;