import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator, phoneValidator } from "../helpers/emailValidator";
import {
  passwordValidator,
  password_CrfValidator,
} from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { useDispatch } from "react-redux";
import Toast from "react-native-root-toast";
import authApi from "../api/authApi";

const radioButtonsData = [
  {
    id: "1",
    label: "Nam",
    value: 1,
    selected: true,
  },
  {
    id: "2",
    label: "Nữ",
    value: 0,
    elected: false,
  },
];

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [password_Cfr, setPassword_Cfr] = useState({ value: "", error: "" });
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [gender, setGender] = useState(1);
  const dispatch = useDispatch();

  const onPressRadioButton = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
    radioButtonsArray.map((value) => {
      if (value.selected) setGender(value.value);
    });
  };

  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const password_CfrError = password_CrfValidator(
      password_Cfr.value,
      password.value
    );
    const phoneNumberError = phoneValidator(phoneNumber.value);
    if (
      emailError ||
      passwordError ||
      nameError ||
      password_CfrError ||
      phoneNumberError
    ) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setPassword_Cfr({ ...password_Cfr, error: password_CfrError });
      setPhoneNumber({ ...phoneNumber, error: phoneNumberError });
      return;
    }
    const data = {
      userName: name.value,
      email: email.value,
      phone: phoneNumber.value,
      gender: gender.value,
      password: password.value,
    };
    const otp = {
      email: email.value,
    };
    const res = await authApi.sendOTP(otp);
    if (res == true) {
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
      Toast.show("Email đã được đăng kí", {
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
      <BackButton
        goBack={() => {
          navigation.navigate("LoginScreen");
        }}
      />
      <View style={styles.body}></View>

      <Header>ĐĂNG KÝ</Header>
      <TextInput
        label="Tên tài khoản"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <RadioGroup
        radioButtons={radioButtons}
        onPress={onPressRadioButton}
        layout="row"
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Số điện thoại"
        returnKeyType="next"
        value={phoneNumber.value}
        onChangeText={(text) => {
          setPhoneNumber({ value: text, error: "" });
        }}
        error={!!phoneNumber.error}
        errorText={phoneNumber.error}
      />

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
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Đăng ký
      </Button>
      <View style={styles.row}>
        <Text>Đã có tài khoản? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Đăng nhập</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  body: {},

  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
