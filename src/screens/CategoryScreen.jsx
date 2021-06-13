import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { View, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import { Surface, Title } from 'react-native-paper'
import SearchWithLogo from '../components/molecules/SearchWithLogo'

const data = [
    {
        url: "https://static01.nyt.com/images/2019/06/17/science/17DOGS/17DOGS-jumbo.jpg?quality=90&auto=webp",
        text: "Dog 1"
    },
    {
        url: "https://images.theconversation.com/files/319652/original/file-20200310-61148-vllmgm.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=600&h=400&fit=crop&dpr=1",
        text: "Dog 2"
    }
]

const {width} = Dimensions.get('window')

const CategoryScreen = (props) => {
    return (
        <View style={{flex: 1}}>
            <SearchWithLogo />
            <FlatList
                numColumns={2}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                    return (
                        <TouchableOpacity onPress={() => props.navigation.replace("Dashboard")}>
                            <Surface style={{width: (width/2-20), marginRight: 5, marginLeft: 5, elevation: 5}}>
                                <View style={{width: (width/2-20), height: 200}}>
                                    <Image source={{uri: item.url}} style={{height: 200, width: width/2-20}} />
                                    <LinearGradient start={{x: -1, y: 0}} colors={['transparent', '#FFC0CB80']} style={{position: 'absolute', height: 200, width: width/2-20}}  />
                                </View>
                                <Title style={{textAlign: 'center'}}>{item.text}</Title>
                            </Surface>
                        </TouchableOpacity>
                    )
                }}
                ItemSeparatorComponent={() => <View style={{margin: 5}} />}
                contentContainerStyle={{alignItems: 'center'}}
            />
        </View>
    )
}

export default CategoryScreen
