import {AxiosResponse} from 'axios';
import {ISquashOptions, TFormat} from '../types';
import * as fs from 'node:fs';
import {Readable} from 'stream';


export interface IAxiosInterceptorResponseUse<V = AxiosResponse<IApiResponse>> {
    onFulfilled: (value: V) => V | Promise<V>
    onRejected: (error: any) => any
}



export interface IApiResponse<D = any> {
    data: D
}


export interface IData extends ISquashOptions {
    sourceFile: File|Readable;
}



export interface ISquashResult {
    originalPath: string
    originalSizeKB: number
    resultPath: string
    resultSizeKB: number
    squashRate: number
}

export type TResponseType = 'blob'|'arraybuffer'|'stream';


export interface IAxiosInstanceOptions {
    timeout?: number
}
export interface IAxiosInstanceMethod {
    squashUploader: (format: TFormat, data: IData) => Promise<IApiResponse<ISquashResult>>,
    squashWithBlob: (format: TFormat, data: IData) => Promise<IApiResponse<Blob>>,
    squashWithArrayBuffer: (format: TFormat, data: IData) => Promise<IApiResponse<ArrayBuffer>>,
    squashWithStream: (format: TFormat, data: IData) => Promise<IApiResponse<Readable>>,
}
