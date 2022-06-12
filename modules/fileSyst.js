import fs from 'fs/promises'
import { createReadStream } from 'fs'
import path from "path";
import { showMsgFailOperation } from './share.js';


export function createFile(pathToFile) {
    fs.writeFile(pathToFile, '')
        .then(() => {
            console.log('The file was create');
        })
        .catch(() => {
            showMsgFailOperation(`can't create file`);
        })
}
export function renameFile(dir, arr) {
    const [sorceFfilePath, targetFileName] = arr.slice(1);
    const sorce = path.resolve(dir, sorceFfilePath);
    const targetDirr = path.dirname(sorce);
    const target = path.resolve(targetDirr, targetFileName);
    fs.rename(sorce, target)
        .then(() => {
            console.log('Rename complete');
        })
        .catch(() => {
            showMsgFailOperation(`can't rename file`)
        })
}
export async function ReadFile(pathToFile) {
    let content = '';

    await isCorrectPath(pathToFile)
        .then(async () => {
            const fd = await fs.open(pathToFile)
            await new Promise((resolve, reject) => {

                fd.createReadStream()
                    .on('data', data => content += data)
                    .on('end', () => {
                        console.log(content.toString());
                        resolve()
                    })
            });
        })
        .catch((err) => {
            showMsgFailOperation('file not found');
        })
}

export function logListFiles(dir) {
    return fs.readdir(dir)
        .then((res) => {
            console.log(res);
        })

}
export function isCorrectPath(path) {
    return fs.access(path)
}

export function copyFile(arr) {
    const [sorce, target] = arr.slice(1);
    fs.copyFile(path.resolve(dir, sorce), path.resolve(dir, target))
        .then(() => {
            console.log('The file copied');
        })
        .catch((err) => {
            showMsgFailOperation(`wrong path`)
        })
}