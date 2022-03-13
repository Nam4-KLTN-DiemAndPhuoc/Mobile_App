import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function SearchHeader() {
  const { suppliers } = useSelector((state) => state.suppliers);
  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput style={styles.textInput} placeholder="Tìm kiếm" />
          <TouchableOpacity>
            <Ionicons
              style={styles.iconCart}
              name="ios-cart-outline"
              size={24}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#F08F5F",
  },
  search: {
    flexDirection: "row",
    marginTop: "15%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    marginLeft: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    width: "80%",
    backgroundColor: "#C4C4C4",
  },
  iconCart: {
    marginRight: 20,
  },
});
