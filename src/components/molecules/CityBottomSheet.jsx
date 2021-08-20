import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { Title, Subheading, Checkbox, Button, useTheme } from 'react-native-paper'
import cities from '../../../assets/cities'
import CustomBottomSheetBackground from './CustomBottomSheetBackground'
import Animated, {
    Extrapolate,
    interpolate,
    set,
    useAnimatedStyle,
  } from "react-native-reanimated";
import CustomBottomSheetHandle from './CustomBottomSheetHandle'

const CityBottomSheet = ({city, setCity, state, cityRef, snapPoints }) => {
    return (
        <BottomSheetModal
            ref={cityRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={CustomBottomSheetBackdrop}
            backgroundComponent={CustomBottomSheetBackground}
            handleComponent={CustomBottomSheetHandle}
        >
            <Title style={{margin: 18, paddingBottom: 8}}>Select a state</Title>
            <BottomSheetFlatList
                data={state ? cities[state].sort() : []}
                keyExtractor={i => i}
                renderItem={({item}) => {
                    return(
                        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 8}}>
                            <Subheading>{item}</Subheading>
                            <Checkbox
                                status={city === item ? 'checked' : 'unchecked'}
                                onPress={() => {
                                    setCity(item)
                                    cityRef.current.dismiss()
                                }}
                            />
                        </View>
                    )
                }}
            />
            <View style={{height: 18}} />
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

export default CityBottomSheet

const styles = StyleSheet.create({})
