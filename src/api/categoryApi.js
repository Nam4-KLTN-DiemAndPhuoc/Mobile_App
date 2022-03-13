import axiosClient from "./axiosClient";

const categoryApi ={
    getAllCategory: ()=>{
        const url="category-service/category"
        return axiosClient.get(url);
    }
}

export default categoryApi