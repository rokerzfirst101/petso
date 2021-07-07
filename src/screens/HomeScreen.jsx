import React from "react";
import { View, FlatList, StatusBar, ActivityIndicator } from "react-native";
import { Subheading, useTheme, Divider } from "react-native-paper";
import HomeHeader from "../components/molecules/HomeHeader";
import { PreferencesContext } from "../constants/PreferenceContext";
import NewListingFAB from "../components/atoms/NewListingFAB";
import { getTrending, getLatest } from "../requests";
import { connect } from "react-redux";
import HomeListingItem from "../components/molecules/HomeListingItem";

const HomeScreen = (props) => {
  const preference = React.useContext(PreferencesContext);
  const [originalData, setOriginalData] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [tab, setTab] = React.useState("trending");
  const [isLoading, setIsLoading] = React.useState(false);

  const search = (text) => {
    if (text === "") setData(originalData);
    else {
      var temp = originalData;
      temp = temp.filter((item) => item.title.toLowerCase().includes(text));
      setData(temp);
    }
  };

  React.useEffect(() => {
    setData([]);
    setIsLoading(true);
    if (tab === "trending") {
      getTrending(props.token)
        .then((res) => {
          setOriginalData(res.listings);
          setData(res.listings);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.response);
        });
    } else if (tab === "latest") {
      getLatest(props.token)
        .then((res) => {
          setOriginalData(res.listings);
          setData(res.listings);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err.response);
        });
    }
  }, [tab]);

  const { colors } = useTheme();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <View style={{ borderWidth: 1 }} />
      <HomeHeader
        tab={tab}
        setTab={setTab}
        title="Dogs"
        search={search}
        navigation={props.navigation}
      />
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator color="white" />
        </View>
      ) : (
        <FlatList
          data={data}
          style={{ padding: 5, marginTop: 10 }}
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
            return (
              <HomeListingItem
                navigation={props.navigation}
                token={props.token}
                userId={props.user._id}
                bookmarks={props.user.bookmarked}
                item={item}
              />
            );
          }}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
          ListFooterComponent={() => <View style={{ marginBottom: 86 }} />}
        />
      )}
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
