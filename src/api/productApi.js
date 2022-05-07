import axiosClient from "./axiosClient";

const productApi = {
  getAll: (data) => {
    const { page, limit } = data;
    const url = `product-service/product?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  getAllAsc: (data) => {
    const { page, limit } = data;
    const url = `product-service/product/asc?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  getAllDesc: (data) => {
    const { page, limit } = data;
    const url = `product-service/product/desc?page=${page}&limit=${limit}`;
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

  findByNameAsc: (data) => {
    const { name, page, limit } = data;
    const url = `product-service/product/search/asc?name=${name}&page=${page}&limit=${limit}`;
    console.log(url);
    return axiosClient.get(url);
  },

  findByNameDesc: (data) => {
    const { name, page, limit } = data;
    const url = `product-service/product/search/desc?name=${name}&page=${page}&limit=${limit}`;
    console.log(url);
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
  findByCategory: (data) => {
    const { id, page, limit } = data;
    const url = `product-service/product/category/${id}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  findByCategoryAsc: (data) => {
    const { id, page, limit } = data;
    const url = `product-service/product/category/asc/${id}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  findByCategoryDesc: (data) => {
    const { id, page, limit } = data;
    const url = `product-service/product/category/desc/${id}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  findByCategoryAndName: (data) => {
    const { id, name, page, limit } = data;
    const url = `product-service/product/category/${id}/${name}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  findByCategoryAndNameAsc: (data) => {
    const { id, name, page, limit } = data;
    const url = `product-service/product/category/asc/${id}/${name}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
  findByCategoryAndNameDesc: (data) => {
    const { id, name, page, limit } = data;
    const url = `product-service/product/category/desc/${id}/${name}?page=${page}&limit=${limit}`;
    return axiosClient.get(url);
  },
};

export default productApi;
