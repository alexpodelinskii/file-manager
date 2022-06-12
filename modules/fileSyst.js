import fs from 'fs/promises'
import { createReadStream, createWriteStream, rm } from 'fs'
import path, { join } from "path";
import { showMsgFailOperation } from './share.js';


export async function createFile(pathToFile) {
    const dirname = path.dirname(pathToFile);

    await isCorrectPath(dirname)
        .catch(async () => {
            await createDir(dirname)
        });
    const stream = createWriteStream(pathToFile)
    stream.write('')
    stream.on('error', () => {
        showMsgFailOperation(`can't create file`)
    })
    console.log('The file was create');
    stream.close()
}

export async function renameFile(dir, arr) {
    const [sorceFfilePath, targetFileName] = arr.slice(1);
    const sorce = path.resolve(dir, sorceFfilePath);
    const targetDirr = path.dirname(sorce);
    const target = path.resolve(targetDirr, targetFileName);

    const read = createReadStream(sorce);
    const write = createWriteStream(target);

    await new Promise((resolve, reject) => {
        const stream = read.pipe(write);

        stream.on('finish', () => {
            console.log('Rename complete');
            resolve()
        });
    });
    await removeFile(sorce);
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


export function isCorrectPath(path) {
    return fs.access(path)
}

export async function copyFile(dir, arr) {
    let [sorce, targetDirr] = arr.slice(1);
    sorce = path.resolve(dir, sorce)
    await isCorrectPath(sorce)
        .then(async () => {
            targetDirr = path.resolve(dir, targetDirr)
            if (path.extname(targetDirr) !== '') {
                targetDirr = removeExt(targetDirr);
            }

            const fileName = path.basename(sorce);
            const target = path.join(targetDirr, fileName)
            await isCorrectPath(targetDirr)
                .catch(async () => {
                    await createDir(targetDirr)

                })
            await isCorrectPath(targetDirr)
                .catch(async () => {


                })
            const read = createReadStream(sorce);
            const write = createWriteStream(target);
            await new Promise((resolve, reject) => {
                const stream = read.pipe(write);

                stream.on('finish', () => {
                    console.log('The file copied');
                    resolve()
                });
            });

        })
        .catch((err) => {
            showMsgFailOperation('file not found');
        })

}
export async function moveFile(dir, arr) {
    let [sorce, targetDirr] = arr.slice(1);
    sorce = path.resolve(dir, sorce)
    await isCorrectPath(sorce)
        .then(async () => {
            targetDirr = path.resolve(dir, targetDirr)
            if (path.extname(targetDirr) !== '') {
                targetDirr = removeExt(targetDirr);
            }

            const fileName = path.basename(sorce);
            const target = path.join(targetDirr, fileName)
            await isCorrectPath(targetDirr)
                .catch(async () => {
                    await createDir(targetDirr)

                })
            await isCorrectPath(targetDirr)
                .catch(async () => {


                })
            const read = createReadStream(sorce);
            const write = createWriteStream(target);
            await new Promise((resolve, reject) => {
                const stream = read.pipe(write);

                stream.on('finish', () => {
                    removeFile(sorce)
                    console.log('The file moved');
                    resolve()
                });
            });

        })
        .catch((err) => {
            showMsgFailOperation('file not found');
        })

}

export async function deleteFile(dir, arr) {
    let [, sorce] = arr;
    sorce = path.resolve(dir, sorce)
    await removeFile(sorce)

}

async function removeFile(pathForRemove) {
    await isCorrectPath(pathForRemove)
        .then(async () => {
            await rm(pathForRemove, () => { })
        })
        .catch(() => {
            showMsgFailOperation('wrong path');
        })


}

export async function createDir(pathToDir) {

    const arr = pathToDir.split(path.sep);
    arr.reduce((acc, el) => {

        acc = path.join(acc, el)

        isCorrectPath(acc)
            .catch(async () => {
                await fs.mkdir(acc)
            })

        return acc
    })
    await isCorrectPath(pathToDir)
        .catch(() => { })

    return await Promise.resolve(2)


}
function removeExt(pathWithExt) {
    const ext = path.extname(pathWithExt);
    const ind = pathWithExt.indexOf(ext);
    return pathWithExt.slice(0, ind)
}
