import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/core";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableHighlight } from "react-native";
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

const Tab = createBottomTabNavigator();
const MainTab = () => {
  const theme = useTheme();

  const iconSize = 23;
  const tabBarHeight = responsiveHeight(7);

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
          title: "Home",
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
          title: "Search",
          tabBarIcon: ({ color: color }) => (
            <Ionicons name="search" size={iconSize} color={color} />
          ),
        }}
        name="SearchScreen"
        component={SearchScreen}
      />

      <Tab.Screen
        options={{
          title: "Cart",
          tabBarIcon: ({ color: color }) => (
            <Ionicons name="ios-cart-outline" size={iconSize} color={color} />
          ),
        }}
        name="CartScreen"
        component={CartScreen}
      />
      <Tab.Screen
        options={{
          title: "Order",
          tabBarIcon: ({ color: color }) => (
            <MaterialIcons name="history" size={iconSize} color={color} />
          ),
        }}
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
      />

      <Tab.Screen
        options={{
          title: "User",
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
});
export default MainTab;
