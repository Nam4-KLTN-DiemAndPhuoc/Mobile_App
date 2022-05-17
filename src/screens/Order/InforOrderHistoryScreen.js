import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import orderApi from "../../api/orderApi";
import ItemProductOrderHistory from "../../components/order/ItemProductOrderHistory";

export default function InforOrderHistoryScreen({ route }) {
  const { user } = useSelector((state) => state.auth);
  const { address } = useSelector((state) => state.address);
  const [orderDetails, setOrderDeatils] = useState([]);

  useEffect(async () => {
    const res = await orderApi.getOrderDetailsByOrder(route.params.data.id);
    setOrderDeatils(res);
  }, []);
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
        </View>
        <View style={{ marginLeft: 10 }}>
          <View style={styles.information}>
            <Text style={styles.textInfor}>
              Mã Đơn Hàng: {route.params.data.totalPrice}
              {" VNĐ"}
            </Text>
          </View>
          <View style={styles.information}>
            <Text style={styles.textInfor}>
              Tổng tiền: {route.params.data.codeOrder}{" "}
            </Text>
          </View>

          <View style={styles.information}>
            <Text style={styles.textInfor}>
              Ngày Đặt: {route.params.data.orderDay.split("T")[0]}
            </Text>
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

      <View style={{ height: "65%", marginTop: 20 }}>
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
            data={orderDetails}
            renderItem={({ item }) => <ItemProductOrderHistory item={item} />}
            keyExtractor={(item, index) => (key = index)}
          />
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
});
