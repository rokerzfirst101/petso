import { BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import React from 'react'
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Animated, {
    Extrapolate,
    interpolate,
    set,
    useAnimatedStyle,
  } from "react-native-reanimated";
import { TextInput, Title, Button, Subheading, Checkbox, useTheme } from 'react-native-paper'
import CustomBottomSheetBackground from './CustomBottomSheetBackground'
import { getDoctorStatus, registerDoctor } from '../../requests';
import StateBottomSheet from './StateBottomSheet';
import CityBottomSheet from './CityBottomSheet';

const STATUS = {
  NOT_APPLIED: "not_applied",
  APPLIED: "applied"
}

const DoctorBottomSheet = ({reff, snapPoints, token}) => {

    const [degree, setDegree] = React.useState()
    const [expertise, setExpertise] = React.useState()
    const [state, setState] = React.useState("")
    const [city, setCity] = React.useState("")
    const [status, setStatus] = React.useState(STATUS.NOT_APPLIED)

    const stateBottomSheetRef = React.useRef();
    const openStateBottomSheetRef = () => {
        stateBottomSheetRef.current.present();
    }

    const cityBottomSheetRef = React.useRef();
    const openCityBottomSheetRef = () => {
        cityBottomSheetRef.current.present();
    }

    const submitForm = () => {
      if (!degree || degree == "" || !expertise || expertise == "" || state == "" || city == "") {
        ToastAndroid.show("Please fill the form", ToastAndroid.SHORT);
        return;
      }
      const formData = new FormData()
      formData.append("state", state)
      formData.append("city", city)
      formData.append("expertise", expertise)
      formData.append("degree", degree)
      registerDoctor(token, formData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    React.useEffect(() => {
      getDoctorStatus(token)
      .then((res) => {
        console.log(res)
        if (res.status == STATUS.APPLIED) {
          setStatus(STATUS.APPLIED)
          setState(res.doctor.state)
          setCity(res.doctor.city)
          setExpertise(res.doctor.expertise)
          setDegree(res.doctor.degree)
        }
      })
      .catch((err) => console.log(err))
    }, [])

    return (
        <BottomSheetModalProvider>
            <BottomSheetModal
                ref={reff}
                index={0}
                snapPoints={snapPoints}
                backgroundComponent={CustomBottomSheetBackground}
                backdropComponent={CustomBottomSheetBackdrop}
            >
                <View style={{flex: 1, justifyContent: 'space-between'}}>
                    <View>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 12, alignContent: 'center'}}>
                        <Title>Apply for Doctor</Title>
                        <Button onPress={submitForm} disabled={status == STATUS.APPLIED}>{status == STATUS.APPLIED ? "Pending" : "Next"}</Button>
                      </View>
                      <View style={{padding: 8}}>
                        <Title style={{marginTop: 20}}>Degree</Title>
                        <TextInput dense value={degree} onChangeText={setDegree} disabled={status == STATUS.APPLIED} />
                        <Title style={{marginTop: 20}}>Expertise</Title>
                        <TextInput dense value={expertise} onChangeText={setExpertise} disabled={status == STATUS.APPLIED} />
                        <Title style={{marginTop: 20}}>State</Title>
                        <TouchableOpacity onPress={openStateBottomSheetRef} disabled={status == STATUS.APPLIED}>
                          <TextInput dense value={state} editable={false} disabled={status == STATUS.APPLIED} />
                        </TouchableOpacity>
                        <Title style={{marginTop: 20}}>City</Title>
                        <TouchableOpacity 
                          onPress={() => {
                            if (state != "")
                              openCityBottomSheetRef()
                          }}
                          disabled={status == STATUS.APPLIED}
                        >
                          <TextInput dense value={city} editable={false} disabled={status == STATUS.APPLIED} />
                        </TouchableOpacity>
                      </View>
                    </View>
                </View> 
            </BottomSheetModal>
            <StateBottomSheet
              state={state}
              setState={setState}
              stateRef={stateBottomSheetRef} 
              snapPoints={snapPoints} 
            />         
            <CityBottomSheet
              state={state}
              city={city}
              setCity={setCity}
              cityRef={cityBottomSheetRef}
              snapPoints={snapPoints}
            />   
        </BottomSheetModalProvider>
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

export default DoctorBottomSheet