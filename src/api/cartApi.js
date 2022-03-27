import axiosClient from "./axiosClient";

const cartApi = {
  getByUser: (id) => {
    const url = `cart-service/cart/user/${id}`;
    return axiosClient.get(url);
  },

  getCartDetail: (id) => {
    const url = `cart-service/cart-detail/cart/${id}`;
    return axiosClient.get(url);
  },

  addCartDetail: (data) => {
    const url = `cart-service/cart-detail`;
    return axiosClient.post(url, data);
  },
};

export default cartApi;
