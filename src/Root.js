import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";

import menu from "./components/menu/menu";
import { theme } from "./core/theme";
import {
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from "./screens";
import { RootSiblingParent } from "react-native-root-siblings";
import { useDispatch, useSelector } from "react-redux";
import { logout, refreshToken } from "./redux/authSlice";

const Stack = createStackNavigator();
const Root = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <RootSiblingParent>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          {token ? (
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
                name="Dashboard"
                component={Dashboard}
              />

              <Stack.Screen
                options={({ navigation }) => ({
                  headerShown: false,
                })}
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator initialRouteName="menu">
              <Stack.Screen
                options={({ navigation }) => ({
                  headerShown: false,
                })}
                name="menu"
                component={LoginScreen}
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
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
              />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
    </RootSiblingParent>
  );
};

export default Root;
