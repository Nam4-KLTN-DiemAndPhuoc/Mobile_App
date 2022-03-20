import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useDispatch } from "react-redux";
import { getProductById } from "../../redux/ProductSlice";
import { findImageByProductId } from "../../redux/imageProductSlice";
import { findCommentByProductId } from "../../redux/commentSlice";
import { findCategoryById } from "../../redux/categorySlice";
import { findSupplierById } from "../../redux/supplierSlice";
import { findAttributeByProductId } from "../../redux/attributeSlice";

export default function ItemProduct({ item }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleClick = (id, idCategory) => {
    dispatch(getProductById(id));
    dispatch(findImageByProductId(id));
    dispatch(findCommentByProductId(id));
    dispatch(findCategoryById(idCategory));
    dispatch(findSupplierById(item.product.supplierId));
    dispatch(findAttributeByProductId(id));
    navigation.navigate("ProductDetail");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          handleClick(item.product.id, item.product.categoryId);
        }}
      >
        <Image
          style={styles.imageItem}
          source={{
            uri: item.product.avatar,
          }}
        />
        <View style={styles.nameItem}>
          <Text style={styles.textName}>{item.product.name}</Text>
        </View>

        <View style={styles.price}>
          <Text style={styles.textPrice}> {item.product.price} VNĐ</Text>
          <TouchableOpacity>
            <FontAwesome
              style={styles.cartIcon}
              name="cart-plus"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 230,
    width: "45%",
    backgroundColor: "white",
    marginTop: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  imageItem: {
    marginTop: 10,
    marginLeft: 5,
    height: 150,
    width: "90%",
    borderRadius: 10,
  },
  cartIcon: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 20,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nameItem: {
    alignItems: "center",
  },
  textName: {
    fontWeight: "bold",
  },
  textPrice: {
    marginLeft: 5,
  },
});
