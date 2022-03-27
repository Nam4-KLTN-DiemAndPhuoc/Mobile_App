import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ItemCartDetail from "../../components/cartDetail/ItemCartDetail";
import {
  addCartDetail,
  clearCartDetailDefault,
  getCart,
} from "../../redux/cartSlice";

export default function CartScreen() {
  const { cartDetails, cartDetailsDefault } = useSelector(
    (state) => state.cart
  );
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(cartDetailsDefault);

  // useEffect(() => {
  //   // if (user && cartDetailsDefault.length > 0) {
  //   //   console.log("Vào Đayyyyyyyyyyyyyyyy");
  //   //   cartDetailsDefault.map((cartDetail) => {
  //   //     console.log(cartDetail);
  //   //     const data = {
  //   //       amount: cartDetail.amount,
  //   //       cart: cart,
  //   //       productId: cartDetail.product.id,
  //   //     };
  //   //     dispatch(addCartDetail(data));
  //   //   });
  //   //   dispatch(clearCartDetailDefault());
  //   // }
  // }, [dispatch]);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <ItemCartDetail />
        <ItemCartDetail />
        <ItemCartDetail />
      </View>
      <View style={styles.footer}>
        <View style={styles.totalPrice}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 15 }}>
            Tổng tiền
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 15 }}>
            100000 VNĐ
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity style={styles.btnBuy}>
            <Text style={{ padding: 15, color: "#fff", fontWeight: "bold" }}>
              ĐẶT HÀNG
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  body: {
    height: "80%",
  },
  footer: {
    height: "30%",
    backgroundColor: "#F8F8FB",
    borderRadius: 10,
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btnBuy: {
    backgroundColor: "#F08F5F",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    width: 300,
    marginTop: 20,
  },
});
