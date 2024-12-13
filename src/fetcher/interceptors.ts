import {IAxiosInterceptorResponseUse} from './types';
import {getSystemError} from './utils';

/**
 * 回應攔截器
 * (正常2XX)
 * @param originConfig
 */
export const interceptorsResponseFulfilled: IAxiosInterceptorResponseUse['onFulfilled'] = (originConfig) => {
    return originConfig;
};


/**
 * 回應錯誤攔截器
 * (不屬於2XX-3XX)
 * @param error
 */
export const interceptorsResponseReject: IAxiosInterceptorResponseUse['onRejected'] = async (error) => {
    const contentType = error.response?.headers['content-type'];
    const responseType = error.config.responseType;
    if (responseType === 'stream' && contentType && contentType.includes('application/json')) {
        // 將流轉換為 JSON
        const chunks = [];
        for await (const chunk of error.response.data) {
            chunks.push(chunk);
        }
        const errorJson = JSON.parse(Buffer.concat(chunks).toString());

        return Promise.reject(getSystemError(
            {...error.response, data: errorJson},
        ));
    }
    return Promise.reject(getSystemError(error.response));
};
