import React, { useEffect } from 'react';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { View, Pressable, StyleSheet, Alert } from 'react-native';
import Text from './Text';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations'; 
import { useHistory } from 'react-router';

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
  ownerName: yup.string().required("Required field"),
  repositoryName: yup.string().required("Required field"),
  rating: yup.number().typeError('Give a number please').required("Required field").min(1, 'Give a rating between 1-100').max(100, 'Give a rating between 1-100'),
  text: yup.string()
});
const CreateReview = () => {
  const history = useHistory();
  const [createReview, {data}] = useMutation(CREATE_REVIEW);

  useEffect(() => {
    if(data){
      history.push(`/${data.createReview.repositoryId}`);
    }
  }, [data, history]);

  return(
    <View>
      <Formik
        initialValues={{ownerName: '', repositoryName: '', rating: '', text: ''}}
        onSubmit={async (values) => {
          try{
            const {repositoryName, ownerName, text, rating} = values;
            await createReview({variables: {repositoryName, ownerName, text, rating: Number(rating)}});
          }catch(e){
            Alert.alert(e.message);
          }
        }}
        validationSchema={schema}
      >
        {({handleSubmit}) => (
          <View>
            <FormikTextInput name="ownerName" placeholder="Repository owner" />
            <FormikTextInput name="repositoryName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating: 0-100" />
            <FormikTextInput name="text" placeholder="Review" multiline={true} paddingBottom={20} paddingTop={20}/>
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
              <Text fontWeight='bold' fontSize='subheading' style={{color: 'white', textAlign: 'center'}}>Submit review</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default CreateReview;