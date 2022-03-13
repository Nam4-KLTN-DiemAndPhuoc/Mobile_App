import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function SearchFilter() {
  const [itemSelected, setItemSelected] = useState("Tất cả");
  const { category } = useSelector((state) => state.category);
  return (
    <View style={styles.container}>
      <View style={styles.filterPrice}>
        <Picker
          selectedValue={itemSelected}
          onValueChange={(itemValue, itemIndex) => {
            setItemSelected(itemValue);
          }}
        >
          <Picker.Item style={styles.textItem} label="Giá" value={true} />
          <Picker.Item style={styles.textItem} label="Tăng dần" value={true} />
          <Picker.Item style={styles.textItem} label="Giảm dần" value={false} />
        </Picker>
      </View>
      <View style={styles.filterSupplier}>
        <Picker
          selectedValue={itemSelected}
          onValueChange={(itemValue, itemIndex) => {
            setItemSelected(itemValue);
          }}
        >
          <Picker.Item
            style={styles.textItem}
            label="Danh mục"
            value="Tất cả"
          />
          {category.map((item) => (
            <Picker.Item
              style={styles.textItem}
              key={item.id}
              label={item.name}
              value={item.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterPrice: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 30,
    height: 40,
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 5,
  },
  filterSupplier: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 30,
    height: 40,
    justifyContent: "center",
    marginRight: 20,
    marginTop: 5,
  },
  textItem: {
    fontSize: 14,
  },
});
