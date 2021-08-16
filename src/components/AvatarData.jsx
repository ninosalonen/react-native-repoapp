import React from 'react';
import {View, StyleSheet} from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    justifyContent: 'center'
  },
  data:{
    textAlign: 'center',
    margin: 1
  }
});

const AvatarData = ({itemdata, itemdataname}) => {
  let itemDataToShow = itemdata;
  if(itemdata>999){
    itemDataToShow = itemdata/1000;
    itemDataToShow = itemDataToShow.toFixed(1) +  'k';
  }

  return(
    <View style={styles.view}>
      <Text fontWeight='bold' style={styles.data}>{itemdataname}</Text>
      <Text style={styles.data}>{itemDataToShow}</Text>
    </View>
  );
};

export default AvatarData;