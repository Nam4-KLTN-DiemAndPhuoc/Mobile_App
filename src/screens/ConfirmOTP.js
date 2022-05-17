import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Toast from "react-native-root-toast";
import { useDispatch } from "react-redux";
import authApi from "../api/authApi";
import Apploader2 from "../components/Apploader2";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import { otpValidator } from "../helpers/oTPValidator";
import { register } from "../redux/authSlice";

export default function ConfirmOTP({ navigation, route }) {
  const dispatch = useDispatch();

  const [otp, setOTP] = useState({ value: "", error: "" });
  const [loader, setLoader] = useState(false);

  const validator = async () => {
    const otpError = otpValidator(otp.value);
    if (otpError) {
      setOTP({ ...otp, error: otpError });
      return;
    }
    setLoader(true);
    const data = {
      otp: otp.value,
      email: route.params.data.email,
    };
    const res = await authApi.validateOTP(data);
    if (res == true) {
      setLoader(false);
      if (route.params.data.userName) {
        dispatch(register(route.params.data));
        navigation.navigate("Dashboard");
      } else {
        const dt = {
          email: route.params.data.email,
        };
        navigation.navigate("ChangePassword", { dt });
      }
    } else {
      setLoader(false);
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
      <Header>XÁC THỰC OTP</Header>
      <TextInput
        label="mã xác nhận"
        returnKeyType="done"
        value={otp.value}
        onChangeText={(text) => setOTP({ value: text, error: "" })}
        error={!!otp.error}
        errorText={otp.error}
        autoCapitalize="none"
        keyboardType="phone-pad"
        description="Nhập mã xác nhận được gửi qua mail đăng ký của bạn"
      />
      <Button mode="contained" onPress={validator} style={{ marginTop: 16 }}>
        Xác nhận
      </Button>
      {loader ? <Apploader2 /> : null}
    </Background>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 100,
  },
});
