import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { baseUrl, defaultAvatar, getDoctorsAdmin } from '../../requests'
import DoctorCard from '../atoms/DoctorCard'

const AdminDoctorApplication = (props) => {

    const [data, setData] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    useFocusEffect(
        React.useCallback(() => {
            if (isLoading) {
                getDoctorsAdmin(props.token)
                .then((res) => {
                    setData(res.doctors)
                    setIsLoading(false)
                })
                .catch((err) => console.log(err))
            }
        }, [isLoading])
    )

    return (
        <View>
            <FlatList
                style={{marginTop: 10}}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <DoctorCard doctor={item} admin setIsLoading={setIsLoading} />
                    )
                }}
                ItemSeparatorComponent={() => <View style={{height: 10}} />}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        token: state.userReducer.token
    }
}

export default connect(mapStateToProps)(AdminDoctorApplication)

const styles = StyleSheet.create({})
