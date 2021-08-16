import React from 'react';
import {View, StyleSheet } from 'react-native';
import AvatarImage from './AvatarImage';
import AvatarData from './AvatarData';
import AvatarLanguage from './AvatarLanguage';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.card.backgroundcolor,
    padding: 10,
    overflow: 'hidden'
  },
});

const RepositoryItem = ({item}) => {
  return(
      <View style={styles.item}>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <AvatarImage item={item}/>
          <View style={{display: 'flex', flex: 1, flexDirection: 'column', padding: 12}}>
            <Text fontWeight='bold' fontSize='subheading'>{item.fullName}</Text>
            <Text style={{marginTop: 5, marginBottom: 5}}>{item.description}</Text>
            <AvatarLanguage language={item.language}/>
          </View>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', padding: 8}}>
          <AvatarData itemdata={item.stargazersCount} itemdataname='Stars'/>
          <AvatarData itemdata={item.forksCount} itemdataname='Forks'/>
          <AvatarData itemdata={item.reviewCount} itemdataname='Reviews'/>
          <AvatarData itemdata={`${item.ratingAverage}/100`} itemdataname='Rating'/>
        </View>
      </View>
    
  );
};

export default RepositoryItem;