import axiosClient from "./axiosClient";

const athApi = {
  login: (data) => {
    const url = `user-service/auth/login`;
    return axiosClient.post(url, data);
  },
  regiter: (data) => {
    const url = `user-service/auth/register`;
    return axiosClient.post(url, data);
  },
  refreshToken: () => {
    const url = `user-service/auth/refreshToken`;
    return axiosClient.post(url);
  },
  sendOTP: (data) => {
    const url = `user-service/auth/generateOTP`;
    return axiosClient.post(url, data);
  },
  sendOTPRegister: (data) => {
    const url = `user-service/auth/generateOTP-regíter`;
    return axiosClient.post(url, data);
  },
  validateOTP: (data) => {
    const url = `user-service/auth/validateOTP`;
    return axiosClient.post(url, data);
  },
  changePassword: (data) => {
    const url = `user-service/auth/change-password`;
    return axiosClient.post(url, data);
  },
  updateUser: (data) => {
    const url = `user-service/user/update`;
    return axiosClient.post(url, data);
  },
  uploadFile: (data) => {
    const url = `user-service/auth/upload`;
    return axiosClient.post(url, data);
  },
  generateUploadURL: (data) => {
    const url = `user-service/auth/generateUploadURL?name=$${
      data.split(".")[0]
    }`;

    return axiosClient.get(url);
  },
};
export default athApi;
