import {AxiosResponse} from 'axios';

import {SystemException} from '../exception';

// 後端必須新增
import FormData from 'form-data';
import * as fs from 'node:fs';





/**
 * 返回 System 格式錯誤
 * @param response
 */
export const getSystemError = (response: AxiosResponse) => {
    const firstError = response?.data;
    return new SystemException({
        message: firstError?.message ?? response.statusText,
        code: firstError?.statusCode ?? `HTTP_CODE_${response.status}`,
        // path: firstError?.path
    });
};



/**
 * 將物件資料轉成 FormData
 *
 * 布林會自動轉成字串
 * file 需要支援 File, Readable 型別
 *
 * ex: {
 *     profile: {name: 'jack'}
 * }
 *
 * @param data
 */
export function objToFormData(data: { [key: string]: any }): FormData {
    const formData = new FormData();

    const appendData = (whileData: any, parentKey = '') => {
        
        for (const [key, value] of Object.entries(whileData)) {
            const formKey = parentKey ? `${parentKey}[${key}]` : key;

            if (Array.isArray(value)) {
                value.forEach((item, index) => {
                    if (typeof item === 'object' && item !== null) {
                        appendData(item, `${formKey}[${index}]`);
                    } else {
                        formData.append(`${formKey}[${index}]`, formatValue(item));
                    }
                });
            } else if (typeof value === 'object' && value !== null) {
                // 檢查是否為 File 或 Readable
                if(typeof File !== 'undefined' && value instanceof File){
                    formData.append(formKey, new Blob(value as any));

                } else if (typeof fs.ReadStream !== 'undefined' && value instanceof fs.ReadStream) {
                    formData.append(formKey, value);

                } else {
                    appendData(value, formKey);
                }
            } else if (value !== undefined && value !== null) {
                formData.append(formKey, formatValue(value));
            }
        }
    };

    // 處理布林值和其他基本類型
    const formatValue = (value: any) => {
        if (typeof value === 'boolean') {
            return value.toString();  // 布林值轉成字串
        }
        return value;
    };

    appendData(data);

    return formData;
}
