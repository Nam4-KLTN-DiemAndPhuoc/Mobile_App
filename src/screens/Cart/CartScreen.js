import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import ItemCartDetail from "../../components/cartDetail/ItemCartDetail";
import {
  addCartDetail,
  clearCartDetailDefault,
  getCartDetail,
} from "../../redux/cartSlice";

export default function CartScreen() {
  const { cartDetails, cartDetailsDefault } = useSelector(
    (state) => state.cart
  );
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (user) {
      console.log("DDDDDDDDDDDDDDDD", cart);
      dispatch(getCartDetail(cart.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && cartDetailsDefault.length > 0) {
      console.log("AAAAAAAAAAAAAAAAAA", cart.id);
      cartDetailsDefault?.map((cartDetail) => {
        const data = {
          productId: cartDetail.product.id,
          amount: cartDetail.cartDetail.amount,
          attributeId: cartDetail?.cartDetail?.attributeId,
          cart: cart,
        };
        dispatch(addCartDetail(data));
      });
      dispatch(clearCartDetailDefault());
    }

    var price = 0;
    if (user) {
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
    }

    if (!user) {
      cartDetailsDefault?.map(
        (cartDetail) =>
          (price =
            price +
            cartDetail.cartDetail.amount *
              (cartDetail.product.price -
                cartDetail.product.discount * cartDetail.product.price))
      );
      setTotalPrice(price);
    }
  }, [cartDetails, cartDetailsDefault]);

  const handleOrder = () => {
    if (!user) {
      navigation.navigate("LoginScreen");
    } else {
      if (cartDetails.length > 0) {
        navigation.navigate("InforOrderScreen");
      } else {
        Toast.show("Bạn chưa có bất kì sản phẩm nào trong giỏ hàng", {
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
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        {user ? (
          <FlatList
            data={cartDetails}
            renderItem={({ item }) => <ItemCartDetail item={item} />}
            keyExtractor={(item, index) => (key = index)}
          />
        ) : (
          <FlatList
            data={cartDetailsDefault}
            renderItem={({ item }) => <ItemCartDetail item={item} />}
            keyExtractor={(item, index) => (key = index)}
          />
        )}
      </View>
      <View style={styles.footer}>
        <View style={styles.totalPrice}>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginLeft: 15 }}>
            Tổng tiền
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 20, marginRight: 15 }}>
            {totalPrice} VNĐ
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={styles.btnBuy}
            disabled={
              cartDetails?.length > 0 || cartDetailsDefault?.length > 0
                ? false
                : true
            }
            onPress={() => {
              handleOrder();
            }}
          >
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
