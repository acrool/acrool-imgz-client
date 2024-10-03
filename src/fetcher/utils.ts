import {AxiosResponse} from 'axios';

import {SystemException} from '../exception';




/**
 * 返回 System 格式錯誤
 * @param response
 */
export const getSystemError = (response: AxiosResponse) => {
    const firstError = response.data;
    return new SystemException({
        message: firstError?.message ?? response.statusText,
        code: firstError?.statusCode ?? `HTTP_CODE_${response.status}`,
        // path: firstError?.path
    });
};

