import { View, StyleSheet, Image} from 'react-native'
import React from 'react'
import SignupForm from '../components/signupScreen/SignupForm'


const INSTAGRAM_LOGO = 
'https://cdn2.iconfinder.com/data/icons/social-media-2285/512/1_Instagram_colored_svg_1-512.png'


const SignUpScreen = ({navigation}) => (
    <View style={styles.container}>
        <View style={styles.logocontainer}>
            <Image source={{ uri: INSTAGRAM_LOGO, height: 100, widht: 100}}/>
        </View>
        <SignupForm navigation={navigation} />
    </View>
)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    logocontainer: {
        alignItems: 'center',
        marginTop: 60,
    },
})


export default SignUpScreen