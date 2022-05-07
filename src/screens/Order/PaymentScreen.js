import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { addOrder, addOrderDetail } from "../../redux/orderSlice";
import { deleteCartDetail } from "../../redux/cartSlice";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/core";

export default function PaymentScreen({ route }) {
  const { user } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.address);
  const [itemSelected, setItemSelected] = useState("offline");
  const { cartDetails } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleOrder = async () => {
    const res = await dispatch(addOrder(route.params.data));
    cartDetails.map((cartDetail) => {
      if (!cartDetail.product.deletedAt) {
        console.log(cartDetail);
        const dt = {
          productId: cartDetail.cartDetail.productId,
          order: res.payload,
          amount: cartDetail.cartDetail.amount,
          attributeId: cartDetail.cartDetail.attributeId,
        };
        dispatch(addOrderDetail(dt));
        dispatch(deleteCartDetail(cartDetail.cartDetail.id));
      }
    });
    navigation.navigate("OrderHistoryScreen");
    Toast.show("Đặt hàng thành công", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      containerStyle: {
        backgroundColor: "#C4C4C4",
        borderRadius: 200,
        marginBottom: 300,
        paddingHorizontal: 20,
        shadowColor: "#e6e6e6",
        shadowOpacity: 0.5,
      },
      textStyle: { color: "#000", fontWeight: "bold" },
    });
  };
  return (
    <View>
      <View>
        <View style={styles.title1}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
              color: "red",
            }}
          >
            THÔNG TIN ĐƠN HÀNG
          </Text>
        </View>
        <View style={{ backgroundColor: "#f7e6e6", padding: 5 }}>
          <View style={styles.information}>
            <Text style={styles.textInfor}>Mã Đơn Hàng:</Text>
          </View>
          <View style={styles.information}>
            <Text style={styles.textInfor}>Khách Hàng: {user?.userName}</Text>
          </View>
          <View style={{ marginTop: 10, marginLeft: 10 }}>
            <Text style={styles.textInfor}>
              Địa Chỉ: {address?.street}, {address?.wards}, {address?.district},{" "}
              {address?.city}
            </Text>
          </View>
          <View style={styles.information}>
            <Text style={styles.textInfor}>Tổng tiền: 123123123 VNĐ</Text>
          </View>
        </View>
      </View>

      <View style={styles.payment}>
        <View style={styles.title1}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: "bold",
              color: "red",
            }}
          >
            PHƯƠNG THỨC THANH TOÁN
          </Text>
        </View>

        <View style={{ backgroundColor: "#f7e6e6", padding: 5 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Phương Thức:</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={itemSelected}
                onValueChange={(itemValue, itemIndex) => {
                  (route.params.data.paymentMethod = itemValue),
                    setItemSelected(itemValue);
                }}
              >
                <Picker.Item
                  style={styles.textItem}
                  label="Thanh toán bằng tiền mặt"
                  value="offline"
                />
                <Picker.Item
                  style={styles.textItem}
                  label="Thanh toán trực tuyến"
                  value="online"
                />
              </Picker>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.btnBuy}
            onPress={() => {
              handleOrder();
            }}
          >
            <View style={styles.btnNext}>
              <Text style={{ padding: 15, color: "#fff", fontWeight: "bold" }}>
                ĐẶT HÀNG
              </Text>
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
    marginLeft: 10,
  },
  textInfor: {
    fontSize: 16,
  },
  payment: {
    marginTop: 20,
  },
  textItem: {
    fontSize: 14,
  },
  picker: {
    height: 40,
    width: "65%",
    backgroundColor: "#fff",
    marginLeft: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 10,
  },
  btnBuy: {
    backgroundColor: "#F08F5F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 300,
    marginTop: 10,
  },
});
