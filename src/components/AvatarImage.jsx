import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  image: {
    width: 85,
    height: 85,
    borderRadius: 60/3,
  }
});

const AvatarImage = ({item}) => {
  return(
    <View>
      <Image
        style={styles.image}
        source={{uri: item.ownerAvatarUrl}}
      />
    </View>
  );
};

export default AvatarImage;