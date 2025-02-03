import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: 'https://dummyjson.com/auth',
    headers: {}
});

export type loginData = {
    username: string;
    password: string;
    expiresInMins: number;
};


