import React from 'react';
import {View, Pressable, StyleSheet, Keyboard} from 'react-native';
import { useHistory } from "react-router-dom";
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import {Formik} from 'formik';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#00b894',
    paddingBottom: 20,
    paddingTop: 20,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 60/6,
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(4, 'Username too short, minimum length is 4')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password too short, minimum length is 5')
    .required('Password is required'),
});

const SignIn = () => {
  // eslint-disable-next-line no-unused-vars
  const [ signIn ] = useSignIn();
  const history = useHistory();
  return(
    <View>
      <Formik
        initialValues={{username: '', password: ''}}
        onSubmit={ async (values) => {
          const {username, password} = values;
          try {
            await signIn({ username, password });
            Keyboard.dismiss();
            history.push('/');
          } catch (e) {
            console.log(e);
          }
        }}
        validationSchema={validationSchema}
      >
        {({handleSubmit}) => (
          <View>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" secureTextEntry/>
            <Pressable 
              title='submit' 
              onPress={handleSubmit} 
              style={({ pressed }) => [styles.button, 
                {
                  backgroundColor: pressed
                    ? 'lightblue'
                    : styles.button.backgroundColor
                }
              ]}
            >
              <Text fontWeight='bold' fontSize='subheading' style={{color: 'white', textAlign: 'center'}}>Sign in</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;