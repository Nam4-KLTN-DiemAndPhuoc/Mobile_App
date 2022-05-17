import axiosClient from "./axiosClient";

const commentApi = {
  findByProductId: (id) => {
    const url = `comment-service/auth/product/${id}`;
    return axiosClient.get(url);
  },
  addComment: (data) => {
    const url = `comment-service/comment`;
    return axiosClient.post(url, data);
  },
};

export default commentApi;
