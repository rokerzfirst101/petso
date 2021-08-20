import { useFocusEffect } from '@react-navigation/native'
import React from 'react'
import { FlatList, Image, View } from 'react-native'
import { Caption, Subheading, Title, useTheme } from 'react-native-paper'
import { connect } from 'react-redux'
import { baseUrl, defaultAvatar, getDoctorConsults } from '../../requests'
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from '@gorhom/bottom-sheet'

const ConsultingListings = (props) => {

    const { colors, dark } = useTheme()
    const [data, setData] = React.useState([])

    useFocusEffect(
        React.useCallback(() => {
            getDoctorConsults(props.token)
            .then((res) => setData(res.consults))
            .catch((err) => console.log(err.response))
        },[])
    )

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate("ConsultDetailScreen", item)} style={{ backgroundColor: colors.surface, padding: 8 }}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <Image style={{height: 60, width: 60, borderRadius: 30}} source={{ uri: item.user.avatar ? `${baseUrl}${item.user.avatar}` : defaultAvatar }} />
                                    <View style={{marginStart: 12}}>
                                        <Subheading>{item.user.name}</Subheading>
                                        <Caption>{item.question}</Caption>
                                    </View>
                                </View>
                                <AntDesign name="right" size={18} color={colors.accent} />
                            </View>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.userReducer.token
    }
}

export default connect(mapStateToProps)(ConsultingListings)