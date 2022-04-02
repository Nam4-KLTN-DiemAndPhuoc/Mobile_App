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
  deleteCartDetail: (data) => {
    const url = `cart-service/cart-detail/delete/${data}`;
    return axiosClient.post(url);
  },
  updateCartDetail: (data) => {
    const url = `cart-service/cart-detail/update`;
    return axiosClient.post(url, data);
  },
};

export default cartApi;
