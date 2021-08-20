import { TouchableOpacity } from '@gorhom/bottom-sheet'
import React from 'react'
import { View, Image } from 'react-native'
import { useTheme, Title, Subheading, Caption, Divider, Button, Colors } from 'react-native-paper'
import { connect } from 'react-redux'
import { approveDoctor, baseUrl, defaultAvatar, rejectDoctor } from '../../requests'
import StyleSheetFactory from '../../styles'
import { MaterialIcons, AntDesign } from '@expo/vector-icons';

const DoctorCard = ({doctor, navigate, admin, setIsLoading, token}) => {

    const { colors } = useTheme()
    const styles = StyleSheetFactory.getDoctorCard(colors)

    const approveRequest = () => {
        approveDoctor(token, doctor._id)
            .then((res) => setIsLoading(true))
            .catch((err) => console.log(err))
    }

    const rejectRequest = () => {
        rejectDoctor(token, doctor._id)
            .then((res) => setIsLoading(true))
            .catch((err) => console.log(err))
    }

    return (
        <View style={styles.background}>
            <View style={styles.imageContainer}>
                <Image source={{uri: doctor.userId.avatar && doctor.userId.avatar != "" ? `${baseUrl}${doctor.userId.avatar}` : defaultAvatar }} style={styles.image} />
                <View style={styles.header}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Subheading style={{fontSize: 18, fontWeight: 'bold'}}>{doctor.userId.name ? doctor.userId.name : "Petso User"}</Subheading>
                        <MaterialIcons style={{marginStart: 4}} name="verified" size={18} color={colors.accent} />
                    </View>
                    <Caption style={{marginTop: -4}}>{doctor.city}, {doctor.state}</Caption>
                    <View style={{flexDirection: 'row'}}><Stars rating={Math.ceil(doctor.rating.stars)} /></View>
                </View>
            </View>
            <View style={styles.details}>
                <View style={{flexDirection: 'row'}}>
                    <Subheading style={{fontWeight: 'bold'}}>Degree: </Subheading>
                    <Subheading>{doctor.degree}</Subheading>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Subheading style={{fontWeight: 'bold'}}>Expertise: </Subheading>
                    <Subheading>{doctor.expertise}</Subheading>
                </View>
            </View>
            <Divider style={styles.divider} />
            {
                navigate ? (
                    <TouchableOpacity onPress={() => navigate(doctor)} style={styles.consultText}>
                        <Caption>Consult</Caption>
                    </TouchableOpacity>
                ) : null
            }
            {
                admin ? (
                    <View style={{flexDirection: 'row', marginTop: 8, alignItems: 'center'}}>
                        <Button onPress={approveRequest} style={{flex: 1}}>Approve</Button>
                        <View style={{height: 20, borderWidth: 0.5, borderColor: colors.background}} />
                        <Button onPress={rejectRequest} style={{flex: 1}}>Reject</Button>
                    </View>
                ) : null
            }
        </View>
    )
}

const array = [1,2,3,4,5];

const Stars = ({rating}) => array.map((item, index) => {

    if (index < rating) {
        return (
            <AntDesign name="star" size={14} color={Colors.yellowA700} />
        )
    }

    return (
        <AntDesign name="staro" size={14} color={Colors.yellowA700} />
    )
})

const mapStateToProps = (state) => {
    return {
        token: state.userReducer.token
    }
}

export default connect(mapStateToProps)(DoctorCard)
