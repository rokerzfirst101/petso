import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import { Subheading, Surface } from 'react-native-paper'

const data = [
    {
        text: "Hey!",
        username: "rachelbrown",
        picture: "https://image.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
    },
    {
        text: "How are you doing?",
        username: "rachelbrown",
        picture: "https://image.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
    },
    {
        text: "Hello! How are you doing?",
        username: "me",
        picture: "https://image.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
    },
    {
        text: "Hello! How are you doing?",
        username: "rachelbrown",
        picture: "https://image.freepik.com/free-photo/young-beautiful-woman-pink-warm-sweater-natural-look-smiling-portrait-isolated-long-hair_285396-896.jpg"
    },
]

const ChatScreen = () => {
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                    if (index !== 0 && data[index-1].username === item.username) {
                        return (
                            <View style={{flexDirection: 'row', marginStart: 40, justifyContent: item.username==="me" ? "flex-end" : "flex-start", marginTop: 4}}>
                                <LinearGradient colors={["#7b4397", "#dc2430"]}  style={{marginStart: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4}}>
                                    <Subheading style={{color: "white"}}>{item.text}</Subheading>
                                </LinearGradient>
                            </View>
                        )
                    }
                    return (
                        <View style={{flexDirection: 'row', justifyContent: item.username==="me" ? "flex-end" : "flex-start", marginTop: 10}}>
                            {
                                item.username === "me" ? (
                                    null
                                ) : (
                                    <Image source={{uri: item.picture}} style={{height: 40, width: 40, borderRadius: 20}} />
                                )
                            }
                            <LinearGradient start={{x: 1, y: 1}} colors={["#7b4397", "#dc2430"]} style={{marginStart: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, elevation: 4}}>
                                <Subheading style={{color: "white"}}>{item.text}</Subheading>
                            </LinearGradient>
                        </View>
                    )
                }}
            />
            <Surface>
                <TextInput style={{height: 50, padding: 10}} placeholder="Type a message" />
            </Surface>
        </View>
    )
}

export default ChatScreen

const styles = StyleSheet.create({})
