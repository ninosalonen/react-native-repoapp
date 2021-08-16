import React from 'react';
import {View} from 'react-native';
import Text from './Text';

const AvatarLanguage = ({language}) => {
  return(
    <View>
      <Text color='primary'>{language}</Text>
    </View>
  );
};

export default AvatarLanguage;