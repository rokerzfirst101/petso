import React from 'react'
import {View} from 'react-native'
import { Caption, TextInput } from 'react-native-paper'

const OTPInput = ({value, setValue, style}) => {
    return (
        <TextInput style={style} value={value} onChangeText={setValue} placeholder="OTP" />
    )
}

export default OTPInput