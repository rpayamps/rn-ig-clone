import { View, Text, Pressable, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'
import { firebase, db } from "../../firebase"

const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string()
            .required()
            .min(6, 'Your password has to be at least 6 characters')
    })

    const onSignup = async (email, password, username) => {
        try{
          const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
          console.log("Firebase User creation was successful" + email, password, username)

          db.collection('users').doc(authUser.user.email).set({
            owner_uid: authUser.user.uid,
            username: username,
            email: authUser.user.email,
            profile_picture: await getRandomProfilePicture(),
          })
        } catch(error){
            Alert.alert("This don't work amigo", error.message)
        }
    }

    const getRandomProfilePicture = async () => {
        const response = await fetch('https://randomuser.me/api')
        const data = await response.json()
        return data.results[0].picture.large
    }

    const button = (isValid) => (
        {
       backgroundColor: isValid,
       alignItems: 'center',
       justifyContent: 'center',
       minHeight: 42,
       borderRadius: 4,
   })
    
    return (
        <View style={styles.wrapper}>
    
            <Formik
                initialValues={{email: '', username: '', password: ''}}
                onSubmit={(values) => {
                    console.log(values)
                    onSignup(values.email,  values.password, values.username)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                 <>
                    <View 
                         style={[
                            styles.inputField,
                                {
                                    borderColor: 
                                         values.email.length < 1 || Validator.validate(values.email)
                                            ? '#ccc'
                                            : 'red',
                                },
                        ]}
                    >
                        <TextInput 
                            placeholderTextColor='#444'
                            placeholder='Email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            autoFocus={true}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
    
                    <View 
                        style={[
                            styles.inputField,
                                {
                                    borderColor:
                                    1 > values.username.length || values.username.length > 1
                                        ? '#ccc'
                                        : 'red',
                                },
                        ]}
                    >
                            <TextInput 
                                    placeholderTextColor='#444'
                                    placeholder='Username'
                                    autoCapitalize='none'
                                    textContentType='username'
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                    value={values.username}
                                />
                    </View>

                    <View 
                        style={[
                            styles.inputField,
                                {
                                    borderColor:
                                    1 > values.password.length || values.password.length > 5
                                        ? '#ccc'
                                        : 'red',
                                },
                        ]}
                    >
                            <TextInput 
                                    placeholderTextColor='#444'
                                    placeholder='Password'
                                    autoCapitalize='none'
                                    secureTextEntry={true}
                                    textContentType='password'
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                />
                    </View>
    
                    <Pressable 
                        titleSize={20} 
                        style={button(isValid ? '#0096F6' : '#9ACAF7')}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.buttonText}> Sign Up</Text>
                    </Pressable>
    
    
                        <View style={styles.loginContainer}>
                            <Text> Already have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text style={{ color: '#6BB0F5' }}>Log in</Text>
                            </TouchableOpacity>
                        </View>
                </>
                 )}
                </Formik>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
        wrapper: {
            marginTop: 80,
        },
    
        inputField: {
            borderRadius: 4,
            padding: 12,
            backgroundColor: '#FAFAFA',
            marginBottom: 10,
            borderWidth: 1,
        },
    
        buttonText: {
            fontWeight: '600',
            color: '#fff',
            fontSize: 20,
        },
    
        loginContainer: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            marginTop: 50,
        },
    })


export default SignupForm