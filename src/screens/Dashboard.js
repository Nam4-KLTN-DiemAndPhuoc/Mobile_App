import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import AdvertisementItem from "../components/advertisement/AdvertisementItem";
import HomeHeader from "../components/header/HomeHeader";
import ItemProduct from "../components/product/ItemProduct";
import { getAll } from "../redux/productListSlice";

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const { products } = useSelector((state) => state.productList);
  const { advertisements } = useSelector((state) => state.advertisement);

  const data = [
    { type: 1, key: 1 },
    { type: 2, key: 2 },
  ];

  const render = (item) => {
    if (item.type === 1) {
      return (
        <FlatList
          data={advertisements}
          renderItem={({ item }) => <AdvertisementItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.product.id}
        />
      );
    } else {
      return (
        <FlatList
          data={products}
          renderItem={({ item }) => <ItemProduct item={item} />}
          keyExtractor={(item) => item.product.id}
          numColumns={2}
        />
      );
    }
  };

  const handleLoad = () => {
    setPage(page + 1);
    const data = {
      page: page + 1,
      limit: 10,
    };
    dispatch(getAll(data));
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
    <View style={{ backgroundColor: "#C4C4C4" }}>
      <HomeHeader />

      <View style={styles.body}>
        <FlatList
          data={data}
          renderItem={({ item }) => render(item)}
          onScroll={({ nativeEvent }) => {
            if (isCloseToBottom(nativeEvent)) {
              handleLoad();
            }
          }}
          keyExtractor={(item, index) => (key = item.key)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "80%",
  },
});
