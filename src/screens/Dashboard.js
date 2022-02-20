import React, { useEffect } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { getUserId, register } from "../redux/userSlice";

export default function Dashboard({ navigation }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = 5;
    dispatch(getUserId(id));
    const data = {
      userName: " phuoc",
      addresses: null,
      role: {
        id: 1,
        name: "ROLE_USER",
      },
      email: "duongdiemee@gmail.com",
      phone: null,
      gender: false,
      createdAt: null,
      deletedAt: null,
      deletedBy: null,
    };
    dispatch(register(data));
  });

  return (
    <Background>
      <Logo style={styles.logo} />
      <Header>Let’s start</Header>
      <Paragraph>
        Your amazing app starts here. Open you favorite code editor and start
        editing this project.
      </Paragraph>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "LoginScreen" }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  logo: {
    paddingTop: 100,
  },
});
