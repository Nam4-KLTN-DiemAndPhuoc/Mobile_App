import axiosClient from "./axiosClient";

const athApi = {
  getUserById: (id) => {
    const url = `user-service/user/${id}`;
    return axiosClient.get(url);
  },
  regiter: (data) => {
    const url = `user-service/user`;
    return axiosClient.post(url, data);
  },
};
export default athApi;
