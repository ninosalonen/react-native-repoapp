import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';
import ReviewRating from './ReviewRating';

const styles = StyleSheet.create({
  textbox: {
    display: 'flex',
    flexShrink: 1,
    flexGrow: 1,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10
  },
  all: {
    display: 'flex',
    flexDirection: 'row'
  },
  single: {
    fontSize: 16,
    margin: 5
  },
  rating: {
    padding: 20
  }
});

const ReviewItem = ({item, isReviewItem=false}) => {
  const date = new Date(item.createdAt).toISOString().split('T')[0];
  let usrname = item.user.username;
  if(isReviewItem){
    usrname = item.repository.fullName;
  }
  return(
    <View style={styles.all}>
      <View style={styles.rating}>
        <ReviewRating review={item}/>
      </View>
      <View style={styles.textbox}>
        <Text style={styles.single} fontWeight='bold'>{usrname}</Text>
        <Text style={styles.single} color='textSecondary'>{date}</Text>
        <Text style={styles.single} >{item.text}</Text>
      </View>
    </View>
  );
};

export default ReviewItem;