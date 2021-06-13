import React from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native'
import { Button, Title } from 'react-native-paper'

const {width, height} = Dimensions.get('window')
const WelcomeScreen = (props) => {
    return (
        <View style={styles.view}>
            <ImageBackground source={require('../../assets/background.jpg')} style={[{width, height }, styles.view]}>
                <Image style={styles.image} source={require('../../assets/logo.png')} />
                <View style={{marginTop: 200, width: 200}}>
                    <Button mode="contained" onPress={() => props.navigation.navigate("Login")}>Login</Button>
                    <Button style={{marginTop: 20}} mode="contained" onPress={() => props.navigation.navigate("Register")}>Register</Button>
                </View>
            </ImageBackground>
        </View>
    )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        height: 200,
        width: 200
    }
})