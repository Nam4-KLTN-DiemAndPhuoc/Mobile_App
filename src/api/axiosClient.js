import axios from "axios";
import queryString from "query-string";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

const REACT_APP_API_URL = "http://165.22.105.148:9191/api/";

const axiosClient = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  console.log("TKKK", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    AsyncStorage.removeItem("token");
    Toast.show("Đã có lỗi xảy ra !!", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      containerStyle: {
        backgroundColor: "#C4C4C4",
        borderRadius: 200,
        marginBottom: 300,
        paddingHorizontal: 20,
        shadowColor: "#e6e6e6",
        shadowOpacity: 0.5,
      },
      textStyle: { color: "#000", fontWeight: "bold" },
    });
    throw error;
  }
);
export default axiosClient;
