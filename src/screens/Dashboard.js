import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HomeHeader from "../components/header/HomeHeader";
import { ScrollView } from "react-native-gesture-handler";
import ItemProduct from "../components/product/ItemProduct";
import AdvertisementList from "../components/advertisement/AdvertisementList";
import ListProductHome from "../components/product/ListProductHome";

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.productList);

  return (
    <View style={{ backgroundColor: "#C4C4C4" }}>
      <HomeHeader />
      <ScrollView style={styles.body}>
        <AdvertisementList />
        <View>
          <ListProductHome />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    height: "80%",
  },
});
