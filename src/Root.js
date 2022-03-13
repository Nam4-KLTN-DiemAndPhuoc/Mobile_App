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
import {
  ConfirmOTP,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  UserScreen,
} from "./screens";

const Stack = createStackNavigator();
const Root = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(refreshToken());
    dispatch(advertisement());

    const paging = {
      page: 1,
      limit: 10,
    };

    dispatch(getAll(paging));

    dispatch(category());
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
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RootSiblingParent>
  );
};

export default Root;
