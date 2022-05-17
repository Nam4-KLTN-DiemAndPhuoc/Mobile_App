import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SelectBox from "react-native-multi-selectbox";
import Toast from "react-native-root-toast";
import { useDispatch, useSelector } from "react-redux";
import { findAttributeByProductId } from "../../redux/attributeSlice";
import { addCartDetail, addCartDetailDefault } from "../../redux/cartSlice";
import { findCategoryById } from "../../redux/categorySlice";
import { findCommentByProductId } from "../../redux/commentSlice";
import { findImageByProductId } from "../../redux/imageProductSlice";
import { getProductById } from "../../redux/ProductSlice";
import { findSupplierById } from "../../redux/supplierSlice";

export default function AdvertisementItem({ item }) {
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [attributeSelected, setAttributeSelected] = useState({});
  const [amount, setAmount] = useState(1);
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

  const openModal = () => {
    setModalVisible(true);
  };

  const addCartDetaill = () => {
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
    <>
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
            <TouchableOpacity style={styles.btnBuy} onPress={() => openModal()}>
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
                onPress={() => addCartDetaill()}
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
    </>
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
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#C4C4C4",
    borderRadius: 20,
    maxWidth: 200,
    textAlign: "center",
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
    marginTop: 50,
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
