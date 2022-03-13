import axiosClient from "./axiosClient";

const supplierApi ={
    getAllSupplier: ()=>{
        const url="supplier-service/supplier"
        return axiosClient.get(url);
    }
}

export default supplierApi