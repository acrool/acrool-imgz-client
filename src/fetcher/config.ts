import axios from 'axios';
import {interceptorsResponseFulfilled, interceptorsResponseReject} from './interceptors';
import {TFormat} from '../types';
import {IApiResponse, IAxiosInstanceMethod, IAxiosInstanceOptions, IData, ISquashResult, TResponseType} from './types';
import {Readable} from 'stream';
import {objToFormData} from './utils';


export const requestHeader = {
    formData: {'Content-Type': 'multipart/form-data'},
    formUrlDecode: {'Content-Type': 'application/x-www-form-urlencoded'},  // 需加 qs.stringify()
    json: {'Content-Type': 'application/json'},
};

export const createAxiosInstance = (baseURL?: string, options?: IAxiosInstanceOptions) => {
    const axiosInstance = axios.create({
        baseURL,
        method: 'POST',
        headers: {
            ...requestHeader.formData,
            'Cache-Control': 'no-cache',
            'X-Requested-With': 'XMLHttpRequest',
            // Extend Headers...
        },
        timeout: options?.timeout ?? 1200 * 1000,
    });

    axiosInstance.interceptors.response.use(interceptorsResponseFulfilled, interceptorsResponseReject);

    /**
     * 處理圖片 並儲存於伺服器
     * 回傳圖片處理結果 (不會將圖片本身回傳)
     * @param format
     * @param data
     */
    const squashUploader: IAxiosInstanceMethod['squashUploader'] = (format, data) => {
        return axiosInstance({
            url: `/api/squash/${format}/upload`,
            data: objToFormData(data),
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
            data: objToFormData(data),
            responseType,
        });
    };

    /**
     * 處理圖片 並儲存於伺服器
     * 回傳圖片處理結果 (不會將圖片本身回傳)
     * @param format
     * @param data
     */
    const squashWithBlob: IAxiosInstanceMethod['squashWithBlob'] = (format, data) => {
        return squash<Blob>(format, data, 'blob');
    };

    /**
     * 處理圖片 並儲存於伺服器
     * 回傳圖片處理結果 (不會將圖片本身回傳)
     * @param format
     * @param data
     */
    const squashWithArrayBuffer: IAxiosInstanceMethod['squashWithArrayBuffer'] = (format, data) => {
        return squash<ArrayBuffer>(format, data, 'arraybuffer');
    };

    /**
     * 處理圖片 並儲存於伺服器
     * 回傳圖片處理結果 (不會將圖片本身回傳)
     * @param format
     * @param data
     */
    const squashWithStream: IAxiosInstanceMethod['squashWithStream'] = (format, data) => {
        return squash<Readable>(format, data, 'stream');
    };

    return {
        squashUploader,
        squashWithBlob,
        squashWithArrayBuffer,
        squashWithStream,
    };
};
