import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
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
import SelectBox from "react-native-multi-selectbox";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function ItemProduct({ item }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [modalVisible, setModalVisible] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [attributeSelected, setAttributeSelected] = useState({});
  const [amount, setAmount] = useState(1);

  const handleClick = (id, idCategory) => {
    dispatch(getProductById(id));
    dispatch(findImageByProductId(id));
    dispatch(findCommentByProductId(id));
    dispatch(findCategoryById(idCategory));
    dispatch(findSupplierById(item.product.supplierId));
    dispatch(findAttributeByProductId(id));
    navigation.navigate("ProductDetail");
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleAddCartDetail = () => {
    if (user) {
      const data = {
        amount: amount,
        cart: cart,
        productId: item.product.id,
        attributeId:
          attributeSelected?.value?.id == undefined
            ? null
            : attributeSelected?.value?.id,
      };
      dispatch(addCartDetail(data));
    } else {
      const data = {
        cartDetail: {
          amount: amount,
          cart: null,
          attributeId:
            attributeSelected?.value?.id == undefined
              ? null
              : attributeSelected?.value?.id,
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
    setModalVisible(!modalVisible);
  };

  const handlerMinus = () => {
    if (amount >= 2) {
      setAmount(amount - 1);
    }
  };

  const handlerAdd = () => {
    if (amount < attributeSelected?.value?.amount)
      setAmount(Number(amount) + 1);
  };

  const inputAmount = (text) => {
    if (text <= attributeSelected?.value?.amount) setAmount(text);
  };

  useEffect(async () => {
    const res = await dispatch(findAttributeByProductId(item.product.id));
    var array = [];
    if (res.payload.length > 0) {
      res.payload?.map((attri) =>
        array.push({ item: attri.size, id: attri.id, value: attri })
      );
    } else {
      array.push({ item: "Select", id: "Select" });
    }
    setAttributes(array);
    setAttributeSelected(array[0]);
  }, []);

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
          <TouchableOpacity onPress={() => openModal()}>
            <FontAwesome
              style={styles.cartIcon}
              name="cart-plus"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <SelectBox
              label="Chọn Size:"
              options={attributes}
              value={attributeSelected ? attributeSelected : attributes[0]}
              onChange={(val) => {
                setAttributeSelected(val);
              }}
              hideInputFilter={false}
              viewMargin="0 0 20px 0"
            />

            <View style={styles.amount}>
              <Text style={{ fontSize: 12, color: "#C4C4C4" }}>Số lượng: </Text>
              <Pressable style={styles.minus} onPress={() => handlerMinus()}>
                <AntDesign name="minus" size={24} color="black" />
              </Pressable>
              <TextInput
                onChangeText={(text) => inputAmount(text)}
                value={`${amount}`}
                keyboardType="numeric"
                style={{ margin: 10 }}
              />
              <Pressable style={styles.add} onPress={handlerAdd}>
                <Ionicons name="add" size={24} color="black" />
              </Pressable>
            </View>

            <Text
              style={{
                fontSize: 12,
                color: "red",
                width: "100%",
                marginBottom: 10,
              }}
            >
              * Tối đa: {attributeSelected?.value?.amount}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Pressable
                style={[styles.button, styles.addToCart]}
                onPress={() => handleAddCartDetail()}
              >
                <MaterialIcons
                  name="add-shopping-cart"
                  size={30}
                  color="black"
                />
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Đóng</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
    marginRight: 5,
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
    textAlign: "center",
  },
  textPrice: {
    marginLeft: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 300,
    // height: 300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: 70,
    justifyContent: "center",
  },
  addToCart: {
    backgroundColor: "#F08F5F",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  amount: {
    marginTop: 10,
    flexDirection: "row",
    marginLeft: 10,
    width: "100%",
    alignItems: "center",
  },
  minus: {
    padding: 5,
    backgroundColor: "#C4C4C4",
    marginLeft: 10,
  },
  add: {
    padding: 5,
    backgroundColor: "#C4C4C4",
  },
});
