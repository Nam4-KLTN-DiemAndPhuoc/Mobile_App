import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/core";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
} from "react-native-responsive-dimensions";

import Dashboard from "../../screens/Dashboard";
import UserScreen from "../../screens/User/UserScreen";
import SearchScreen from "../../screens/Search/SearchScreen";
import OrderHistoryScreen from "../../screens/Order/OrderHistoryScreen";
import CartScreen from "../../screens/Cart/CartScreen";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

const Tab = createBottomTabNavigator();
const MainTab = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const iconSize = 23;
  const tabBarHeight = responsiveHeight(7);

  const [badge, setBadge] = useState(0);

  const { cartDetails, cartDetailsDefault } = useSelector(
    (state) => state.cart
  );

  useEffect(() => {
    if (cartDetails?.length > 0) {
      setBadge(cartDetails?.length);
    } else {
      setBadge(cartDetailsDefault?.length);
    }
  }, [dispatch, cartDetails, cartDetailsDefault]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIndicator: () => null,
        tabBarStyle: {
          marginVertical: 0,
          paddingTop: 5,
          height: tabBarHeight,
        },
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
          title: "Trang chủ",
          tabBarIcon: ({ color: color }) => {
            return <AntDesign name="home" size={iconSize} color={color} />;
          },
        }}
        name="Dashboard"
        component={Dashboard}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          title: "Tìm kiếm",
          tabBarIcon: ({ color: color }) => (
            <Ionicons name="search" size={iconSize} color={color} />
          ),
        }}
        name="SearchScreen"
        component={SearchScreen}
      />

      <Tab.Screen
        options={{
          title: "GIỎ HÀNG",
          tabBarIcon: ({ color: color }) => (
            <View>
              <Ionicons name="ios-cart-outline" size={iconSize} color={color} />
              <Text style={styles.badge}>{badge}</Text>
            </View>
          ),
          headerTitleStyle: {
            marginLeft: 100,
            fontWeight: "bold",
          },
        }}
        name="CartScreen"
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          title: "ĐƠN HÀNG",
          headerTitleAlign: "center",
          tabBarIcon: ({ color: color }) => (
            <MaterialIcons name="history" size={iconSize} color={color} />
          ),
        }}
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
      />

      <Tab.Screen
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ color: color }) => (
            <FontAwesome name="user-circle-o" size={iconSize} color={color} />
          ),
        }}
        name="UserScreen"
        component={UserScreen}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarLabel: {
    textTransform: "capitalize",
    margin: 0,
    fontSize: responsiveFontSize(1.6),
  },
  tabBarIcon: {
    width: "auto",
    padding: 0,
    marginTop: 4,
  },
  badge: {
    position: "absolute",
    top: -10,
    right: -10,
    padding: 3,
    paddingLeft: 5,
    paddingRight: 5,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.1)",
    color: "red",
    fontWeight: "bold",
  },
});
export default MainTab;
