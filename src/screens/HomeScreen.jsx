import React from "react";
import { View, FlatList, StatusBar } from "react-native";
import { Subheading, useTheme } from "react-native-paper";
import HomeHeader from "../components/molecules/HomeHeader";
import { PreferencesContext } from "../constants/PreferenceContext";
import NewListingFAB from "../components/atoms/NewListingFAB";
import { getListings } from "../requests";
import { connect } from "react-redux";
import HomeListingItem from "../components/molecules/HomeListingItem";

const HomeScreen = (props) => {
  React.useEffect(() => {
    getListings(props.token)
      .then((res) => setData(res.listings))
      .catch((err) => console.log(err.response));
  }, []);

  const preference = React.useContext(PreferencesContext);
  const [data, setData] = React.useState([]);
  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: preference.isThemeDark ? "#121212" : "white",
      }}
    >
      <View style={{ borderWidth: 1 }} />
      <HomeHeader title="Dogs" navigation={props.navigation} />
      <FlatList
        data={data}
        style={{ padding: 10 }}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginTop: "60%",
                opacity: 0.5,
              }}
            >
              <Subheading>Nothing to show.</Subheading>
            </View>
          );
        }}
        renderItem={({ item, index }) => {
          return <HomeListingItem userId={props.user._id} item={item} />;
        }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
      />
      <NewListingFAB
        onPress={() => props.navigation.navigate("NewListingScreen")}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    token: state.userReducer.token,
  };
};

export default connect(mapStateToProps)(HomeScreen);
