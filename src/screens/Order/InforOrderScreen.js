import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import ItemProductOrder from "../../components/order/ItemProductOrder";
import GeneratorCodeOrder from "../../util/GeneratorCodeOrder";
import getDate from "../../util/GetDate";
import { MaterialIcons } from "@expo/vector-icons";

export default function InforOrderScreen() {
  const { user, token } = useSelector((state) => state.auth);
  const { cartDetails } = useSelector((state) => state.cart);
  const { address } = useSelector((state) => state.address);
  const [totalPrice, setTotalPrice] = useState(0);
  const [code, setCode] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    var price = 0;
    cartDetails?.map((cartDetail) => {
      if (!cartDetail.product.deletedAt) {
        price =
          price +
          cartDetail?.cartDetail.amount *
            (cartDetail?.product.price -
              cartDetail?.product.discount * cartDetail?.product.price);
      }
    });
    setTotalPrice(price);
  }, [cartDetails]);

  useEffect(() => {
    const codeOrder =
      GeneratorCodeOrder() + user.email.split("@")[0].toUpperCase();
    setCode(codeOrder);
  }, []);

  const handleEdit = () => {
    navigation.navigate("EditProfileUser");
  };

  const handleNext = () => {
    const data = {
      userId: user.id,
      discount: 0,
      totalPrice: totalPrice,
      codeOrder: code,
      paymentMethod: "offline",
    };
    console.log(data);
    navigation.navigate("PaymentScreen", { data });
  };

  return (
    <View>
      <View style={{ height: "30%" }}>
        <View style={styles.title1}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
              color: "red",
            }}
          >
            Thông tin người dùng
          </Text>
          <TouchableOpacity onPress={() => handleEdit()}>
            <Text
              style={{
                marginRight: 10,
                fontSize: 16,
                fontWeight: "bold",
                color: "red",
              }}
            >
              Chỉnh sửa
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={styles.information}>
            <Text style={styles.textInfor}>Mã Đơn Hàng: {code}</Text>
          </View>

          <View style={styles.information}>
            <Text style={styles.textInfor}>Ngày Đặt: {getDate()} </Text>
          </View>

          <View style={styles.information}>
            <Text style={styles.textInfor}>Khách Hàng: {user?.userName}</Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textInfor}>
              Địa Chỉ: {address?.street}, {address?.wards}, {address?.district},{" "}
              {address?.city}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ height: "50%" }}>
        <View style={styles.title1}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
              color: "red",
            }}
          >
            Thông tin Sản phẩm
          </Text>
        </View>
        <View>
          <FlatList
            data={cartDetails}
            renderItem={({ item }) => <ItemProductOrder item={item} />}
            keyExtractor={(item, index) => (key = index)}
          />
        </View>
      </View>
      <View style={{ height: "20%" }}>
        <View style={styles.totalPrice}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 15 }}>
            Tổng Tiền:{" "}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 15 }}>
            {totalPrice}
            {" VNĐ "}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.btnBuy}
            disabled={
              cartDetails?.length > 0 || cartDetailsDefault?.length > 0
                ? false
                : true
            }
            onPress={() => handleNext()}
          >
            <View style={styles.btnNext}>
              <Text style={{ padding: 15, color: "#fff", fontWeight: "bold" }}>
                TIẾP TỤC
              </Text>
              <MaterialIcons
                style={{ padding: 10 }}
                name="navigate-next"
                size={30}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  information: {
    marginTop: 10,
  },
  textInfor: {
    fontSize: 14,
  },
  btnBuy: {
    backgroundColor: "#F08F5F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 300,
    marginTop: 10,
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  btnNext: {
    flexDirection: "row",
  },
});
