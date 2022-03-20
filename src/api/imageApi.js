import axiosClient from "./axiosClient";

const imageApi = {
  getByProductId: (id) => {
    const url = `product-service/image/product/${id}`;
    return axiosClient.get(url);
  },
};
export default imageApi;
