import {createAxiosInstance, IAxiosInstanceMethod} from './fetcher';
import {ISquashOptions, TFormat} from './types';
import * as fs from 'fs';
import {saveFile} from './utils';
import {SystemException} from './exception';


class ImgzClient {
    private axiosInstance: IAxiosInstanceMethod;
    private sourceFile?: fs.ReadStream;
    private format?: TFormat;
    private saveOperations: Array<Promise<string>> = [];

    constructor(baseURL?: string) {
        this.axiosInstance = createAxiosInstance(baseURL);
    }


    private squashImage(
        format: TFormat,
        sourceFilePath: string,
    ) {
        this.format = format;
        this.sourceFile = fs.createReadStream(sourceFilePath);
        return this;
    }



    /**
     * 轉成 Webp
     * @param sourceFilePath
     */
    public squashWebp(sourceFilePath: string) {
        return this.squashImage('webp', sourceFilePath);
    }

    /**
     * 轉成 Jpg
     * @param sourceFilePath
     */
    public squashJpg(sourceFilePath: string) {
        return this.squashImage('jpg', sourceFilePath);
    }

    /**
     * 轉成 Png
     * @param sourceFilePath
     */
    public squashPng(sourceFilePath: string) {
        return this.squashImage('png', sourceFilePath);
    }


    /**
     * 儲存
     * @param saveFilePath
     * @param options
     */
    public toSave(
        saveFilePath: string,
        options?: ISquashOptions
    ) {

        const savePromise: Promise<string> = new Promise(async (resolve, reject): Promise<void> => {
            try {
                if(!(this.format && this.sourceFile)){
                    throw new SystemException({message: 'You must first call the squash[Format] method before calling toSave()', code: 'NO_CALL_SAVE'});
                }

                const requestData = {
                    ...options,
                    sourceFile: this.sourceFile,
                };

                const response = await this.axiosInstance.squashWithArrayBuffer(this.format, requestData);
                saveFile(response.data, saveFilePath);
                resolve(saveFilePath);

            } catch (error) {
                console.error('Error:', error);
                reject(error); // 处理错误
            }
        });

        // 保存这个操作到数组中
        console.log('this.saveOperations', this.saveOperations);
        this.saveOperations.push(savePromise);

        return this;
    }


    /**
     * 等待所有的保存操作完成
     */
    async completeAll() {
        const results = await Promise.all(this.saveOperations);
        this.saveOperations = [];
        return results;
    }

}

export default ImgzClient;
