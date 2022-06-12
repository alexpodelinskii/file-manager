import { spawn } from "child_process";
import os from 'os'
import fs from 'fs/promises'
import { createReadStream } from 'fs'
import path from "path";
import { on } from "events";
import * as fileSyst from "./modules/fileSyst.js";
import { showMsgFailOperation } from "./modules/share.js";
import { OperSyst } from "./modules/os.js";
import calculateHash from "./modules/hash.js";
import { compressFile } from "./modules/zip/compress.js";

const args = process.argv.slice(2);

let userName = 'Anonim';

args.forEach(element => {
    if (element.startsWith('--username=')) {
        userName = element.split('=')[1];
    }
});

console.log(`Welcome to the File Manager, ${userName}!`);

let dir = os.homedir();

showDir()

enter()

process.stdin.on('data', async data => {
    const arr = data.toString().split(' ').filter(el => el ? true : false).map(el => el.trim())
    const comand = arr[0];
    const arg = data.toString().trim().split(' ').slice(1).join(' ');
    const pathToFile = path.join(dir, arg)
    switch (comand) {

        case 'add':
            await fileSyst.createFile(pathToFile);
            break;
        case 'cat':
            await fileSyst.ReadFile(pathToFile)
            break;

        case 'cd':
            const newDir = path.resolve(dir, arg.trim())
            await fileSyst.isCorrectPath(newDir)
                .then(() => dir = newDir)
                .catch((err) => {
                    showMsgFailOperation('wrong path');
                })

            break;
        case 'compress':
            await compressFile(dir, arr.slice(1));
            break;
        case 'cp':
            await copyFile(arr);
            break;
        case 'hash':
            await calculateHash(path.resolve(dir, arg.trim()));
            break;
        case 'ls':
            await fileSyst.logListFiles(dir);
            break;
        case 'os':
            await OperSyst(arr);
            break;
        case 'rn':
            await fileSyst.renameFile(dir, arr);
            break;
        case 'up':
            dir = path.dirname(dir);
            break;


        case '.exit':
            process.exit();

        default:
            console.log('Invalid input');
    }

    showDir()
    enter()
});



process.stdin.resume();

process.on("SIGINT", () => {
    process.exit()
});

process.on('exit', function () {
    console.log(`\nThank you for using File Manager, ${userName}!\n`);
});

function showDir() {
    console.log(`You are currently in ${dir}`);
}

function enter() {
    console.log('\nEnter your comand:');
}





