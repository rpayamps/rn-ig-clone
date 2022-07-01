import { View, Text, Image, TextInput, Button } from 'react-native'
import { React, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { Divider } from 'react-native-elements'
import { db, firebase } from '../../firebase'





const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required('A URL is required'),
    caption: Yup.string().max(2200, 'Caption has reached the character limit.'),
})

const PLACEHOLDER_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXOzs709PTv7+/S0tLz8/PQ0NDe3t7u7u7p6erl5eXb29vX19fZ2dnh4eHLy8vn5+cB0g3UAAAEfklEQVR4nO2b25KrIBBFHREVFPj/vz2a0NgKOsHMSaBqr6eZmKR6B+gb0DQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf4q1Vi6Ic6Rs5PKubxt6C9sIrca2W/g5Z308jEqL6kRaodoLYTGDkTWJtGLMkvfEVTSQ7oa+FVOJRHG18K4ZxLeNfwE73da30FUgMRa4uMs2ScrPli9RcHPb0eg15sk1MsY0j1ipzch1dvLbEn5hixGdEa+F8kXrpDaJY9Huxm6WqqxMxTL/25csUQYzp1wzrQ6fLXie2jAQN/yFDUu45LBINs4Zn7FynqfHHz2t4HIVkokqw0Tbr560XQfdUq43/TcL3yRYmLGQrGHzWtz4hT6LN9DlGMiDBP1EbakKKZ3JWYUhBerW/2ial+pN9W/2PUt+ySOl3imkaFPoQqRwf+YKJ0rPutGEUlDsFFqfv+kPmZwJraJU2mVlv6/5294/oJcf3oW+olBXQ+YlAnYIdYxOP97nF+LwfJ8qW+HgFUZP5BALXAf78XDteHTKf4VXmOWNP4hfRP3h5fOa+FkMPiupJ5qPaHl4hQdHeFX0R/VulQovuxpHiTUqlKyAH/pJCDEZtiy7/VdMVSjcDYvd1IwhCPJ+6t6piPoUzkGK5lJYvbsb8goVhjl6aGhv/mfgD7zC9hPm3sCr4WlpGKqo6N8k8kGsTmGoGBPdpZDn8JVYh0I2XFQrDKkchVJS7k7rUMjGkPxMulagKcymqVdYals4UvhLPSXjNI+KqWoUXhdD9JgtxOoUDtEg7fC+ZqxFoYysI4VnJXutCjdfSt7yTOF8prBQT5M/hqYyhefrMK76n49V/QpdJIFDk5j9ALUpbHjLPobcio5eqkfh5UZE2IsT0QfqydpC8ZQaRJLfxq/VozDsLKVSb1LP84HqFG5N+2iebvvFTfz+ihRuRxfc4c1jUnt9CtnZhZb1MewUuhv7ZlsdfZq9p99aTj/j7PvbmrUT973HOhTubWZHbFbTlXG7TYzD+qyxI8xWXILjFkydCi8kRntMhSs8y7NDVDwS7zSaohVSUyKu6O2cOlTbxSfDSt8hvejKWHPU2KVaG6XvcvsBSDdH7ew2kZ2bkxqonjpr7Hwbv4jOzmLYZtK9c6rXojkbI/8L5JzI+STU/706mHh9QWZ64Ru+CWVot09Phg7yn5r1h9Aqun0sjQ4MFXsQOiRoN480hd2oUh3NtoxuzjJ51REog7Bpf2+avffpzxBKpTuHmkL6WujJxAfhHN7PkHnZzopQVJU8hLvjQeY0rMfYZkvOC78XxMuIzq3Ji72M8Y+nouf3gnTRQ8hbaD42Ds6Z/gzjXHu4a1ryZYsn+65FNuULfFNi0XeeAuxEVyZduqYqEHnvIrAr24vusCJ7qnaqoqvcK7aZ3es38gc1Z0TPYlgjnZ7NglJjCqWWR2ae16j5bWPfIHkDmF8GBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAg5h/cvSfrvxmThQAAAABJRU5ErkJggg=='

const FormikPostUploader = ({navigation}) => {

    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)
    
    const getUsername = () => {

        const user = firebase.auth().currentUser

        const unsubscribe = db
                .collection('users')
                .where('owner_uid', '==' ,user.uid)
                .limit(1)
                .onSnapshot(snapshot => 
                    snapshot.docs.map(doc => {
                        setCurrentLoggedInUser({
                            username: doc.data().username,
                            profilePicture: doc.data().profile_picture,
                })
        })
        )
        console.log(currentLoggedInUser)
        return unsubscribe
    }

    useEffect(() => {
        getUsername()
    },[])

    const uploadPostToFirebase = (imageUrl, caption) => {
          const unsubscribe = db
          .collection('users')
          .doc(firebase.auth().currentUser.email)
          .collection('posts')
          .add({
            imageUrl: imageUrl,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profilePicture,
            owner_uid: firebase.auth().currentUser.uid,
            owner_email: firebase.auth().currentUser.email,
            caption: caption,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            likes_by_users: [],
            comments: [],
          })
          .then(() => navigation.goBack())

          return unsubscribe
    }

  return (
    <Formik
        initialValues={{ caption: '', imageUrl: ''}}
        onSubmit={(values) => {
           uploadPostToFirebase(values.imageUrl, values.caption)
            }}
        validationSchema={uploadPostSchema}
        validateOnMount={true}
    >
        {({handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
           <>
            <View style={{
                margin: 20, 
                justifyContent: 'space-between', 
                flexDirection: 'row'}}
            >
               <Image 
               source={{ 
                uri: thumbnailUrl
                 ? thumbnailUrl 
                 : PLACEHOLDER_IMG,
                }} 
                style={{width: 100, height: 100}}
               /> 
                <View style={{ flex: 1, marginLeft: 12}}>
                    <TextInput 
                        style={{color: 'white', fontSize: 20}}
                        placeholder='Write a caption...' 
                        placeholderTextColor='gray' 
                        multiline={true}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption}
                    />
                </View>
            </View>
                <Divider width={0.2} orientation='vertical' />
                <TextInput 
                    onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                    style={{color: 'white', fontSize: 18}}
                    placeholder='Enter Image Url' 
                    placeholderTextColor='gray' 
                    onChangeText={handleChange('imageUrl')}
                    onBlur={handleChange('imageUrl')}
                    value={values.imageUrl}
                />
                {errors.imageUrl && (
                    <Text style={{ fontSize: 10, color: 'red'}}>
                        {errors.imageUrl}
                    </Text>
                )}

                <Button onPress={handleSubmit} title='Share' disabled={!isValid} />
           </>
        )}

    </Formik>
  )
}

export default FormikPostUploader