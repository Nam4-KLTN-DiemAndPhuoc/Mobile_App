import axiosClient from "./axiosClient";

const categoryApi = {
  getAllCategory: () => {
    const url = "category-service/category";
    return axiosClient.get(url);
  },
  getById: (id) => {
    const url = `category-service/category/${id}`;
    return axiosClient.get(url);
  },
};

export default categoryApi;
