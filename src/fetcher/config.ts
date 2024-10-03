import axios from 'axios';
import {interceptorsResponseFulfilled, interceptorsResponseReject} from './interceptors';
import {TFormat} from '../types';
import {IApiResponse, IAxiosInstanceMethod, IData, ISquashResult, TResponseType} from './types';


export const requestHeader = {
    formData: {'Content-Type': 'multipart/form-data'},
    formUrlDecode: {'Content-Type': 'application/x-www-form-urlencoded'},  // 需加 qs.stringify()
    json: {'Content-Type': 'application/json'},
};

export const createAxiosInstance = (baseURL?: string, timout?: number): IAxiosInstanceMethod => {
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

    /**
     * 處理圖片 並儲存於伺服器
     * 回傳圖片處理結果 (不會將圖片本身回傳)
     * @param format
     * @param data
     */
    const squashUploader = (format: TFormat, data: IData): Promise<IApiResponse<ISquashResult>> => {
        return axiosInstance({
            url: `/api/squash/${format}/upload`,
            data,
            responseType: 'json',
        });
    };

    /**
     * 處理圖片 並儲存於伺服器
     * 回傳圖片處理結果 (不會將圖片本身回傳)
     * @param format
     * @param data
     * @param responseType
     */
    const squash = <T>(format: TFormat, data: IData, responseType: TResponseType): Promise<IApiResponse<T>> => {
        return axiosInstance({
            url: `/api/squash/${format}`,
            data,
            responseType,
        });
    };

    /**
     * 處理圖片 並儲存於伺服器
     * 回傳圖片處理結果 (不會將圖片本身回傳)
     * @param format
     * @param data
     */
    const squashWithBlob = (format: TFormat, data: IData): Promise<IApiResponse<Blob>> => {
        return squash<Blob>(format, data, 'blob');
    };

    /**
     * 處理圖片 並儲存於伺服器
     * 回傳圖片處理結果 (不會將圖片本身回傳)
     * @param format
     * @param data
     */
    const squashWithArrayBuffer = (format: TFormat, data: IData): Promise<IApiResponse<ArrayBuffer>> => {
        return squash<ArrayBuffer>(format, data, 'arraybuffer');
    };

    return {
        squashUploader,
        squashWithBlob,
        squashWithArrayBuffer,
    };
};
