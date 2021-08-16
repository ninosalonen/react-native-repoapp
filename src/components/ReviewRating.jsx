import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  rating: {
    fontSize: 20,
    color: '#00b894',
    alignSelf: 'center',
    marginTop: 10
  },
  box:{
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: '#00b894',
    borderRadius: 50,
  }
});

const ReviewRating = ({review}) => {
  return(
    <View style={styles.box}>
      <Text style={styles.rating}>{review.rating}</Text>
    </View>
  );
};

export default ReviewRating;