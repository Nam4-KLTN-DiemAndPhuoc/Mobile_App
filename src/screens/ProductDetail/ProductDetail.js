import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useSelector } from "react-redux";
import ImageDetail from "../../components/productDetail/ImageDetail";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProductDetail() {
  const { product } = useSelector((state) => state.product);
  const { comments } = useSelector((state) => state.comment);
  const { categoryFind } = useSelector((state) => state.category);
  const { supplier } = useSelector((state) => state.suppliers);
  const { attributes } = useSelector((state) => state.attribute);
  const [itemSelected, setItemSelected] = useState(attributes[0]);

  const [amount, setAmount] = useState(1);

  const handlerMinus = () => {
    if (amount >= 2) {
      setAmount(amount - 1);
    }
  };

  const handlerAdd = () => {
    if (amount < itemSelected?.amount) setAmount(Number(amount) + 1);
  };

  const inputAmount = (text) => {
    if (text <= itemSelected?.amount) setAmount(text);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.image}>
          <ImageDetail />
        </View>
        <View style={styles.body}>
          <Text style={styles.textName}>{product.name}</Text>
          <Text style={styles.textPrice}>
            {product.price - product.price * product.discount} VNĐ
          </Text>
          <Text style={styles.textCategory}>
            {supplier.supplierName} - {categoryFind.name}
          </Text>
          <Text>{product.description}</Text>
        </View>

        <View style={styles.handler}>
          <View style={{ marginTop: 30 }}>
            <View style={styles.amount}>
              <TouchableOpacity
                style={styles.minus}
                onPress={() => handlerMinus()}
              >
                <AntDesign name="minus" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                onChangeText={(text) => inputAmount(text)}
                value={`${amount}`}
                keyboardType="numeric"
                style={{ margin: 10 }}
              />
              <TouchableOpacity style={styles.add} onPress={handlerAdd}>
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={{ color: "red", marginLeft: 10 }}>
              Hiện có: {itemSelected?.amount} sản phẩm
            </Text>
          </View>
          <View style={styles.attribute}>
            <View style={styles.size}>
              <Text style={{ marginRight: 20 }}>Size</Text>
              <View style={{ backgroundColor: "#C4C4C4", borderRadius: 20 }}>
                <Picker
                  selectedValue={itemSelected}
                  onValueChange={(itemValue, itemIndex) => {
                    setItemSelected(itemValue);
                  }}
                  style={{
                    width: 100,
                  }}
                >
                  {attributes.map((item, index) => (
                    <Picker.Item
                      style={styles.textItem}
                      key={index}
                      label={item.size}
                      value={item}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.action}>
          <TouchableOpacity style={styles.addToCart}>
            <MaterialIcons name="add-shopping-cart" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyNow}>
            <Text> Mua ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 250,
  },
  body: {
    margin: 10,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 25,
  },
  textPrice: {
    color: "red",
  },
  textCategory: {
    fontSize: 18,
    marginTop: 10,
  },
  handler: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amount: {
    flexDirection: "row",
    marginLeft: 10,
    justifyContent: "space-between",
    width: "30%",
  },
  minus: {
    padding: 5,
    backgroundColor: "#C4C4C4",
  },
  add: {
    padding: 5,
    backgroundColor: "#C4C4C4",
  },
  textItem: {
    textAlign: "center",
    fontSize: 14,
  },
  attribute: {
    marginRight: 30,
  },
  size: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  action: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addToCart: {
    backgroundColor: "#F08F5F",
    padding: 10,
    width: 100,
    borderRadius: 30,
    alignItems: "center",
    margin: 20,
  },
  buyNow: {
    backgroundColor: "#F08F5F",
    padding: 15,
    width: 100,
    borderRadius: 30,
    alignItems: "center",
    margin: 20,
  },
});
