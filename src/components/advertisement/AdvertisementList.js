import React from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import AdvertisementItem from "./AdvertisementItem";

export default function AdvertisementList() {
  const { advertisements } = useSelector((state) => state.advertisement);
  return (
    <View>
      <FlatList
        data={advertisements}
        renderItem={({ item }) => <AdvertisementItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.product.id}
      />
    </View>
  );
}
