import React from 'react'
import { View, Text, Image } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Divider, Subheading, Title, withTheme } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';

const CustomDrawerContent = (props) => {
    const { colors } = props.theme;
    return (
        <DrawerContentScrollView {...props}>
            <View style={{flex: 1, backgroundColor: colors.primary, height: 150, padding: 8, justifyContent: 'flex-end'}}>
                <Image 
                    source={{uri: "https://i.pinimg.com/originals/b5/4a/96/b54a964be49ac175e02568cd3b6fc2a1.jpg"}} 
                    style={{height: 50, width: 50, borderRadius: 25}}
                /> 
                <Title>Rakshit Singh</Title>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{backgroundColor: "#8021EB", paddingHorizontal: 4, borderRadius: 4}}>
                        <Subheading style={{color: 'white'}}>Pro</Subheading>
                    </View>
                    <Subheading style={{marginStart: 5}}>Seller</Subheading>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginStart: 5}}>
                        <Subheading style={{color: "gold"}}>4.2</Subheading>
                        <AntDesign name="staro" size={18} color="gold" />
                    </View>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    )
}

export default withTheme(CustomDrawerContent)
