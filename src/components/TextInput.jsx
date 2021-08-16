import React from 'react';
import {TextInput as NativeTextInput, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  style:{
    borderWidth: 1,
    borderColor: '#b2bec3',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    padding: 20,
    borderRadius: 60/6
  }
});

const TextInput = ({ error, ...props }) => {
  const style = {...styles.style};
  if(error){
    style.borderColor = '#d73a4a';
  }

  return <NativeTextInput style={style} {...props}/>;
};

export default TextInput;
