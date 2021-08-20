import React from 'react'
import { Image, StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import { Button, Caption, Colors, Subheading, Surface, Title, useTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { acceptConsult, baseUrl, declineConsult, defaultAvatar, messageConsult, rateConsult } from '../requests';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

const ConsultDetailScreen = (props) => {

    const consult = props.route.params;

    const [accepted, setAccepted] = React.useState(consult.accepted)
    const [active, setActive] = React.useState(consult.active)
    const [message, setMessage] = React.useState()
    const [rated, setRated] = React.useState(consult.rated)

    const [satisfied, setSatisfied] = React.useState()
    const [rating, setRating] = React.useState(0)

    const {colors, dark} = useTheme()
    const accept = () => {
        acceptConsult(props.token, consult._id)
            .then((res) => setAccepted(true))
            .catch((err) => console.log(err))
    }

    const decline = () => {
        declineConsult(props.token, consult._id)
            .then((res) => {
                setAccepted(false)
                setActive(false)
            })
            .catch((err) => console.log(err))
    }

    const sendMessage = () => {
        if (message && message != "") {
            const formData = new FormData();
            formData.append("message", message);
            messageConsult(props.token, formData, consult._id)
                .then((res) => {
                    setMessage()
                    consult.answer = message
                })
                .catch((err) => console.log(err))
        }
    }

    const rate = () => {
        const formData = new FormData();
        formData.append('rating', rating);
        formData.append('satisfied', satisfied);
        rateConsult(props.token, formData, consult._id)
            .then((res) => {
                setRated(true)
                ToastAndroid.show("Rating Successfull", ToastAndroid.SHORT);
            })
            .catch((err) => console.log(err))
    }

    return (
        <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{padding: 8}}>
                <Title style={{borderBottomColor: colors.surface, borderBottomWidth: 1}}>Question</Title>
                <Subheading style={{marginTop: 18}}>{consult.question}</Subheading>
                <View style={{alignSelf: 'flex-end', marginTop: 20}}>
                    <Caption>asked by</Caption>
                    <View style={{flexDirection: 'row'}}>
                        <Image style={{height: 30, width: 30, borderRadius: 15}} source={{uri: consult.user.avatar ? `${baseUrl}${consult.user.avatar}` : `${defaultAvatar}`}} />
                        <Subheading style={{fontSize: 14, marginStart: 4}}>{consult.user.name ? consult.user.name : "Petso User"}</Subheading>
                    </View>
                </View>
                {
                    consult.answer ? (
                        <View style={{marginTop: 80}}>
                            <Title style={{borderBottomColor: colors.surface, borderBottomWidth: 1}}>Answer</Title>
                            <Subheading style={{marginTop: 18}}>{consult.answer}</Subheading>
                            <View style={{alignSelf: 'flex-end', marginTop: 20}}>
                                <Caption>answered by</Caption>
                                <View style={{flexDirection: 'row'}}>
                                    <Image style={{height: 30, width: 30, borderRadius: 15}} source={{uri: consult.doctor.avatar ? `${baseUrl}${consult.doctor.avatar}` : `${defaultAvatar}`}} />
                                    <Subheading style={{fontSize: 14, marginStart: 4}}>{consult.doctor.name ? consult.doctor.name : "Petso User"}</Subheading>
                                </View>
                            </View>
                        </View>
                    ) : null
                }
            </View>
            
            {
                props.user._id === consult.doctor._id && !accepted && !active ? (
                    <Button disabled style={{padding: 8}}>Declined</Button>
                ) : null
            }
            {
                props.user._id === consult.doctor._id && !accepted && active ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Button onPress={decline} color={colors.surface} mode="contained" style={{width: "50%"}}>Decline</Button>
                        <Button onPress={accept} mode="contained" style={{width: "50%"}}>Accept</Button>
                    </View>
                ) : null
            }
            {
                props.user._id === consult.doctor._id && accepted && !consult.answer ? (
                    <View 
                        style={{
                            padding: 8, 
                            paddingVertical: 12, 
                            flexDirection: 'row', 
                            backgroundColor: colors.surface, 
                            borderTopStartRadius: 10,
                            borderTopEndRadius: 10
                        }}
                    >
                        <TextInput
                            style={{flex: 1, marginEnd: 5, color: dark ? "white" : "black"}}
                            value={message}
                            onChangeText={setMessage}
                            multiline={true}
                            placeholderTextColor={dark ? "grey" : "black"} 
                            placeholder="Type something..." 
                        />
                        <Ionicons onPress={sendMessage} name="send" size={24} color={colors.accent} />
                    </View>
                ) : null
            }
            {
                props.user._id === consult.user._id && !accepted && active ? (
                    <Button style={{padding: 8}} disabled={true}>Waiting for doctor to accept</Button>
                ) : (
                    null
                )
            }
            {
                props.user._id === consult.user._id && accepted && !consult.answer ? (
                    <Button style={{padding: 8}} disabled={true}>Waiting for doctor to answer</Button>
                ) : (
                    null
                )
            }
            {
                props.user._id === consult.user._id && consult.answer && !rated && satisfied == null ? (
                    <View style={{alignSelf: 'center', alignItems: 'center', padding: 18}}>
                        <Subheading>Are you satisfied with the answer ?</Subheading>
                        <View style={{flexDirection: 'row'}}>
                            <Button onPress={() => setSatisfied(true)}>Yes</Button>
                            <Button onPress={() => setSatisfied(false)} style={{marginStart: 18}}>No</Button>
                        </View>
                    </View>
                ) : null
            }
            {
                props.user._id === consult.user._id && consult.answer && !rated && satisfied === true || satisfied === false ? (
                    <View style={{alignSelf: 'center', alignItems: 'center', padding: 18}}>
                        <Subheading>Please rate the doctor</Subheading>
                        <View style={{flexDirection: 'row', marginTop: 5}}>
                            <Stars rating={rating} setRating={setRating} />
                        </View>
                        <Button style={{marginTop: 10}} onPress={rate}>Submit</Button>
                    </View>
                ) : null
            }
        </View>
    )
}

const array = [1,2,3,4,5];

const Stars = ({rating, setRating}) => array.map((item, index) => {

    if (index < rating) {
        return (
            <TouchableOpacity key={index} onPress={() => setRating(index+1)}>
                <AntDesign name="star" size={24} color={Colors.yellowA700} />
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity key={index} onPress={() => setRating(index+1)}>
                <AntDesign name="staro" size={24} color={Colors.yellowA700} />
            </TouchableOpacity>
    )
})

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
        token: state.userReducer.token
    }
}

export default connect(mapStateToProps)(ConsultDetailScreen)