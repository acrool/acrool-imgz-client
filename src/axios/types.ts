import {AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from 'axios';


interface AxiosError <T, D>{
    message: string
    code: string
    config: InternalAxiosRequestConfig<D>
    request: any
    response: AxiosResponse<T, D>
}

// 自定義參數傳送給攔截器使用
export type TCustomInternalAxiosRequestConfig = InternalAxiosRequestConfig & IFetchOptions;
export type TCustomAxiosRequestConfig = AxiosRequestConfig & IFetchOptions;

export interface IAxiosInterceptorResponseUse<V = AxiosResponse<IResponseBody>> {
    onFulfilled: (value: V) => V | Promise<V>
    onRejected: (error: any) => any
}


export interface IAxiosInterceptorRequestUse<V = TCustomInternalAxiosRequestConfig> {
    onFulfilled: (value: V) => V | Promise<V>
}


export interface IResponseBody<D = any> {
    data: D
    message?: string
    code?: string
    statusType: string
    formMessage?: unknown
}


export interface IApiResponseBody<D = any> {
    body: IResponseBody<D>
    ok: boolean
}

export type IRequestPaginateMeta = {
    currentPage: number,
    pageLimit: number,
    sortBy?: string,
    sortField?: 'DESC'|'ASC',
};



export interface IFetchOptions extends AxiosRequestConfig{
    requestCode?: string
    ignoreAuth?: boolean
    ignoreLocale?: boolean
    leastTime?: number // 毫秒
}
