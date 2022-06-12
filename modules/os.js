import os from 'os'

export async function OperSyst(argv) {
    const comands = argv.filter(comand => comand.startsWith('--'))
        .map(comand => comand.slice(2));
    comands.forEach(comand => {
        switch (comand) {
            case 'architecture':
                showArchitecture();
                break;
            case 'cpus':
                showCpusInfo();
                break;
            case 'EOL':
                showEOL();
                break;
            case 'homedir':
                showHomedir();
                break;
            case 'username':
                showUsernamer();
                break; default:
                console.log(`Comand "${comand}" is invalid`);
        }
    });;

}


function showEOL() {
    console.log(`EOL your OS:  ${JSON.stringify(os.EOL)}`);
}
function showCpusInfo() {
    const cpus = os.cpus();
    console.log(`Your host machine have ${cpus.length} cpus`);
    cpus.forEach((cpu, index) => {
        console.log(`
    Your CPU ${index + 1} model:  ${cpu.model}
    Your CPU ${index + 1} clock rate:  ${+cpu.speed / 1000} GHz`);
    })

}
function showHomedir() {
    console.log(`Your homedir:  ${os.homedir}`);
}
function showUsernamer() {
    console.log(`Your username:  ${os.userInfo().username}`);
}
function showArchitecture() {
    console.log(`Your architecture:  ${os.arch()}`);
}