
export const HTTP_BACKEND = "http://localhost:5000"
export const WS_URL = "ws://localhost:8080";

import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL : HTTP_BACKEND
})