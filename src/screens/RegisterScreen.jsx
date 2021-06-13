import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { DismissKeyboardView } from '../components/atoms/DismissKeyboardHOC'

const RegisterScreen = () => {

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [password2, setPassword2] = React.useState("")

    const [hidePassword, setHidePassword] = React.useState(true)
    const [hidePassword2, setHidePassword2] = React.useState(true)

    const [isLoading, setIsLoading] = React.useState(false)
    
    return (
        <DismissKeyboardView style={{flex: 1, justifyContent: 'space-between'}}>
            <View>
                <TextInput 
                    label="Name" 
                    value={name} 
                    onChangeText={setName}
                    left={<TextInput.Icon name="account" />}
                />
                <TextInput 
                    label="Email" 
                    value={email} 
                    onChangeText={setEmail}
                    left={<TextInput.Icon name="at" />}
                />
                <TextInput 
                    label="Password" 
                    value={password} 
                    onChangeText={setPassword}
                    secureTextEntry={hidePassword}
                    left={<TextInput.Icon name="lock" />}
                    right={!hidePassword ? 
                        <TextInput.Icon name="eye" onPress={() => setHidePassword(!hidePassword)} /> 
                        : 
                        <TextInput.Icon name="eye-off" onPress={() => setHidePassword(!hidePassword)} />}
                />
                <TextInput 
                    label="Confirm Password" 
                    value={password2} 
                    onChangeText={setPassword2}
                    secureTextEntry={hidePassword2}
                    left={<TextInput.Icon name="lock" />}
                    right={!hidePassword2 ? 
                        <TextInput.Icon name="eye" onPress={() => setHidePassword2(!hidePassword2)} /> 
                        : 
                        <TextInput.Icon name="eye-off" onPress={() => setHidePassword2(!hidePassword2)} />}
                />
            </View>
            <Button 
                style={{padding: 10}} 
                onPress={() => console.log("hello")}
                loading={isLoading}
            >{isLoading ? "" : "Submit"}</Button>
        </DismissKeyboardView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})
