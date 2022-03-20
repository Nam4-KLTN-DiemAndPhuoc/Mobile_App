import axiosClient from "./axiosClient";

const supplierApi = {
  findById: (id) => {
    const url = `supplier-service/supplier/${id}`;
    return axiosClient.get(url);
  },
};
export default supplierApi;
