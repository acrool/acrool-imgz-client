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
export const interceptorsResponseReject: IAxiosInterceptorResponseUse['onRejected'] = (error) => {
    return Promise.reject(getSystemError(error.response));
};
