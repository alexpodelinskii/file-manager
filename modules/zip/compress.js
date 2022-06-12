
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { createDir, isCorrectPath } from '../fileSyst.js';
import { showMsgFailOperation } from '../share.js';
import { createBrotliCompress } from 'zlib';


export const compressFile = async (dir, arr) => {
    const source = path.resolve(dir, arr[0]);
    let target = path.resolve(dir, arr[1]);

    await isCorrectPath(source)
        .then(async () => {
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
            const fileName = path.basename(source) + '.br'



            const zip = createBrotliCompress()
            const file = createReadStream(source);
            const archive = createWriteStream(path.join(target, fileName));

            await new Promise((resolve, reject) => {
                const stream = file.pipe(zip).pipe(archive);

                stream.on('finish', () => {
                    console.log('Done compressing');
                    resolve()
                });
            });

        })
        .catch((err) => {
            showMsgFailOperation('wrong path to file');
        })
};
