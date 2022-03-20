import axiosClient from "./axiosClient";

const commentApi = {
  findByProductId: (id) => {
    const url = `comment-service/auth/product/${id}`;
    return axiosClient.get(url);
  },
};

export default commentApi;
