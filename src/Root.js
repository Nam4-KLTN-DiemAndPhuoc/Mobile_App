import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
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

const Stack = createStackNavigator();
const Root = () => {
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
            <Stack.Screen name="Dashboard" component={Dashboard} />

            <Stack.Screen
              options={({ navigation }) => ({
                headerShown: false,
              })}
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
          
        </NavigationContainer>

      </PaperProvider>
    </RootSiblingParent>
  );
};

export default Root;
