import { useNavigation } from "@react-navigation/core";
import React, { useEffect } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import ItemOrderHistory from "../../components/order/ItemOrderHistory";

export default function OrderHistoryScreen() {
  const { user, token } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);
  const navigation = useNavigation();
  useEffect(() => {
    if (!user) {
      navigation.navigate("LoginScreen");
    }
  }, []);
  return (
    <View>
      {!orders || orders?.length == 0 ? (
        <View style={{ alignItems: "center", marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>Bạn chưa có hóa đơn nào</Text>
        </View>
      ) : null}
      <FlatList
        data={orders}
        renderItem={({ item }) => <ItemOrderHistory item={item} />}
        keyExtractor={(item, index) => (key = index)}
      />
    </View>
  );
}
