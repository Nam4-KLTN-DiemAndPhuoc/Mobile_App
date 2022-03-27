import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addCartDetail,
  clearCartDetailDefault,
  getCart,
} from "../../redux/cartSlice";

export default function CartScreen() {
  const { cartDetails, cartDetailsDefault } = useSelector(
    (state) => state.cart
  );
  const { user, token } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(token);
  console.log(cartDetails);
  console.log("=============================", cartDetailsDefault);

  // useEffect(() => {
  //   // if (user && cartDetailsDefault.length > 0) {
  //   //   console.log("Vào Đayyyyyyyyyyyyyyyy");
  //   //   cartDetailsDefault.map((cartDetail) => {
  //   //     console.log(cartDetail);
  //   //     const data = {
  //   //       amount: cartDetail.amount,
  //   //       cart: cart,
  //   //       productId: cartDetail.product.id,
  //   //     };
  //   //     dispatch(addCartDetail(data));
  //   //   });
  //   //   dispatch(clearCartDetailDefault());
  //   // }
  // }, [dispatch]);

  return (
    <View>
      <Text>Cart</Text>
    </View>
  );
}
