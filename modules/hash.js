import crypto from "crypto";
import fs from "fs/promises";

const calculateHash = async (path) => {
    console.log(path);
    try {
        const buffer = await fs.readFile(path);
        const hash = crypto.createHash('SHA256');
        const fileHash = hash.update(buffer).digest('hex');
        console.log(fileHash);
    } catch (err) {
        throw new Error('Invalid input: file not found')
    }
};
export default calculateHash;