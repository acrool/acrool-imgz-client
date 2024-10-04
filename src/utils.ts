import * as fs from 'node:fs';
import {Readable} from 'stream';

/**
 * 儲存檔案
 * @param saveResult
 * @param saveToPath
 */
export const saveFileWithBuffer = async (saveResult: ArrayBuffer, saveToPath: string) => {
    try {
        const buffer = Buffer.from(saveResult);
        fs.writeFileSync(saveToPath, buffer);

    } catch (error) {
        console.log('Error downloading file:', error);
        throw error;
    }
};

/**
 * 儲存檔案
 * @param saveResult
 * @param saveToPath
 * @param resolve
 * @param reject
 */
export const saveFileWithStream = async (saveResult: Readable, saveToPath: string, resolve: (value: string) => void, reject: (value: any) => void) => {
    try {
        return saveResult
            .pipe(fs.createWriteStream(saveToPath))
            .on('finish', () => resolve(saveToPath))
            .on('error', (e: any) => reject(e));

    } catch (error) {
        console.log('Error downloading file:', error);
        throw error;
    }
};
