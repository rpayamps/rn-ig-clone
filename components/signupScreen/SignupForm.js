import { View, Text, Pressable, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Validator from 'email-validator'

const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string()
            .required()
            .min(6, 'Your password has to be at least 6 characters')
    })

    const onSignup = async (email, password) => {
        try{

        } catch(error){
            Alert.alert(' My Lord ....', error.message)
        }
    }
    
    return (
        <View style={styles.wrapper}>
    
            <Formik
                intialValues={{email: '', username: '', password: ''}}
                onSumbit={(values) => {
                    console.log(values)
                }}
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                    {({handleChange, handleBlur, handleSumbit, values, isValid}) => (
                 <>
                    <View 
                        styles={[
                            styles.inputField,
                                {
                                    borderColor: 
                                         values.email.length < 1 || Validator.validate(values)
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
                            onBl ur={handleBlur('email')}
                            value={values.email}
                        />
                    </View>
    
                    <View 
                        style={[
                            styles.inputField,
                                {
                                    borderColor:
                                    1 > values.password.length || values.paddword.length > 6
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
                                    1 > values.password.length || values.paddword.length > 6
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
                        style={styles.button(isValid)} 
                        onPress={handleSumbit}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Pressable>
    
    
                        <View style={styles.loginContainer}>
                            <Text>Already have an account?</Text>
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
    
        button: isValid => ({
            backgroundColor: isValid ? '#0096F6': '#9ACAF7',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 42,
            borderRadius: 4,
        }),
    
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