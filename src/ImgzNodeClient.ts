import {createAxiosInstance, IAxiosInstanceMethod} from './fetcher';
import {ISquashOptions, TFormat} from './types';
import * as fs from 'fs';
import {saveFile} from './utils';


class ImgzClient {
    private axiosInstance: IAxiosInstanceMethod;

    constructor(baseURL?: string) {
        this.axiosInstance = createAxiosInstance(baseURL);
    }

    private async squashImage(
        format: TFormat,
        sourceFilePath: string,
        options?: ISquashOptions
    ) {
        const requestData = {
            ...options,
            sourceFile: fs.createReadStream(sourceFilePath),
        };

        const response = await this.axiosInstance.squashWithArrayBuffer(format, requestData);
        
        return {
            save: (saveToPath: string) => saveFile(response.data, saveToPath)
        };
    }



    /**
     * 轉成 Webp
     * @param sourceFilePath
     * @param options
     */
    public async squashWebp(sourceFilePath: string, options?: ISquashOptions) {
        return await this.squashImage('webp', sourceFilePath, options);
    }

    /**
     * 轉成 Jpg
     * @param sourceFilePath
     * @param options
     */
    public async squashJpg(sourceFilePath: string, options?: ISquashOptions) {
        return await this.squashImage('jpg', sourceFilePath, options);
    }

    /**
     * 轉成 Png
     * @param sourceFilePath
     * @param options
     */
    public async squashPng(sourceFilePath: string, options?: ISquashOptions) {
        return await this.squashImage('png', sourceFilePath, options);
    }
   
}

export default ImgzClient;
