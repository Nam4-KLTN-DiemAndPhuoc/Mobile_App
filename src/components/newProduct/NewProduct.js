import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

export default function NewProduct() {
  return (
    <View>
      <ImageBackground
        source={{
          uri: "http://aothunit.com/asset/images/products/x2/1580614718.9483_80090864_778657005935639_296725039779151872_o.jpg",
        }}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <TouchableOpacity style={styles.btnBuy}>
            <FontAwesome
              style={styles.textBtn}
              name="cart-plus"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View style={styles.productName}>
            <Text style={styles.textProductName}>Áo khủng long bay</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.textPrice}>100000 VNĐ</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    width: "100%",
    height: 200,
  },
  container: {
    marginLeft: 20,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnBuy: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 20,
    width: "20%",
    alignItems: "center",
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
  },
  productName: {
    marginTop: 20,
    width: "60%",
    borderRadius: 20,
    alignItems: "center",
  },
  textProductName: {
    color: "white",
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    width: "60%",
    borderRadius: 20,
    alignItems: "center",
  },
  textPrice: {
    color: "white",
    padding: 5,
    fontSize: 18,
  },
});
