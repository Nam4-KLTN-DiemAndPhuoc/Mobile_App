import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import { getCart } from "../redux/cartSlice";
import Toast from "react-native-root-toast";
import { findAddressByUserId } from "../redux/addressSlice";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const { user, token, messageError } = useSelector((state) => state.auth);

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const data = {
      email: email.value,
      password: password.value,
    };
    const res = await dispatch(login(data));
    if (res.payload.user) {
      dispatch(getCart(res.payload.user.id));
      dispatch(findAddressByUserId(res.payload.user.id));
    }
  };

  useEffect(() => {
    if (user && !messageError) {
      navigation.goBack();
    }
    if (messageError) {
      Toast.show(messageError, {
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
  }, [user, messageError]);

  return (
    <Background>
      <View style={styles.body}></View>
      <Logo />

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
        label="Mật khẩu"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Quên mật khẩu ?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
        Đăng nhập
      </Button>
      <View style={styles.row}>
        <Text>Chưa có tài khoản ? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}> Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  body: {
    marginTop: 100,
  },
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
