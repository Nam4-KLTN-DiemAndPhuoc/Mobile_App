import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

export default function AdvertisementItem({ item }) {
  return (
    <View>
      <ImageBackground
        source={{
          uri: item.product.avatar,
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
        </View>
        <View style={styles.background}>
          <Text style={styles.textProductName}>{item.product.name}</Text>
          <Text style={styles.textPrice}>
            {item.product.price - item.product.price * item.product.discount}{" "}
            VNĐ
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    width: Dimensions.get("window").width,
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

  textProductName: {
    color: "red",
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
  },

  textPrice: {
    color: "red",
    padding: 5,
    fontSize: 18,
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
    fontWeight: "bold",
  },
  background: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 60,
  },
});
