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

export default function ConfirmOTP({ navigation, route }) {
  const dispatch = useDispatch();

  const [otp, setOTP] = useState({ value: "", error: "" });

  const sendResetPasswordEmail = async () => {
    const otpError = otpValidator(otp.value);
    if (otpError) {
      setOTP({ ...opt, error: otpError });
      return;
    }
    const data = {
      otp: otp.value,
      email: route.params.data.email,
    };
    const res = await authApi.validateOTP(data);
    if (res !== true) {
      const error = "Mã xác nhận không chính xác";
      setOTP({ ...opt, error: error });
      return;
    }
    dispatch(register(route.params.data));
    navigation.navigate("LoginScreen");
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
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
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
