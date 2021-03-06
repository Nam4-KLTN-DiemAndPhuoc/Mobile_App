import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function ItemOrderHistory({ item }) {
  const navigation = useNavigation();

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (item.status == "CANCELED") {
      setStatus("ĐÃ HỦY");
    } else if (item.status == "DELIVERED") {
      setStatus("ĐÃ GIAO THÀNH CÔNG");
    } else if (item.status == "ORDER_IN_PROGRESS") {
      setStatus("ĐANG CHỜ XỬ LÝ");
    } else {
      setStatus("ĐƠN HÀNG ĐANG GIAO");
    }
  });

  const handleClick = () => {
    const data = item;
    navigation.navigate("InforOrderHistoryScreen", { data });
  };
  return (
    <TouchableOpacity style={styles.conatiner} onPress={handleClick}>
      <View>
        <View>
          <Text style={styles.text}>Mã đơn hàng: {item.codeOrder} </Text>
        </View>
        <View>
          <Text style={styles.text}>
            Trạng thái:{" "}
            <Text style={{ color: "#F08F5F", fontWeight: "bold" }}>
              {" "}
              {status}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            Ngày đặt: {item.orderDay.split("T")[0]}
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            Tổng tiền:{" "}
            <Text style={{ color: "#F08F5F", fontWeight: "bold" }}>
              {item.totalPrice} VNĐ
            </Text>{" "}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
  },

  text: {
    fontSize: 14,
    padding: 3,
  },
});
