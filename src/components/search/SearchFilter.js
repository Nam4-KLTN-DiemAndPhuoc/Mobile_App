import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

export default function SearchFilter() {
  const [itemSelected, setItemSelected] = useState("Tất cả");
  const { suppliers } = useSelector((state) => state.suppliers);
  return (
    <View style={styles.container}>
      <View style={styles.filterPrice}>
        <Picker
          selectedValue={itemSelected}
          onValueChange={(itemValue, itemIndex) => {
            setItemSelected(itemValue);
          }}
        >
          <Picker.Item label="Giá" value={true} />
          <Picker.Item label="Tăng dần" value={true} />
          <Picker.Item label="Giảm dần" value={false} />
        </Picker>
      </View>
      <View style={styles.filterPrice}>
        <Picker
          selectedValue={itemSelected}
          onValueChange={(itemValue, itemIndex) => {
            setItemSelected(itemValue);
          }}
        >
          <Picker.Item label="Nhà cung cấp" value="Tất cả" />
          {suppliers.map((item) => (
            <Picker.Item
              key={item.id}
              label={item.supplierName}
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
  },
});
