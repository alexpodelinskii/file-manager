import * as fileSyst from "./fileSyst.js";
import path from "path";
import { showMsgFailOperation } from "./share.js";
import fs from 'fs/promises'

export function upToDirr(currentPath) {
    return path.dirname(currentPath);
}

export async function changeDirr(currDir, destDir) {
    let dir = currDir;
    const newDir = path.resolve(currDir, destDir.trim());

    await fileSyst.isCorrectPath(newDir)
        .then((resolve) => { dir = newDir })
        .catch((err) => {
            showMsgFailOperation('wrong path');
        })
    return dir;
}
export function logListFiles(dir) {
    return fs.readdir(dir)
        .then((res) => {
            console.log(res);
        })

}