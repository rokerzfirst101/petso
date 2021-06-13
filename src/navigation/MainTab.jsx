import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import { SafeAreaView } from 'react-native'

const Tab = createMaterialBottomTabNavigator()

export default function MainTab() {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    )
}