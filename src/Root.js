import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
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
import { Text, View } from "react-native";
import { getCart } from "../src/redux/cartSlice";

import {
  ConfirmOTP,
  EditProfileUser,
  InforOrderScreen,
  InforOrderHistoryScreen,
  LoginScreen,
  PaymentScreen,
  ProductDetail,
  RegisterScreen,
  ResetPasswordScreen,
  UserScreen,
  CommentScreen,
} from "./screens";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChangePassword from "./screens/ChangePassword/ChangePassword";
import { findAddressByUserId } from "./redux/addressSlice";
import { findOrdersByUserId } from "./redux/orderSlice";

const Stack = createStackNavigator();
const Root = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  const { cartDetails, cartDetailsDefault } = useSelector(
    (state) => state.cart
  );

  const [badge, setBadge] = useState(0);

  useEffect(() => {
    if (cartDetails?.length > 0) {
      setBadge(cartDetails?.length);
    } else {
      setBadge(cartDetailsDefault?.length);
    }
  }, [dispatch, cartDetails, cartDetailsDefault]);

  useEffect(async () => {
    const res = await dispatch(refreshToken());

    if (res.payload?.user) {
      dispatch(getCart(res.payload?.user.id));
      dispatch(findAddressByUserId(res.payload?.user.id));
      dispatch(findOrdersByUserId(res.payload?.user.id));
    }
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
                  <View>
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
                    <Text
                      style={{
                        position: "absolute",
                        top: -10,
                        right: 10,
                        padding: 3,
                        paddingLeft: 8,
                        paddingRight: 8,
                        borderRadius: 20,
                        backgroundColor: "rgba(0,0,0,0.1)",
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {badge == 0 ? "0" : badge}
                    </Text>
                  </View>
                ),
              })}
              name="ProductDetail"
              component={ProductDetail}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                title: "THÔNG TIN CÁ NHÂN",
                headerTitleStyle: {
                  marginLeft: 30,
                },
              })}
              name="EditProfileUser"
              component={EditProfileUser}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                title: "THÔNG TIN ĐƠN HÀNG",
                headerTitleStyle: {
                  marginLeft: 20,
                },
              })}
              name="InforOrderScreen"
              component={InforOrderScreen}
            />

            <Stack.Screen
              options={({ navigation }) => ({
                title: "THANH TOÁN",
                headerTitleStyle: {
                  marginLeft: 30,
                },
              })}
              name="PaymentScreen"
              component={PaymentScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                title: "THÔNG TIN ĐƠN HÀNG",
                headerTitleAlign: "center",
              })}
              name="InforOrderHistoryScreen"
              component={InforOrderHistoryScreen}
            />
            <Stack.Screen
              options={({ navigation }) => ({
                title: "Đánh giá sản phẩm",
                headerTitleAlign: "center",
              })}
              name="CommentScreen"
              component={CommentScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RootSiblingParent>
  );
};

export default Root;
