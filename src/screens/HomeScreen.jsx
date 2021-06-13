import React from 'react'
import { View, Text, FlatList, StatusBar, Dimensions, TouchableOpacity } from 'react-native'
import { Caption, Surface, Title } from 'react-native-paper'
import ImageCarousel from '../components/molecules/ImageCarousel'

const data = [
    {
        images: [
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-photography-1108099.jpg&fm=jpg",
            "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?cs=srgb&dl=pexels-helena-lopes-2253275.jpg&fm=jpg",
            "https://images.pexels.com/photos/97082/weimaraner-puppy-dog-snout-97082.jpeg?cs=srgb&dl=pexels-pixabay-97082.jpg&fm=jpg"
        ]
    },
    {
        images: [
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-photography-1108099.jpg&fm=jpg",
            "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?cs=srgb&dl=pexels-helena-lopes-2253275.jpg&fm=jpg",
            "https://images.pexels.com/photos/97082/weimaraner-puppy-dog-snout-97082.jpeg?cs=srgb&dl=pexels-pixabay-97082.jpg&fm=jpg"
        ]
    },
    {
        images: [
            "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?cs=srgb&dl=pexels-chevanon-photography-1108099.jpg&fm=jpg",
            "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?cs=srgb&dl=pexels-helena-lopes-2253275.jpg&fm=jpg",
            "https://images.pexels.com/photos/97082/weimaraner-puppy-dog-snout-97082.jpeg?cs=srgb&dl=pexels-pixabay-97082.jpg&fm=jpg"
        ]
    }
]
const {width, height} = Dimensions.get('window')
const HomeScreen = (props) => {
    return (
        <View style={{flex: 1, paddingTop: StatusBar.currentHeight}}>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                    return (
                        <Surface style={{flex: 1, width, elevation: 4}}>
                            <ImageCarousel images={item.images} />
                            <Title style={{textAlign: 'center'}}>Hello</Title>
                            <TouchableOpacity onPress={() => props.navigation.navigate("ProfileScreen")}>
                                <Caption style={{textAlign: 'center'}}>View More</Caption>
                            </TouchableOpacity>
                        </Surface>
                    )
                }}
                ItemSeparatorComponent={() => <View style={{marginVertical: 5}} />}
            />
        </View>
    )
}

export default HomeScreen
