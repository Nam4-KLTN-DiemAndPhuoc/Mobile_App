import axiosClient from "./axiosClient";

const attributeApi = {
  findByproductId: (id) => {
    const url = `product-service/attribute/product/${id}`;
    return axiosClient.get(url);
  },
};

export default attributeApi;
