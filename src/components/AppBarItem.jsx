import React from 'react';
import {View} from 'react-native';
import Text from './Text';

const AppBarItem = ({text}) => {
  return(
    <View>
      <Text style={{paddingLeft: 15, paddingRight: 15, fontSize: 18}}fontWeight='bold' fontSize='subheading'>{text}</Text>
    </View>
  );
};

export default AppBarItem;