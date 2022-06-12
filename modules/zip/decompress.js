
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createBrotliDecompress } from 'zlib';
import { createDir, isCorrectPath } from '../fileSyst.js';
import { showMsgFailOperation } from '../share.js';



export const decompressFile = async (dir, arr) => {
    const source = path.resolve(dir, arr[0]);
    let target = path.resolve(dir, arr[1]);

    await isCorrectPath(source)
        .then(async () => {
            if (path.extname(source) === '.br') {
                const ext = path.extname(target);

                if (path.extname(target) !== '') {
                    const ext = path.extname(target);
                    const ind = target.indexOf(ext);
                    target = target.slice(0, ind)
                }

                await isCorrectPath(target)
                    .catch(async () => {
                        await createDir(target)

                    })
                const fileName = path.basename(source).slice(0, -3)

                console.log(fileName);

                const zip = createBrotliDecompress();

                const archive = createReadStream(source);
                const file = createWriteStream(path.join(target, fileName));

                await new Promise((resolve, reject) => {
                    const stream = archive.pipe(zip).pipe(file);

                    stream.on('finish', () => {
                        console.log('Done decompressing');
                        resolve()
                    });
                });
            } else {
                showMsgFailOperation('wrong extention of file, need ".br"');
            }


        })
        .catch((err) => {
            showMsgFailOperation('wrong path to archive');
        })
};
