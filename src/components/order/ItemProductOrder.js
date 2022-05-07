import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import attributeApi from "../../api/attributeApi";

export default function ItemProductOrder({ item }) {
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
  return (
    <View style={styles.container}>
      {!item?.product?.deletedAt ? (
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
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 14, color: "#B1B1B1", marginTop: 10 }}>
                Số lượng: {amount}
              </Text>
            </View>
            <View style={styles.price}>
              <View>
                <Text style={{ color: "#F08F5F" }}>
                  Thành Tiền:{" "}
                  {(item?.product?.price -
                    item?.product?.price * item?.product?.discount) *
                    amount}
                  VNĐ
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <></>
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
