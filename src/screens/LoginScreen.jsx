import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { DismissKeyboardView } from '../components/atoms/DismissKeyboardHOC'

const LoginScreen = (props) => {

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [hidePassword, setHidePassword] = React.useState(false)

    const [isLoading, setIsLoading] = React.useState(false)

    return (
        <DismissKeyboardView style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <TextInput 
                    label="Email" 
                    value={email} 
                    onChangeText={setEmail}
                    left={<TextInput.Icon name="account" />}
                />
                <TextInput 
                    label="Password" 
                    value={password} 
                    onChangeText={setPassword}
                    secureTextEntry={hidePassword}
                    left={<TextInput.Icon name="lock" />}
                    right={hidePassword ? <TextInput.Icon name="eye" onPress={() => setHidePassword(!hidePassword)} /> : <TextInput.Icon name="eye-off" onPress={() => setHidePassword(!hidePassword)} />}
                />
            </View>
            <Button 
                style={{padding: 10}} 
                onPress={() => props.navigation.reset({
                    index: 0,
                    routes: [{ name: "CategoryScreen" }]
                })}
                loading={isLoading}
            >{isLoading ? "" : "Submit"}</Button>
        </DismissKeyboardView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({})
