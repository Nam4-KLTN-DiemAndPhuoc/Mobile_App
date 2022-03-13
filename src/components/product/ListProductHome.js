import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import ItemProduct from "./ItemProduct";

export default function ListProductHome() {
  const { products } = useSelector((state) => state.productList);

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ItemProduct item={item} />}
        keyExtractor={(item) => item.product.id}
        numColumns={2}
      />
    </View>
  );
}
