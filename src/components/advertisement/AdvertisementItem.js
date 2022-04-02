import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../redux/ProductSlice";
import { findImageByProductId } from "../../redux/imageProductSlice";
import { findCommentByProductId } from "../../redux/commentSlice";
import { findCategoryById } from "../../redux/categorySlice";
import { findSupplierById } from "../../redux/supplierSlice";
import { findAttributeByProductId } from "../../redux/attributeSlice";
import { useNavigation } from "@react-navigation/core";
import { addCartDetail, addCartDetailDefault } from "../../redux/cartSlice";
import Toast from "react-native-root-toast";

export default function AdvertisementItem({ item }) {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigation = useNavigation();

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
    <TouchableOpacity
      onPress={() => handleClick(item.product.id, item.product.categoryId)}
    >
      <ImageBackground
        source={{
          uri: item.product.avatar,
        }}
        style={styles.imageBackground}
      >
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnBuy}
            onPress={() => addCartDetaill()}
          >
            <FontAwesome
              style={styles.textBtn}
              name="cart-plus"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.background}>
          <Text style={styles.textProductName}>{item.product.name}</Text>
          <Text style={styles.textPrice}>
            {item.product.price - item.product.price * item.product.discount}{" "}
            VNĐ
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  imageBackground: {
    width: Dimensions.get("window").width,
    height: 200,
  },
  container: {
    marginLeft: 20,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnBuy: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 20,
    width: "20%",
    alignItems: "center",
  },
  textBtn: {
    color: "white",
    fontWeight: "bold",
  },

  textProductName: {
    color: "red",
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
  },

  textPrice: {
    color: "red",
    padding: 5,
    fontSize: 18,
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
    fontWeight: "bold",
  },
  background: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 60,
  },
});
