import React from "react";
import { SafeAreaView, View } from "react-native";
import { Colors, FAB, Subheading, useTheme } from "react-native-paper";
import { PreferencesContext } from "../constants/PreferenceContext";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DoctorScreen from "../screens/DoctorScreen";
import ExpertScreen from "../screens/ExpertScreen";
import QandAScreen from "../screens/QandAScreen";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const Tab = createMaterialBottomTabNavigator();

const MainBottomTab = (props) => {
  const { colors } = useTheme();
  const preference = React.useContext(PreferencesContext);
  const [fabOpen, setFABOpen] = React.useState(false)

  const returnIconColor = (focused) => {
    if (!preference.isThemeDark && focused) return "white";
    if (focused) return colors.accent;
    else return colors.light100;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator labeled={false}>
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="home"
                size={20}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="doctor"
                size={24}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Doctor"
          component={DoctorScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="star"
                size={24}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Expert"
          component={ExpertScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name="comment-question"
                size={24}
                color={returnIconColor(focused)}
              />
            ),
          }}
          name="Q&A"
          component={QandAScreen}
        />
      </Tab.Navigator>
      {
        fabOpen ? (
          <View style={{width: "100%", height: "100%", backgroundColor: "black", position: 'absolute', opacity: 0.8}}>
            <TouchableOpacity style={{width: "100%", height: "100%"}} />
          </View>
        ) : null
      }
      <View style={{position: 'absolute', alignSelf: 'center', bottom: 25}}>
      {
          fabOpen ? (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => props.navigation.navigate("NewListingScreen")} style={{width: 50, height: 50, borderRadius: 25, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center'}}>
                <Entypo name="list" size={24} color="white" />
              </TouchableOpacity>
              <Subheading style={{marginBottom: 20}}>Listing</Subheading>
            </View>
          ) : null
        }
        {
          fabOpen ? (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => props.navigation.navigate("NewExpertScreen")} style={{width: 50, height: 50, borderRadius: 25, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center'}}>
                <AntDesign name="star" size={24} color="white" />
              </TouchableOpacity>
              <Subheading style={{marginBottom: 20}}>Expert</Subheading>
            </View>
          ) : null
        }
        {
          fabOpen ? (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity onPress={() => props.navigation.navigate("NewQuestionAnswerScreen")} style={{width: 50, height: 50, borderRadius: 25, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center'}}>
                <MaterialCommunityIcons name="comment-question" size={24} color="white" />
              </TouchableOpacity>
              <Subheading style={{marginBottom: 20}}>Q&A</Subheading>
            </View>
          ) : null
        }
        <FAB
          style={{backgroundColor: Colors.blueA100, alignSelf: 'center'}}
          icon={fabOpen ? "close" : "plus"}
          onPress={() => setFABOpen(!fabOpen)}
        />
      </View>
    </SafeAreaView>
  );
};

export default MainBottomTab;
