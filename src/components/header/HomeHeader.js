import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";

export default function HomeHeader() {
  const [itemSelected, setItemSelected] = useState("danhmuc");
  const navigation = useNavigation();
  const { category } = useSelector((state) => state.category);

  const handleSelectCategory = (itemValue) => {
    setItemSelected(itemValue);
    navigation.navigate("SearchScreen", { itemValue });
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.textTitle}>SHOP PD</Text>
      </View>
      <View style={styles.search}>
        <View style={styles.picker}>
          <Picker
            selectedValue={itemSelected}
            onValueChange={(itemValue, itemIndex) =>
              handleSelectCategory(itemValue)
            }
          >
            <Picker.Item
              style={styles.textItem}
              label="Danh mục"
              value="danhmuc"
            />
            {category?.map((item) => (
              <Picker.Item
                style={styles.textItem}
                key={item.id}
                label={item.name}
                value={item.id}
              />
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
    width: "58%",
    backgroundColor: "#C4C4C4",
  },

  picker: {
    height: 40,
    width: "37%",
    backgroundColor: "#C4C4C4",
    marginLeft: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 10,
  },
  textItem: {
    fontSize: 14,
  },
});
