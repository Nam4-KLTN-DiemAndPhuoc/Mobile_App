import React, { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ItemProduct from "../product/ItemProduct";

export default function ListProductSearch({ page, setPage }) {
  const { productSearch } = useSelector((state) => state.productSearch);

  console.log(productSearch);

  const [pageSreach, setPageSreach] = useState(page);

  const handleLoad = () => {
    setPage(pageSreach + 1);
    setPageSreach(pageSreach + 1);
    console.log(pageSreach + 1);
  };

  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  return (
    <View>
      <FlatList
        data={productSearch}
        renderItem={({ item }) => <ItemProduct item={item} />}
        numColumns={2}
        keyExtractor={(item) => (key = item.product.id)}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            handleLoad();
          }
        }}
      />
    </View>
  );
}
