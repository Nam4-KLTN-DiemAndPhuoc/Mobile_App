import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartDetail,
  deleteCartDetailDefault,
  updateCartDetail,
  updateCartDetailDefault,
} from "../../redux/cartSlice";
import Toast from "react-native-root-toast";
import attributeApi from "../../api/attributeApi";

export default function ItemCartDetail({ item }) {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState(item?.cartDetail?.amount);
  const [attribute, setAttribute] = useState({});

  useEffect(async () => {
    if (item?.cartDetail?.attributeId != null) {
      const res = await attributeApi.findById(item?.cartDetail?.attributeId);
      setAttribute(res);
    }
  }, []);

  const handlerMinus = () => {
    if (amount >= 2) {
      setAmount(amount - 1);

      if (user) {
        const data = {
          id: item.cartDetail.id,
          amount: amount - 1,
          cart: item.cartDetail.cart,
          productId: item.cartDetail.productId,
          attributeId: item.cartDetail.attributeId,
        };

        dispatch(updateCartDetail(data));
      } else {
        const data = {
          cartDetail: {
            amount: amount - 1,
            cart: null,
            attributeId: item.cartDetail.attributeId,
          },
          product: item.product,
        };

        dispatch(updateCartDetailDefault(data));
      }

      Toast.show("Đã cập nhật giỏ hàng", {
        duration: Toast.durations.SHORT,
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
  };

  const handlerAdd = () => {
    setAmount(Number(amount) + 1);
    if (user) {
      const data = {
        id: item.cartDetail.id,
        amount: Number(amount) + 1,
        cart: item.cartDetail.cart,
        productId: item.cartDetail.productId,
        attributeId: item.cartDetail.attributeId,
      };
      dispatch(updateCartDetail(data));
    } else {
      const data = {
        cartDetail: {
          amount: Number(amount) + 1,
          cart: null,
          attributeId: item.cartDetail.attributeId,
        },
        product: item.product,
      };

      dispatch(updateCartDetailDefault(data));
    }

    Toast.show("Đã cập nhật giỏ hàng", {
      duration: Toast.durations.SHORT,
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

  const handleDelete = () => {
    if (user) {
      dispatch(deleteCartDetail(item.cartDetail.id));
    } else {
      dispatch(deleteCartDetailDefault(item.product.id));
    }
    Toast.show("Đã cập nhật giỏ hàng", {
      duration: Toast.durations.SHORT,
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
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          marginLeft: 5,
          backgroundColor: "#c4c4c4",
          padding: 5,
          borderRadius: 5,
        }}
        onPress={() => handleDelete()}
      >
        <FontAwesome5 name="trash-alt" size={24} color="black" />
      </TouchableOpacity>

      {!item?.product?.deletedAt && attribute.amount > 0 ? (
        <View style={styles.product}>
          <Image
            source={{
              uri: item?.product?.avatar,
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
            <Text>{item?.product?.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, color: "#B1B1B1", marginTop: 10 }}>
                Size: {attribute?.size}
              </Text>
              <Text style={{ fontSize: 14, color: "#B1B1B1", marginTop: 10 }}>
                - Số lượng hiện có: {attribute?.amount}
              </Text>
            </View>
            <View style={styles.price}>
              <View>
                <Text style={{ color: "#F08F5F" }}>
                  {item?.product?.price} VNĐ
                </Text>
              </View>

              <View style={styles.amount}>
                <TouchableOpacity
                  style={styles.minus}
                  onPress={() => handlerMinus()}
                >
                  <AntDesign name="minus" size={24} color="black" />
                </TouchableOpacity>
                <TextInput
                  value={`${amount}`}
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
      ) : (
        <View style={styles.product}>
          <Image
            source={{
              uri: item?.product?.avatar,
            }}
            style={{
              width: 70,
              height: 100,
              borderRadius: 10,
              marginTop: 5,
              marginBottom: 5,
            }}
          />
          <View style={[styles.information, {}]}>
            <Text style={{ color: "#B1B1B1" }}>{item?.product?.name}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, color: "#B1B1B1", marginTop: 10 }}>
                Size: {attribute?.size}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#F08F5F",
                  marginTop: 10,
                  fontWeight: "bold",
                }}
              >
                Trạng thái: Hết hàng
              </Text>
            </View>

            <View style={styles.price}>
              <View>
                <Text style={{ color: "#B1B1B1" }}>
                  Giá: {item?.product?.price} VNĐ
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
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
