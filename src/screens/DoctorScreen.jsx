import React from 'react'
import { View, StyleSheet } from 'react-native'
import HomeHeader from '../components/molecules/HomeHeader'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import FindDoctor from '../components/molecules/FindDoctor';
import ConsultationListings from '../components/molecules/ConsultationListings';
import { FAB, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import ConsultingListings from '../components/molecules/ConsultingListings';
import DoctorBottomSheet from '../components/molecules/DoctorBottomSheet';

const Tab = createMaterialTopTabNavigator();

const DoctorScreen = (props) => {

    const {colors} = useTheme()

    const doctorBottomSheetModal = React.useRef(null);
    const snapPoints = React.useMemo(() => ['80%'], []);
    const showDoctorBottomSheetModal = React.useCallback(() => {
        doctorBottomSheetModal.current.present();
    })

    return (
        <View style={styles.flex1}>
            <HomeHeader onPress={showDoctorBottomSheetModal} doctor title="Consultation" navigation={props.navigation} />
            <Tab.Navigator>
                <Tab.Screen name="Find Doctor" component={FindDoctor} />
                <Tab.Screen name="Consultations" component={ConsultationListings} />
                {
                    props.user.access.doctor ? (
                        <Tab.Screen name="Consulting" component={ConsultingListings} />
                    ) : null
                }
            </Tab.Navigator>
            <DoctorBottomSheet reff={doctorBottomSheetModal} snapPoints={snapPoints} token={props.token} user={props.user} />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        token: state.userReducer.token
    }
}

export default connect(mapStateToProps)(DoctorScreen)

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0
    }
})