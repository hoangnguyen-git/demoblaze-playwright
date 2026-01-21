import fs from 'fs';
import { rimrafSync } from 'rimraf';

export class Utility {
    /**
     * Create a folder
     * @param folderPath
     */
    static makeDir(folderPath: string): void {
        fs.mkdir(folderPath, { recursive: true }, (err: any) => {
            if (err) {
                console.log(err);
            }
        });
    }

    /**
     * Delete file
     * @param filePath
     */
    static deleteFile(filePath: string): void {
        console.log(`Delete file: ${filePath}`);
        try {
            rimrafSync(filePath);
        } catch (error: any) {
            console.log(error);
        }
    }

    /**
     * Get random number
     * @param min
     * @param max
     * @returns
     */
    static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generate random string of specified length
     * @param length
     * @returns
     */
    static generateRandomString(length: number): string {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    /**
     * Encrypt password using SHA256
     * @param password
     * @returns
     */
    static encodePassword(password: string): string {
        return Buffer.from(password).toString('base64');
    }
}
