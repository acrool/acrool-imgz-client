import axios, {InternalAxiosRequestConfig} from 'axios';
import {interceptorsResponseFulfilled, interceptorsResponseReject} from "./interceptors";


export const requestHeader = {
    formData: {'Content-Type': 'multipart/form-data'},
    formUrlDecode: {'Content-Type': 'application/x-www-form-urlencoded'},  // 需加 qs.stringify()
    json: {'Content-Type': 'application/json'},
};

export const createAxiosInstance = (baseURL?: string, timout?: number) => {
    const axiosInstance = axios.create({
        baseURL,
        method: 'POST',
        headers: {
            ...requestHeader.formData,
            'Cache-Control': 'no-cache',
            'X-Requested-With': 'XMLHttpRequest',
            // Extend Headers...
        },
        timeout: timout ?? 1200 * 1000,
    });

    axiosInstance.interceptors.response.use(interceptorsResponseFulfilled, interceptorsResponseReject);

    return axiosInstance;
};
