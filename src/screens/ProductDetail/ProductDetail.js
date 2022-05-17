import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ImageDetail from "../../components/productDetail/ImageDetail";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from "@expo/vector-icons";
import { addCartDetail, addCartDetailDefault } from "../../redux/cartSlice";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/core";
import { findCommentByProductId } from "../../redux/commentSlice";
import Apploader from "../../components/Apploader";

export default function ProductDetail() {
  const { product } = useSelector((state) => state.product);

  const { categoryFind } = useSelector((state) => state.category);
  const { supplier } = useSelector((state) => state.suppliers);
  const { attributes } = useSelector((state) => state.attribute);
  const [itemSelected, setItemSelected] = useState(attributes[0]);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [amount, setAmount] = useState(1);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const addCartDetaill = () => {
    if (user) {
      const data = {
        productId: product.id,
        amount: amount,
        attributeId: itemSelected.id,
        cart: cart,
      };
      dispatch(addCartDetail(data));
    } else {
      const data = {
        cartDetail: {
          amount: amount,
          cart: null,
          attributeId: itemSelected.id,
        },

        product: product,
      };

      dispatch(addCartDetailDefault(data));
    }

    Toast.show("Đã thêm sản phẩm vào giỏ hàng", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      containerStyle: {
        backgroundColor: "#C4C4C4",
        borderRadius: 200,
        marginBottom: 300,
        paddingHorizontal: 20,
        shadowColor: "#e6e6e6",
        shadowOpacity: 0.5,
      },
      textStyle: { color: "#000", fontWeight: "bold" },
    });
  };

  const commentSceen = () => {
    setLoader(true);
    dispatch(findCommentByProductId(product.id));

    setTimeout(() => {
      setLoader(false);
      navigation.navigate("CommentScreen");
    }, 1000);
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
          <TouchableOpacity
            style={styles.buyNow}
            onPress={() => addCartDetaill()}
          >
            <MaterialIcons name="add-shopping-cart" size={30} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toComment}
            onPress={() => commentSceen()}
          >
            <Text> Đánh giá sản phẩm </Text>
            <MaterialIcons name="navigate-next" size={30} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {loader ? <Apploader /> : null}
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
  toComment: {
    backgroundColor: "#C4C4C4",
    padding: 15,
    // width: 100,
    borderRadius: 30,
    alignItems: "center",
    margin: 20,
    flexDirection: "row",
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
