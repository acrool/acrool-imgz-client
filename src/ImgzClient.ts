import axios, {AxiosInstance} from 'axios';
import {TFormat} from './types';
import {base64ToBlob, base64ToBlobWithContentType} from '@acrool/js-utils/convert';
import {interceptorsResponseFulfilled, interceptorsResponseReject} from './axios/interceptors';
import {createAxiosInstance} from './axios/config';
import fs from "fs";

// 壓縮選項介面
interface SquashOptions {
    resize?: { width: number };
    quality?: number;
    timeout?: number;
}

class ImgzClient {
    private result: any;
    private axiosInstance: AxiosInstance;

    constructor(baseURL?: string) {
        this.axiosInstance = createAxiosInstance(baseURL);
    }


    private poster = (format: TFormat, data: any) => {
        return this.axiosInstance({
            // url: `/api/squash/${format}/download`,
            url: `/api/squash/${format}`,
            data,
            responseType: 'arraybuffer',
            // responseType: 'blob',
            // responseType: 'json',
        });
    };

    private downloadPoster = (format: TFormat, data: any) => {
        return this.axiosInstance({
            // url: `/api/squash/${format}/download`,
            url: `/api/squash/${format}/download`,
            data,
            // responseType: 'arraybuffer',
            responseType: 'blob',
            // responseType: 'json',
        });
    };

    // 判斷是否運行在 Node.js 環境
    private isNode() {
        return typeof process !== 'undefined' && process.versions != null && process.versions.node != null;
    }

    // 壓縮邏輯拆分為前端和後端
    private async squashImageFrontEnd(
        format: TFormat,
        sourceFile: File,
        options?: SquashOptions
    ): Promise<this> {
        const requestData = {
            ...options,
            sourceFile,
        };

        const response = await this.downloadPoster(format, requestData);

        this.result = response.data;
        return this;
    }

    private async squashImageNode(
        format: TFormat,
        originFile: string,
        options?: SquashOptions
    ): Promise<this> {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const fs = require('fs');
        // const sourceFile = fs.readFileSync(originFile); // 後端讀取檔案為 Buffer

        const requestData = {
            ...options,
            sourceFile: fs.createReadStream(originFile),
        };

        const response = await this.poster(format, requestData);

        this.result = Buffer.from(response.data, 'binary');
        return this;
    }

    // 根據環境選擇調用前端或後端壓縮邏輯
    private async squashImage(
        format: TFormat,
        originFile: string | File,
        options?: SquashOptions
    ): Promise<this> {
        if (this.isNode()) {
            // 後端 (Node.js) 環境
            if (typeof originFile !== 'string') {
                throw new Error('Node.js 環境中，originFile 應該是檔案路徑 (string)');
            }
            return await this.squashImageNode(format, originFile, options);
        } else {
            // 前端瀏覽器環境
            if (!(originFile instanceof File)) {
                throw new Error('前端環境中，originFile 應該是 File 類型');
            }
            return await this.squashImageFrontEnd(format, originFile, options);
        }
    }

    // 前端和後端共用的圖片格式壓縮方法
    public async squashWebp(originFile: string | File, options?: SquashOptions): Promise<this> {
        return await this.squashImage('webp', originFile, options);
    }

    public async squashJpg(originFile: string | File, options?: SquashOptions): Promise<this> {
        return await this.squashImage('jpg', originFile, options);
    }

    public async squashPng(originFile: string | File, options?: SquashOptions): Promise<this> {
        return await this.squashImage('png', originFile, options);
    }

    // 後端：儲存結果到檔案系統 (僅 Node.js 環境可用)
    public async toSave(outputFilePath: string): Promise<void> {
        if (this.isNode()) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const fs = require('fs');
            if (!this.result) throw new Error('無可用的圖片結果');

            const writer = fs.createWriteStream(outputFilePath);
            writer.write(this.result);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        } else {
            throw new Error('toSave 僅支援在 Node.js 環境中使用');
        }
    }

    // 前端：返回 Blob 格式
    public toBlob(): Blob {
        if (!this.result) throw new Error('無可用的圖片結果');
        if (!(this.result instanceof Blob)) throw new Error('結果不是 Blob 格式');
        return this.result;
    }

    // 前端：返回 Blob URL
    public toBlobUrl(): string {
        // if (!this.result) throw new Error('無可用的圖片結果');
        // if (!(this.result instanceof Blob)) throw new Error('結果不是 Blob 格式');
        // return this.result;
        // return `data:image/webp;base64,${this.result}`;
        return URL.createObjectURL(this.result);
    }

    // 後端：返回 Buffer
    public toBuffer(): Buffer {
        if (!this.result) throw new Error('無可用的圖片結果');
        if (!(this.result instanceof Buffer)) throw new Error('結果不是 Buffer 格式');
        return this.result;
    }
}

export default ImgzClient;
