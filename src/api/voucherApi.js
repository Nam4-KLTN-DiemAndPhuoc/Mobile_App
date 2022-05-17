import axiosClient from "./axiosClient";

const voucherApi = {
  findVoucherByCode: (data) => {
    const url = `/voucher-service/auth/voucher?code=${data}`;
    return axiosClient.get(url);
  },

  useVoucher: (data) => {
    const url = `/voucher-service/auth/use-voucher`;
    return axiosClient.post(url, data);
  },
};
export default voucherApi;
