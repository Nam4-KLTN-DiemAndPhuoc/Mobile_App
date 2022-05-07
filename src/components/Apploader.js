import React from "react";
import LottieView from "lottie-react-native";
import { Dimensions, StyleSheet, View } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Apploader = () => {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <LottieView
        source={require("../../assets/98195-loader.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0,0,0,0.1)",
    // width: 200,
    // height: windowHeight,
    zIndex: 1,
  },
});

export default Apploader;
