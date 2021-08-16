import React from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import { useHistory } from 'react-router';
import {REGISTER} from '../graphql/mutations';
import {useMutation}from '@apollo/client';
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

const schema = yup.object().shape({
  username: yup.string().required("Required field").min(1, "length between 1-30").max(30, "length between 1-30"),
  password: yup.string().required("Required field").min(5, "length between 5-50").max(50, "length between 5-50"),
  confirmPassword: yup.string().required("Required field").min(5, "length between 5-50").max(50, "length between 5-50").oneOf([yup.ref('password')], 'Passwords do not match')
});


const Register = () => {
  const history = useHistory();
  const [register] = useMutation(REGISTER);
  const [ signIn ] = useSignIn();
  return(
    <View>
      <Formik
        initialValues={{username: '', password: '', confirmPassword: ''}}
        onSubmit={async (values) => {
          try{
            const {username, password} = values;
            await register({variables: {username, password}});
            await signIn({ username, password });
            history.push('/');
          }catch(e){
            Alert.alert(e.message);
          }
        }}
        validationSchema={schema}
      >
        {({handleSubmit}) => (
          <View>
            <FormikTextInput name="username" placeholder="username" />
            <FormikTextInput name="password" placeholder="password" secureTextEntry/>
            <FormikTextInput name="confirmPassword" placeholder="confirm password" secureTextEntry/>
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
              <Text fontWeight='bold' fontSize='subheading' style={{color: 'white', textAlign: 'center'}}>Register</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default Register;