import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function HomeHeader() {
  const [itemSelected, setItemSelected] = useState("Tất cả");

  const { category } = useSelector((state) => state.category);

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>SHOP PD</Text>
      </View>
      <View style={styles.search}>
        <View style={styles.picker}>
          <Picker
            selectedValue={itemSelected}
            onValueChange={(itemValue, itemIndex) => {
              setItemSelected(itemValue);
            }}
          >
            <Picker.Item label="Danh mục" value="Tất cả" />
            {category.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
          </Picker>
        </View>
        <TextInput
          style={styles.textInput}
          onFocus={() => {
            navigation.navigate("SearchScreen");
          }}
          placeholder="Tìm kiếm"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "20%",
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
});
