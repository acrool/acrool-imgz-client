import * as fs from 'fs';

/**
 * 儲存檔案
 * @param saveResult
 */
export const saveFile =  (saveResult: ArrayBuffer) => {
    return async (saveToPath: string) => {
        try {
            const buffer = Buffer.from(saveResult);
            fs.writeFileSync(saveToPath, buffer);

            console.log('File saved successfully:', saveToPath);
        } catch (error) {
            console.log('Error downloading file:', error);
        }
    };
};
