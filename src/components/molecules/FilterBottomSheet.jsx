import { BottomSheetModal, BottomSheetFlatList, BottomSheetScrollView, TouchableOpacity, BottomSheetView } from '@gorhom/bottom-sheet'
import React from 'react'
import {View, Image, StyleSheet, ToastAndroid} from 'react-native'
import { Button, TextInput, Title, useTheme } from 'react-native-paper'
import { Caption, Subheading } from 'react-native-paper'
import StateBottomSheet from './StateBottomSheet'
import CustomBottomSheetBackground from './CustomBottomSheetBackground'
import CityBottomSheet from './CityBottomSheet'
import Animated, {
    Extrapolate,
    interpolate,
    set,
    useAnimatedStyle,
  } from "react-native-reanimated";
import CustomBottomSheetHandle from './CustomBottomSheetHandle'

const FilterBottomSheet = (props) => {
    const {colors} = useTheme();

    const stateBottomSheetRef = React.useRef();
    const openStateBottomSheetRef = () => {
        stateBottomSheetRef.current.present();
    }

    const cityBottomSheetRef = React.useRef();
    const openCityBottomSheetRef = () => {
        cityBottomSheetRef.current.present();
    }

    return (
        <BottomSheetModal
          ref={props.bottomSheetModalRef}
          snapPoints={props.snapPoints}
          index={0}
          backdropComponent={CustomBottomSheetBackdrop}
          backgroundComponent={CustomBottomSheetBackground}
          handleComponent={CustomBottomSheetHandle}
        >
            <BottomSheetView style={{flex: 1}}>
            <BottomSheetScrollView contentContainerStyle={{paddingBottom: 50}} style={{padding: 8}}>
                <Title>Categories</Title>
                <BottomSheetFlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{marginTop: 10}}
                    data={data}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity 
                                style={props.category === item.key ? 
                                    {justifyContent: 'center', borderRadius: 20, borderColor: colors.accent, borderWidth: 1} 
                                    : 
                                    {justifyContent: 'center', borderRadius: 20}
                                }
                                onPress={() => props.setCategory(item.key)}
                                >
                                <Image
                                    source={{uri: item.img}}
                                    style={{height: 150, width: 100, borderRadius: 20}}
                                />
                                <View 
                                    style={{
                                        backgroundColor: colors.surface,
                                        position: "absolute",
                                        width: 100,
                                        bottom: 0,
                                        borderBottomLeftRadius: 20,
                                        borderBottomRightRadius: 20
                                    }}>
                                <Caption style={{textAlign: 'center'}}>
                                    {item.key}
                                </Caption>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                    ItemSeparatorComponent={() => <View style={{marginHorizontal: 5}}/>}
                />
                <Title style={styles.marginTop}>Location</Title>
                <View style={{flexDirection: 'row', justifyContent: "space-between", marginTop: 10 }}>
                    <Subheading onPress={openStateBottomSheetRef} style={[styles.dropdown, {backgroundColor: colors.surface, borderColor: colors.accent}]}>{!props.state ? "Select State" : props.state}</Subheading>
                    <Subheading onPress={() => {
                        if (state !== "")
                            openCityBottomSheetRef();
                        else
                            ToastAndroid.show("Select a state first.", ToastAndroid.SHORT);
                    }} style={[styles.dropdown, {backgroundColor: colors.surface, borderColor: colors.accent}]}>{!props.city ? "Select City" : props.city}</Subheading>
                </View>
                {
                    props.category === "Cat" || props.category === "Dog" ? (
                        <View>
                            <Title style={styles.marginTop}>Breed</Title>
                            <TextInput value={props.breed} onChangeText={props.setBreed} placeholder="Breed" dense />
                        </View>
                    ) : (null)
                }
                <StateBottomSheet
                    state={props.state}
                    setState={props.setState}
                    stateRef={stateBottomSheetRef} 
                    snapPoints={props.snapPoints} 
                />         
                <CityBottomSheet
                    state={props.state}
                    city={props.city}
                    setCity={props.setCity}
                    cityRef={cityBottomSheetRef}
                    snapPoints={props.snapPoints}
                />   
            </BottomSheetScrollView>
            <View style={{flexDirection: 'row', paddingBottom: 8}}>
                <Button onPress={props.resetFilter} color={colors.surface} mode="contained" style={styles.button}>Reset</Button>
                <Button onPress={props.applyFilter} mode="contained" style={styles.button}>Confirm</Button>
            </View>
            </BottomSheetView>
        </BottomSheetModal>
    )
}

const CustomBottomSheetBackdrop = ({ animatedIndex, style }) => {
    const { colors } = useTheme();
    const containerAnimatedStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
        animatedIndex.value,
        [0, 1],
        [0, 1],
        Extrapolate.CLAMP
      ),
    }));
  
    // styles
    const containerStyle = React.useMemo(
      () => [
        style,
        {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          alignItems: "center",
        },
        containerAnimatedStyle,
      ],
      [style, containerAnimatedStyle]
    );
    return (
      <Animated.View style={containerStyle} />
    );
};

const styles = StyleSheet.create({
    button: {
        width: "50%"
    },
    marginTop: {
        marginTop: 20
    },
    dropdown: {
        width: "40%",
        borderWidth: 1,
        padding: 10,
        paddingHorizontal: 8,
        borderRadius: 5,
    }
})

export default FilterBottomSheet

const data = [
    {
        img: "https://ichef.bbci.co.uk/news/976/cpsprodpb/BAF5/production/_111516874_gettyimages-451627799-1.jpg",
        key: "All"
    },
    {
        img: "https://www.petmd.com/sites/default/files/styles/article_image/public/2020-10/three-puppies-playing.jpg?itok=FYZovCWm",
        key: "Dog"
    },
    {
        img: "https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697",
        key: "Cat"
    },
    {
        img: "https://i.guim.co.uk/img/media/20491572b80293361199ca2fc95e49dfd85e1f42/0_236_5157_3094/master/5157.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fc5fad5b6c2b545b7143b9787d0c90b1",
        key: "Medicine"
    },
    {
        img: "https://st4.depositphotos.com/16122460/20735/i/1600/depositphotos_207352956-stock-photo-bowl-food-cat-dog-accessories.jpg",
        key: "Accessories"
    }
]