import React from 'react'
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'


const {width, height} = Dimensions.get('window')
const ImageCarousel = ({images}) => {

    const [current, setCurrent] = React.useState(0)

    return (
        <View>
            <FlatList
                data={images}
                horizontal={true}
                keyExtractor={(item, index) => index.toString()}
                pagingEnabled={true}
                renderItem={({item, index}) => {
                    return (
                        <Image source={{uri: item}} style={{width, height: 200}} />
                    )
                }}
            />
        </View>
    )
}

export default ImageCarousel

const styles = StyleSheet.create({})
