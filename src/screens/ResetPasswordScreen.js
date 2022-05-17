import React, { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-root-toast";
import authApi from "../api/authApi";
import Apploader2 from "../components/Apploader2";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import { emailValidator } from "../helpers/emailValidator";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [loader, setLoader] = useState(false);

  const sendResetPasswordEmail = async () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    setLoader(true);

    const data = {
      email: email.value,
    };
    const otp = {
      email: email.value,
    };
    const res = await authApi.sendOTPRegister(otp);
    if (res == true) {
      setLoader(false);
      Toast.show("Mã xác thực đã được gửi đến email của bạn!", {
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
      navigation.navigate("ConfirmOTP", { data });
    } else {
      setLoader(false);
      Toast.show("Tài khoản không tồn tại", {
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
      <View style={{ marginTop: 100 }}></View>
      <Logo />
      <Header>TÌM KIẾM TÀI KHOẢN</Header>
      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Tìm tài khoản
      </Button>
      {loader ? <Apploader2 /> : null}
    </Background>
  );
}
