import {IAxiosInterceptorResponseUse} from './types';
import {getSystemError} from './utils';

/**
 * 回應攔截器
 * (正常2XX)
 * @param originConfig
 */
export const interceptorsResponseFulfilled: IAxiosInterceptorResponseUse['onFulfilled'] = (originConfig) => {
    // 後端沒有使用 http status 作為錯誤識別，而是由 data.statusType，所以要手動判斷
    if(originConfig.data?.statusType === 'error'){
        return Promise.reject(getSystemError(originConfig));
    }

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
