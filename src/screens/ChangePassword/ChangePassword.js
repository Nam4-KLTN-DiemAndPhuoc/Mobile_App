import React, { useState } from "react";
import { Text, View } from "react-native";
import Background from "../../components/Background";
import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import {
  passwordValidator,
  password_CrfValidator,
} from "../../helpers/passwordValidator";
import authApi from "../../api/authApi";
import Toast from "react-native-root-toast";
import { useSelector } from "react-redux";

export default function ChangePassword({ navigation, route }) {
  const { user } = useSelector((state) => state.auth);
  const [password, setPassword] = useState({ value: "", error: "" });
  const [password_Cfr, setPassword_Cfr] = useState({ value: "", error: "" });
  const onChangePassword = async () => {
    const passwordError = passwordValidator(password.value);
    const password_CfrError = password_CrfValidator(
      password_Cfr.value,
      password.value
    );

    if (passwordError || password_CfrError) {
      setPassword({ ...password, error: passwordError });
      setPassword_Cfr({ ...password_Cfr, error: password_CfrError });
      return;
    }

    console.log(user);
    if (user) {
      const data = {
        email: user.email,
        password: password.value,
      };
      const res = await authApi.changePassword(data);
      Toast.show(res, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        containerStyle: {
          backgroundColor: "#C4C4C4",
          borderRadius: 200,
          marginBottom: 300,
          paddingHorizontal: 20,
          shadowColor: "#e6e6e6",
          shadowOpacity: 0.5,
        },
        textStyle: { color: "#000", fontWeight: "bold" },
      });
      navigation.goBack();
    } else {
      const data = {
        email: route.params.dt.email,
        password: password.value,
      };

      const res = await authApi.changePassword(data);
      Toast.show(res, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        containerStyle: {
          backgroundColor: "#C4C4C4",
          borderRadius: 200,
          marginBottom: 300,
          paddingHorizontal: 20,
          shadowColor: "#e6e6e6",
          shadowOpacity: 0.5,
        },
        textStyle: { color: "#000", fontWeight: "bold" },
      });
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={{ marginTop: 100 }}></View>
      <Header>ĐỔI MẬT KHẨU</Header>
      <TextInput
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <TextInput
        label="Xác nhận mật khẩu"
        returnKeyType="done"
        value={password_Cfr.value}
        onChangeText={(text) => setPassword_Cfr({ value: text, error: "" })}
        error={!!password_Cfr.error}
        errorText={password_Cfr.error}
        secureTextEntry
      />

      <Button
        mode="contained"
        onPress={onChangePassword}
        style={{ marginTop: 24 }}
      >
        Đổi mật khẩu
      </Button>
    </Background>
  );
}
