import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import {
  clearListProductSearch,
  findAll,
  findAllAsc,
  findAllDesc,
  findByCategory,
  findByCategoryAndName,
  findByCategoryAndNameAsc,
  findByCategoryAndNameDesc,
  findByCategoryAsc,
  findByCategoryDesc,
  findByName,
  findByNameAsc,
  findByNameDesc,
} from "../../redux/productSearchSlice";

export default function SearchHeader({ pageSearch, categorySelect }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);
  const handleChangeText = (text) => {
    setText(text);
    setPage(1);
  };

  const [itemSelected, setItemSelected] = useState("danhmuc");

  const [itemSort, setItemSort] = useState("price");

  const { category } = useSelector((state) => state.category);
  const { cartDetails, cartDetailsDefault } = useSelector(
    (state) => state.cart
  );

  const [badge, setBadge] = useState(0);

  useEffect(() => {
    if (cartDetails?.length > 0) {
      setBadge(cartDetails?.length);
    } else {
      setBadge(cartDetailsDefault?.length);
    }
  }, [dispatch, cartDetails, cartDetailsDefault]);

  const handleSearchCategory = (itemValue) => {
    setItemSelected(itemValue);
    setPage(1);
    dispatch(clearListProductSearch());
    handleSearch(text, itemValue, 1, itemSort);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPage(1);
      dispatch(clearListProductSearch());

      handleSearch(text, itemSelected, 1, itemSort);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [text]);

  useEffect(() => {
    if (pageSearch > 1) {
      setPage(page + 1);
      console.log(text, itemSelected, page, itemSort);
      handleSearch(text, itemSelected, page, itemSort);
    }
  }, [pageSearch]);

  const handleSort = (itemValue) => {
    setPage(1);
    setItemSort(itemValue);
    dispatch(clearListProductSearch());

    handleSearch(text, itemSelected, 1, itemSort);
  };

  useEffect(() => {
    setItemSelected(categorySelect !== undefined ? categorySelect : "danhmuc");

    if (categorySelect !== undefined) {
      setPage(1);
      dispatch(clearListProductSearch());
      handleSearch(
        text,
        categorySelect !== undefined ? categorySelect : "danhmuc",
        1,
        itemSort
      );
    }

    return function cleanup() {};
  }, [categorySelect]);

  const handleSearch = (valueSearch, category, page, itemSort) => {
    if (valueSearch === "" && category === "danhmuc" && itemSort === "price") {
      console.log(1);
      const data = {
        page: page,
        limit: 10,
      };
      dispatch(findAll(data));
    } else if (
      valueSearch !== "" &&
      category === "danhmuc" &&
      itemSort === "price"
    ) {
      console.log(2);
      const data = {
        name: valueSearch,
        page: page,
        limit: 10,
      };
      dispatch(findByName(data));
    } else if (
      valueSearch === "" &&
      category !== "danhmuc" &&
      itemSort === "price"
    ) {
      console.log(3);
      const data = {
        id: category,
        page: page,
        limit: 10,
      };
      dispatch(findByCategory(data));
    } else if (
      valueSearch !== "" &&
      category !== "danhmuc" &&
      itemSort === "price"
    ) {
      console.log(4);
      const data = {
        id: category,
        name: valueSearch,
        page: page,
        limit: 10,
      };
      dispatch(findByCategoryAndName(data));
    } else if (
      valueSearch === "" &&
      category === "danhmuc" &&
      itemSort !== "price"
    ) {
      console.log(5);
      const data = {
        page: page,
        limit: 10,
      };

      if (itemSort === true) {
        dispatch(findAllAsc(data));
      } else {
        dispatch(findAllDesc(data));
      }
    } else if (
      valueSearch !== "" &&
      category === "danhmuc" &&
      itemSort !== "price"
    ) {
      console.log(6);
      const data = {
        name: valueSearch,
        page: page,
        limit: 10,
      };

      if (itemSort === true) {
        dispatch(findByNameAsc(data));
      } else {
        dispatch(findByNameDesc(data));
      }
    } else if (
      valueSearch === "" &&
      category !== "danhmuc" &&
      itemSort !== "price"
    ) {
      console.log(7);
      const data = {
        id: category,
        page: page,
        limit: 10,
      };

      if (itemSort === true) {
        dispatch(findByCategoryAsc(data));
      } else {
        dispatch(findByCategoryDesc(data));
      }
    } else if (
      valueSearch !== "" &&
      category !== "danhmuc" &&
      itemSort !== "price"
    ) {
      console.log(8);
      const data = {
        id: category,
        name: valueSearch,
        page: page,
        limit: 10,
      };

      if (itemSort === true) {
        dispatch(findByCategoryAndNameAsc(data));
      } else {
        dispatch(findByCategoryAndNameDesc(data));
      }
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            onChangeText={(text) => handleChangeText(text)}
            value={text}
            style={styles.textInput}
            placeholder="Tìm kiếm"
          />
          <TouchableOpacity style={styles.cart}>
            <Ionicons
              style={styles.iconCart}
              name="ios-cart-outline"
              size={24}
              color="#fff"
            />
            <Text style={styles.badge}> {badge == 0 ? "" : badge} </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.filter}>
        <View style={styles.filterPrice}>
          <Picker
            selectedValue={itemSort}
            onValueChange={(itemValue, itemIndex) => {
              handleSort(itemValue);
            }}
          >
            <Picker.Item style={styles.textItem} label="Giá" value="price" />
            <Picker.Item
              style={styles.textItem}
              label="Giảm dần"
              value={true}
            />
            <Picker.Item
              style={styles.textItem}
              label="Tăng dần"
              value={false}
            />
          </Picker>
        </View>
        <View style={styles.filterSupplier}>
          <Picker
            selectedValue={itemSelected}
            onValueChange={(itemValue, itemIndex) =>
              handleSearchCategory(itemValue)
            }
          >
            <Picker.Item
              style={styles.textItem}
              label="Danh mục"
              value="danhmuc"
            />
            {category?.map((item, index) => (
              <Picker.Item
                style={styles.textItem}
                key={index + item.id}
                label={item.name}
                value={item.id}
              />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F08F5F",
  },
  search: {
    flexDirection: "row",
    marginTop: "15%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInput: {
    height: 40,
    marginLeft: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 20,
    width: "80%",
    backgroundColor: "#C4C4C4",
  },
  iconCart: {
    marginRight: 20,
  },
  filter: {
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
  badge: {
    position: "absolute",
    top: -1,
    right: 10,
    padding: 3,
    borderRadius: 20,
    backgroundColor: "#fff",
    color: "red",
    fontWeight: "bold",
  },
  cart: {
    justifyContent: "center",

    height: 50,
  },
});
