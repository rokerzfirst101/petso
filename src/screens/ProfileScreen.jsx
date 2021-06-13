import React from 'react'
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Title, Subheading, Surface, Caption } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';

const {width, height} = Dimensions.get('window')
const ProfileScreen = () => {
    return (
        <View>
            <ImageBackground 
                source={{uri: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"}}
                style={{width, height: height*0.6, justifyContent: 'flex-end', padding: 16, paddingVertical: 24}}
            >
            <Title style={{color: 'white'}}>Dan Brown</Title>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{backgroundColor: "#8021EB", paddingHorizontal: 6, borderRadius: 4}}>
                    <Subheading style={{color: 'white'}}>Pro</Subheading>
                </View>
                <Subheading style={{marginStart: 5, color: 'white'}}>Seller</Subheading>
                <View style={{flexDirection: 'row', alignItems: 'center', marginStart: 5}}>
                    <Subheading style={{color: "gold"}}>4.2</Subheading>
                    <AntDesign name="staro" size={18} color="gold" />
                </View>
            </View>
            </ImageBackground>
            <Surface style={{flex: 1, padding: 8, alignSelf: 'center', width: width - 10, height: height*0.4, borderRadius: 4, position: 'absolute', bottom: (-height*0.4+15)}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Subheading style={{fontWeight: 'bold'}}>36</Subheading>
                        <Caption>Orders</Caption>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Subheading style={{fontWeight: 'bold'}}>5</Subheading>
                        <Caption>Bids & Offers</Caption>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Subheading style={{fontWeight: 'bold'}}>2</Subheading>
                        <Caption>Messages</Caption>
                    </View>
                </View>
            </Surface>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
