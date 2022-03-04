import React, { useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import HomeHeader from "../components/header/HomeHeader";
import { ScrollView } from "react-native-gesture-handler";
import NewProduct from "../components/newProduct/NewProduct";
import ItemProduct from "../components/product/ItemProduct";

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const id = 5;
  //   dispatch(getUserId(id));
  //   const data = {
  //     userName: " phuoc",
  //     addresses: null,
  //     role: {
  //       id: 1,
  //       name: "ROLE_USER",
  //     },
  //     email: "duongdiemee@gmail.com",
  //     phone: null,
  //     gender: false,
  //     createdAt: null,
  //     deletedAt: null,
  //     deletedBy: null,
  //   };
  //   dispatch(register(data));
  // });

  return (
    <View>
      <HomeHeader />
      <NewProduct />
      <ItemProduct />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    paddingTop: 100,
  },
});
