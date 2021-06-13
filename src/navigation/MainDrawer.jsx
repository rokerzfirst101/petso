import React from 'react'
import { createDrawerNavigator } from'@react-navigation/drawer'
import MainTab from './MainTab';
import CustomDrawerContent from '../components/molecules/CustomDrawerContent';
import { SafeAreaView } from 'react-native';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <Drawer.Navigator drawerType="slide" drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={MainTab} />
            </Drawer.Navigator>
        </SafeAreaView>
    )
}

export default MainDrawer
