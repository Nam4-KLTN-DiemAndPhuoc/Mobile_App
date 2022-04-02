import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/ProductSlice";
import { findImageByProductId } from "../../redux/imageProductSlice";
import { findCommentByProductId } from "../../redux/commentSlice";
import { findCategoryById } from "../../redux/categorySlice";
import { findSupplierById } from "../../redux/supplierSlice";
import { findAttributeByProductId } from "../../redux/attributeSlice";
import { addCartDetail, addCartDetailDefault } from "../../redux/cartSlice";
import Toast from "react-native-root-toast";

export default function ItemProduct({ item }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const handleClick = (id, idCategory) => {
    dispatch(getProductById(id));
    dispatch(findImageByProductId(id));
    dispatch(findCommentByProductId(id));
    dispatch(findCategoryById(idCategory));
    dispatch(findSupplierById(item.product.supplierId));
    dispatch(findAttributeByProductId(id));
    navigation.navigate("ProductDetail");
  };

  const addCartDetaill = () => {
    if (user) {
      const data = {
        amount: 1,
        cart: cart,
        productId: item.product.id,
      };
      dispatch(addCartDetail(data));
    } else {
      const data = {
        cartDetail: {
          amount: 1,
          cart: null,
        },

        product: item.product,
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
          <TouchableOpacity onPress={() => addCartDetaill()}>
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
