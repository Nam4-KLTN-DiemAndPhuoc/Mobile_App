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
import LoginScreen from "../../screens/LoginScreen";

import RegisterScreen from "../../screens/RegisterScreen";

import ResetPasswordScreen from "../../screens/ResetPasswordScreen";

import Dashboard from "../../screens/Dashboard";

const Tab = createBottomTabNavigator();
const MainTab = () => {
  const theme = useTheme();

  let profilePicture =
    "https://sothis.es/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";

  const [myNofi, setMyNofi] = React.useState(0); //test so 3

  const iconSize = 23;
  const tabBarHeight = responsiveHeight(7);

  const navigation = useNavigation();

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
          title: "Tin nhắn",
          tabBarIcon: ({ color: color }) => {
            return <Ionicons name="chatbubble" size={iconSize} color={color} />;
          },
          // headerLeft: () => {
          //   return (
          //     <TouchableHighlight
          //       underlayColor={" #cccccc"}
          //       onPress={() => {
          //         navigation.navigate("ProfileUserScreen");
          //       }}
          //     >
          //       <Image
          //         source={{
          //           uri: "" + profilePicture,
          //         }}
          //         style={{
          //           width: responsiveHeight(4.5),
          //           height: responsiveHeight(4.5),
          //           borderRadius: responsiveHeight(5),
          //           borderColor: "#ccc",
          //           borderWidth: 1,
          //         }}
          //       />
          //     </TouchableHighlight>
          //   );
          // },
          // headerLeftContainerStyle: {
          //   marginLeft: responsiveHeight(2),
          // },
        }}
        name="Dashboard"
        component={Dashboard}
      />
      {/* <Tab.Screen
        options={{
          title: "Liên hệ",
          tabBarIcon: ({ color: color }) => (
            <MaterialCommunityIcons
              name="contacts"
              size={iconSize}
              color={color}
            />
          ),
        }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
      <Tab.Screen
        options={{
          title: `Nhóm`,
          headerShown: true,
          headerRight: () => {
            return (
              <TouchableHighlight
                style={{ borderRadius: 1000, padding: 3 }}
                underlayColor={theme.colors.secondary}
                onPress={() => {
                  navigation.navigate("LoginScreen");
                }}
              >
                <MaterialIcons
                  name="group-add"
                  size={35}
                  color={theme.colors.primary}
                  style={{
                    paddingRight: 10,
                  }}
                />
              </TouchableHighlight>
            );
          },
          headerRightContainerStyle: {
            marginRight: 15,
          },
          tabBarIcon: ({ color: color }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={iconSize + 5}
              color={color}
            />
          ),
        }}
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Tab.Screen
        options={{
          title: "Thông tin",
          tabBarIcon: ({ color: color }) => (
            <Ionicons name="md-grid" size={iconSize} color={color} />
          ),
        }}
        name="LoginScreen"
        component={LoginScreen}
      /> */}
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
