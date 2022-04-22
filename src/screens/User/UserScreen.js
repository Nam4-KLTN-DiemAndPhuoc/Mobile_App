import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Drawer, useTheme } from "react-native-paper";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { logout } from "../../redux/authSlice";
import { useNavigation } from "@react-navigation/core";
import { clearCartDetail } from "../../redux/cartSlice";
export default function UserScreen(props) {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert("Thông báo", "Bạn muốn đăng xuất ?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          dispatch(logout());
          dispatch(clearCartDetail());
          navigation.navigate("Dashboard");
        },
      },
    ]);
  };

  const handleLogIn = () => {
    navigation.navigate("LoginScreen");
  };
  return (
    <View style={styles.container} {...props}>
      {token ? (
        <View style={styles.container} {...props}>
          <DrawerContentScrollView>
            <View style={styles.drawerContent}>
              <Drawer.Section style={styles.drawerSection}>
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons
                      name="settings-sharp"
                      size={size}
                      color={theme.dark ? "#525252" : "#fff"}
                      style={{
                        borderRadius: 150,
                        padding: 9,
                        paddingHorizontal: 10,
                        backgroundColor: theme.dark ? "#fff" : "#525252",
                      }}
                    />
                  )}
                  label="Chỉnh sửa thông tin"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => {
                    navigation.navigate("EditProfileUser");
                  }}
                />
                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons
                      name="ios-cart-outline"
                      size={24}
                      color="#fff"
                      style={{
                        borderRadius: 150,
                        padding: 10,
                        paddingHorizontal: 11,
                        backgroundColor: "#2196F3",
                      }}
                    />
                  )}
                  label="Giỏ hàng"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => {
                    // navigation.navigate("ProfileUserScreen");
                  }}
                />

                <DrawerItem
                  icon={({ color, size }) => (
                    <MaterialIcons
                      name="history"
                      size={24}
                      color="#fff"
                      style={{
                        borderRadius: 150,
                        padding: 10,
                        paddingVertical: 12,
                        backgroundColor: "#17D7A0",
                      }}
                    />
                  )}
                  label="Đơn hàng đã mua"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => {
                    // props.navigation.navigate("InviteAddFriend");
                  }}
                />

                <DrawerItem
                  icon={({ color, size }) => (
                    <Ionicons
                      name="key-outline"
                      size={24}
                      color={color}
                      style={{
                        borderRadius: 150,
                        padding: 10,
                        paddingVertical: 12,
                        backgroundColor: "#17D7A0",
                      }}
                    />
                  )}
                  label="Đổi mật khẩu"
                  labelStyle={styles.drawerItemLabel}
                  onPress={() => {
                    navigation.navigate("ChangePassword");
                  }}
                />
              </Drawer.Section>
            </View>
          </DrawerContentScrollView>
          <Drawer.Section style={styles.bottomDrawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Feather
                  name="log-out"
                  color={theme.colors.error}
                  size={size + 3}
                />
              )}
              label="Đăng Xuất"
              labelStyle={[
                styles.drawerItemLabel,
                { color: theme.colors.error },
                { fontSize: responsiveFontSize(2.3) },
              ]}
              onPress={() => handleLogout()}
            />
          </Drawer.Section>
        </View>
      ) : (
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <AntDesign
                name="login"
                size={size + 3}
                color={theme.colors.error}
              />
            )}
            label="Đăng nhập"
            labelStyle={[
              styles.drawerItemLabel,
              { color: theme.colors.error },
              { fontSize: responsiveFontSize(2.3) },
            ]}
            onPress={() => handleLogIn()}
          />
        </Drawer.Section>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  drawerContent: {
    flex: 1,
  },
  bottomDrawerSection: {
    marginBottom: 0,
    borderTopColor: "#ccc",
    borderTopWidth: 0.2,
    paddingTop: 4,
  },
  drawerSection: {
    marginTop: -15,
  },
});
