import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AdminDoctorApplication from '../components/molecules/AdminDoctorApplication';
import AdminExpertPost from '../components/molecules/AdminExpertPost';
import AdminReportedPosts from '../components/molecules/AdminReportedPosts';

const Tab = createMaterialTopTabNavigator();

const AdminScreen = () => {
    return (
        <View style={{flex: 1}}>
            <Tab.Navigator>
                <Tab.Screen name="Doctor Application" component={AdminDoctorApplication} />
                <Tab.Screen name="Expert Listings" component={AdminExpertPost} />
                <Tab.Screen name="Reported Posts" component={AdminReportedPosts} />
            </Tab.Navigator>
        </View>
    )
}

export default AdminScreen

const styles = StyleSheet.create({})
