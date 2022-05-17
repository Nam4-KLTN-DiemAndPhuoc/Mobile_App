import React, { useState } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import Apploader from "../Apploader";
import ItemProduct from "../product/ItemProduct";

export default function ListProductSearch({ page, setPage }) {
  const { productSearch } = useSelector((state) => state.productSearch);

  const [pageSreach, setPageSreach] = useState(page);
  const [loader, setLoader] = useState(false);

  const handleLoad = () => {
    setPage(pageSreach + 1);
    setPageSreach(pageSreach + 1);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
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
        keyExtractor={(item, index) => (key = item.product.id + index)}
        key={(item, index) => (key = item.product.id + index)}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) {
            setLoader(true);
            handleLoad();
          }
        }}
      />
      {loader ? <Apploader /> : null}
    </View>
  );
}
