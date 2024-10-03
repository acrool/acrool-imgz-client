import * as fs from 'fs';

/**
 * 儲存檔案
 * @param saveResult
 * @param saveToPath
 */
export const saveFile = async (saveResult: ArrayBuffer, saveToPath: string) => {
    try {
        const buffer = Buffer.from(saveResult);
        fs.writeFileSync(saveToPath, buffer);

    } catch (error) {
        console.log('Error downloading file:', error);
        throw error;
    }
};
