import React from "react";
import { Dimensions, FlatList, Image, View } from "react-native";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
export default function ImageDetail() {
  const { images } = useSelector((state) => state.image);
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <View
          style={{
            width: windowWidth,
            alignItems: "center",
            backgroundColor: "#c4c4c4",
            borderRadius: 20,
          }}
        >
          <Image
            style={{ width: 300, height: 250 }}
            source={{
              uri: item.url,
            }}
          />
        </View>
      )}
      horizontal
      showsHorizontalScrollIndicator
      pagingEnabled
      bounces={false}
      keyExtractor={(item) => item.id}
    />
  );
}
