import {TFormat} from './types';
import {createAxiosInstance, IAxiosInstanceMethod} from './fetcher';
import {ISquashOptions} from './types';


class ImgzClient {
    private axiosInstance: IAxiosInstanceMethod;

    constructor(baseURL?: string) {
        this.axiosInstance = createAxiosInstance(baseURL);
    }

    private async squashImage(
        format: TFormat,
        sourceFile: File,
        options?: ISquashOptions
    ) {
        const requestData = {
            ...options,
            sourceFile,
        };
        const response = await this.axiosInstance.squashWithBlob(format, requestData);
        return URL.createObjectURL(response.data);
    }


    /**
     * 轉成 Webp
     * @param originFile
     * @param options
     */
    public async squashWebp(originFile: File, options?: ISquashOptions) {
        return await this.squashImage('webp', originFile, options);
    }

    /**
     * 轉成 Jpg
     * @param originFile
     * @param options
     */
    public async squashJpg(originFile: File, options?: ISquashOptions) {
        return await this.squashImage('jpg', originFile, options);
    }

    /**
     * 轉成 Png
     * @param originFile
     * @param options
     */
    public async squashPng(originFile: File, options?: ISquashOptions) {
        return await this.squashImage('png', originFile, options);
    }
}

export default ImgzClient;
