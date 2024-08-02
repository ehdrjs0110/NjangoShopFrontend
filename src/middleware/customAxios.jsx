import axios from "axios";
import {getToken} from "../Store/accessStore";


const axiosInstance = axios.create({
    baseURL:`http://localhost:8080/`,
    headers: {
        'Content-Type': 'application/json'
    },
});

axiosInstance.interceptors.request.use(
     (config) => {
         const accessToken = getToken();

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        console.log("위치: interceptors")
        console.log(error);
        return Promise.reject(error);
    }
)


export default axiosInstance