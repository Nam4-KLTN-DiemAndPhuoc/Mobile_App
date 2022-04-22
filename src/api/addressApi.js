import axiosClient from "./axiosClient";

const addressApi = {
  findByUserId: (id) => {
    const url = `user-service/address/user/${id}`;
    return axiosClient.get(url);
  },
  addAddress: (data) => {
    const url = `user-service/address`;
    return axiosClient.post(url, data);
  },

  updateAddress: (data) => {
    const url = `user-service/address/update`;
    return axiosClient.post(url, data);
  },
};

export default addressApi;
