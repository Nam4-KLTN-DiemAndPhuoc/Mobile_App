import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { useDispatch, useSelector } from "react-redux";
import menu from "./components/menu/menu";
import { theme } from "./core/theme";
import { advertisement } from "./redux/advertisementSlice";
import { refreshToken } from "./redux/authSlice";
import { category } from "./redux/categorySlice";
import { getAll } from "./redux/productListSlice";
import { findAll } from "./redux/productSearchSlice";
import { useNavigation } from "@react-navigation/core";

import {
  ConfirmOTP,
  LoginScreen,
  ProductDetail,
  RegisterScreen,
  ResetPasswordScreen,
  UserScreen,
} from "./screens";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getCart } from "./redux/cartSlice";
import ChangePassword from "./screens/ChangePassword/ChangePassword";

const Stack = createStackNavigator();
const Root = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(async () => {
    dispatch(refreshToken());
    dispatch(advertisement());

    const paging = {
      page: 1,
      limit: 10,
    };

    dispatch(getAll(paging));

    dispatch(category());

    dispatch(findAll(paging));
  }, [dispatch]);

  return (
    <RootSiblingParent>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="menu">
            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: false,
              })}
              name="menu"
              component={menu}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: false,
              })}
              name="RegisterScreen"
              component={RegisterScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: false,
              })}
              name="LoginScreen"
              component={LoginScreen}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: false,
              })}
              name="UserScreen"
              component={UserScreen}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: false,
              })}
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: false,
              })}
              name="ConfirmOTP"
              component={ConfirmOTP}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: false,
              })}
              name="ChangePassword"
              component={ChangePassword}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                title: "DETAIL",
                headerTitleStyle: {
                  marginLeft: 80,
                },
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("CartScreen")}
                  >
                    <Ionicons
                      style={{ marginRight: 20 }}
                      name="cart-outline"
                      size={30}
                      color="black"
                    />
                  </TouchableOpacity>
                ),
              })}
              name="ProductDetail"
              component={ProductDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RootSiblingParent>
  );
};

export default Root;
