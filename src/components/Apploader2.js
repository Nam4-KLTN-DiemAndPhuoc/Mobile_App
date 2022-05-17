import React from "react";
import LottieView from "lottie-react-native";
import { Dimensions, StyleSheet, View } from "react-native";

const Apploader2 = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView source={require("../../assets/loader2.json")} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    zIndex: 1,
  },
});

export default Apploader2;
