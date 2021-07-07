import React from "react";
import { Dimensions, Image, ScrollView, View } from "react-native";
import { Caption, Divider, Subheading, Title } from "react-native-paper";
import ImageCarousel from "../components/molecules/ImageCarousel";
import { baseUrl } from "../requests";

const { width, height } = Dimensions.get("window");
const ListingDetailScreen = ({ route }) => {
  const listing = route.params.listing;
  console.log(listing);
  return (
    <ScrollView style={{ height }}>
      <View style={{ height: 400, justifyContent: "center" }}>
        <ImageCarousel
          imageStyle={{ borderRadius: 10 }}
          id={listing._id}
          height={400}
          images={listing.images}
        />
      </View>
      <View style={{ flex: 3, padding: 18 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Title>{listing.title.toUpperCase()}</Title>
          <Title>&#8377; {listing.price}</Title>
        </View>
        <Divider style={{ marginVertical: 4 }} />
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Subheading style={{ marginBottom: 8, minHeight: 100 }}>
            {listing.message}
          </Subheading>
          <View>
            <Divider />
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: `${baseUrl}${listing.createdBy.avatar}` }}
                style={{ height: 70, width: 70, borderRadius: 35 }}
              />
              <View style={{ marginStart: 8 }}>
                <Subheading>{listing.createdBy.name}</Subheading>
                <Caption style={{ marginTop: -1 }}>
                  +91 {listing.createdBy.phone}
                </Caption>
                <Caption style={{ marginTop: -1 }}>
                  {listing.createdBy.email}
                </Caption>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ListingDetailScreen;
