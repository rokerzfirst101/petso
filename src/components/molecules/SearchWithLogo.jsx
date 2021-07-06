import React from 'react'
import { View, Image, Dimensions } from 'react-native'
import { TextInput } from 'react-native-paper'

const {width} = Dimensions.get('window')

const SearchWithLogo = () => {
    return (
        <View style={{padding: 20, alignItems: 'center'}}>
            {/* <Image source={require('../../../assets/logo.png')} style={{height: 100, width: 200}} /> */}
            <View style={{width}}>
                <TextInput
                    dense
                    mode="outlined"
                    placeholder="Search..."
                    left={<TextInput.Icon name="magnify" />}
                />
            </View>
        </View>
    )
}

export default SearchWithLogo
