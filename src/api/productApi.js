import axiosClient from "./axiosClient";

const productApi = {
  getAll: (data) => {
    const { page, limit } = data;
    const url = `product-service/product?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  getById: (id) => {
    const url = `product-service/product/${id}`;
    return axiosClient.get(url);
  },
  findByName: (data) => {
    const { name, page, limit } = data;
    const url = `product-service/product/search?name=${name}&page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  getTop3: () => {
    const url = `product-service/product/top3`;
    return axiosClient.get(url);
  },
  findBySupplier: (params) => {
    const { id, page, limit } = data;
    const url = `product-service/product/supplier/${id}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  findByCategory: (params) => {
    const { id, page, limit } = data;
    const url = `product-service/product/category/${id}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  findByCategoryAndName: (params) => {
    const { id, name, page, limit } = data;
    const url = `product-service/product/category/${id}/${name}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
};

export default productApi;