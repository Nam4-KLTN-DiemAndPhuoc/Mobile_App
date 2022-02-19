import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import {
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from "./src/screens";
import menu from "./src/components/menu/menu";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider theme={theme}>
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
    </Provider>
  );
}
