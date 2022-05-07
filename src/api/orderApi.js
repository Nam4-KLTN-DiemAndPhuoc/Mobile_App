import axiosClient from "./axiosClient";

const orderApi = {
  addOrder: (data) => {
    const url = `/order-service/order`;
    return axiosClient.post(url, data);
  },
  addOrderDetail: (data) => {
    const url = `/order-service/order-detail`;
    return axiosClient.post(url, data);
  },
  getOrdersByUser: (id) => {
    const url = `/order-service/order/user-id/${id}`;
    return axiosClient.get(url);
  },
  getOrderDetailsByOrder: (id) => {
    const url = `/order-service/order-detail/order/${id}`;
    return axiosClient.get(url);
  },
};

export default orderApi;
