import * as fs from 'fs';
import Logger from '@acrool/js-logger';

/**
 * 儲存檔案
 * @param saveResult
 */
export const saveFile =  (saveResult: ArrayBuffer) => {
    return async (saveToPath: string) => {
        try {
            const buffer = Buffer.from(saveResult);
            fs.writeFileSync(saveToPath, buffer);

        } catch (error) {
            Logger.danger('Error downloading file:', error);
        }
    };
};
