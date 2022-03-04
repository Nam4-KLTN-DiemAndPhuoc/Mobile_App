import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function HomeHeader() {
  const [itemSelected, setItemSelected] = useState("Tất cả");

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>SHOP TD</Text>
      </View>
      <View style={styles.search}>
        <View style={styles.picker}>
          <Picker
            selectedValue={itemSelected}
            onValueChange={(itemValue, itemIndex) => {
              setItemSelected(itemValue);
            }}
            itemStyle={styles.itemPicker}
          >
            <Picker.Item label="Tất cả" value="Tất cả" />
            <Picker.Item label="Shop 1" value="Shop 1" />
          </Picker>
        </View>
        <TextInput style={styles.textInput} placeholder="Tìm kiếm" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "25%",
    backgroundColor: "#F08F5F",
  },

  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  search: {
    flexDirection: "row",
  },
  textInput: {
    height: 40,
    marginLeft: 5,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    width: "60%",
    backgroundColor: "#C4C4C4",
  },

  picker: {
    height: 40,
    width: "35%",
    backgroundColor: "#C4C4C4",
    marginLeft: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 10,
  },
  itemPicker: {
    // fontSize: 10,
  },
});
