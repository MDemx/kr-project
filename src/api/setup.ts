import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://0.0.0.0:80/',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});
