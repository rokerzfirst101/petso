import { useFocusEffect } from '@react-navigation/native';
import React from 'react'
import { View, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { findDoctors } from '../../requests';
import DoctorCard from '../atoms/DoctorCard'


const FindDoctor = ({token, navigation}) => {
    
    const [data, setData] = React.useState();

    useFocusEffect(
        React.useCallback(() => {
            findDoctors(token)
            .then((res) => setData(res.doctors))
            .catch((err) => console.log(err))
        }, [])
    )

    const navigate = (props) => {
        navigation.navigate("NewConsultScreen", props)
    }

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={data}
                style={{marginVertical: 10}}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => <DoctorCard doctor={item} navigate={navigate} />}
                ItemSeparatorComponent={() => <View style={{marginVertical: 5}}/>}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.userReducer.token
    }
}

export default connect(mapStateToProps)(FindDoctor)