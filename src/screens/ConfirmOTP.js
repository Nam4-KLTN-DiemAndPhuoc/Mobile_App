import React, { useState } from "react";
import Background from "../components/Background";
import BackButton from "../components/BackButton";
import Logo from "../components/Logo";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { otpValidator } from "../helpers/oTPValidator";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { register, validateOTP } from "../redux/authSlice";
import authApi from "../api/authApi";
import Toast from "react-native-root-toast";

export default function ConfirmOTP({ navigation, route }) {
  const dispatch = useDispatch();

  const [otp, setOTP] = useState({ value: "", error: "" });

  const validator = async () => {
    const otpError = otpValidator(otp.value);
    if (otpError) {
      setOTP({ ...otp, error: otpError });
      return;
    }
    const data = {
      otp: otp.value,
      email: route.params.data.email,
    };
    const res = await authApi.validateOTP(data);
    if (res == true) {
      dispatch(register(route.params.data));
      navigation.navigate("LoginScreen");
    } else {
      Toast.show("Mã xác thực không chính xác", {
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
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <View style={styles.body}></View>
      <Logo />
      <Header>XÁC THỰC ĐĂNG KÝ</Header>
      <TextInput
        label="mã xác nhận"
        returnKeyType="done"
        value={otp.value}
        onChangeText={(text) => setOTP({ value: text, error: "" })}
        error={!!otp.error}
        errorText={otp.error}
        autoCapitalize="none"
        description="Nhập mã xác nhận được gửi qua mail đăng ký của bạn"
      />
      <Button mode="contained" onPress={validator} style={{ marginTop: 16 }}>
        Xác nhận
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 100,
  },
});
