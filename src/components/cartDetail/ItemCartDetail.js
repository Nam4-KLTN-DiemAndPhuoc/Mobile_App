import React from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function ItemCartDetail() {
  const handlerMinus = () => {};

  const handlerAdd = () => {};
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginLeft: 5,
          backgroundColor: "#c4c4c4",
          padding: 5,
          borderRadius: 5,
        }}
      >
        <FontAwesome5 name="trash-alt" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.product}>
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          style={{
            width: 70,
            height: 100,
            borderRadius: 10,
            marginTop: 5,
            marginBottom: 5,
          }}
        />
        <View style={styles.information}>
          <Text style={{ fontSize: 10, color: "#B1B1B1" }}>ABCDCCC</Text>
          <Text>ÁO KHUNG LONG</Text>
          <View style={styles.price}>
            <View>
              <Text style={{ color: "#F08F5F" }}>100000 VNĐ</Text>
            </View>

            <View style={styles.amount}>
              <TouchableOpacity
                style={styles.minus}
                onPress={() => handlerMinus()}
              >
                <AntDesign name="minus" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                value={`${2}`}
                keyboardType="numeric"
                style={{ padding: 10, color: "#000" }}
                editable={false}
              />
              <TouchableOpacity style={styles.add} onPress={handlerAdd}>
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#F8F8FB",
    borderRadius: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  information: {
    marginLeft: 10,
  },
  price: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  amount: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 30,
  },
  minus: {
    padding: 5,
    backgroundColor: "#F08F5F",
    borderRadius: 25,
  },
  add: {
    padding: 5,
    backgroundColor: "#F08F5F",
    borderRadius: 25,
  },
});
