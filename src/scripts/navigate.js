import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec, spawn } from 'child_process';

function setWorkingDirectory(projectName) {
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
    const configPath = path.join(routeRacoonPath, 'config.json');

    if (fs.existsSync(configPath)) {
        const rawData = fs.readFileSync(configPath);
        const config = JSON.parse(rawData);

        if (config[projectName]) {
            console.log('Starting directory: ' + process.cwd());
            try {
                process.chdir(config[projectName]);
                const newTerminal = spawn('wt', ['-w', '0', 'new-tab', '-p', 'Windows PowerShell'], { shell: true });
                newTerminal.on('error', (error) => {
                    console.error(`spawn error: ${error}`);
                });
            } catch (err) {
                console.error('chdir: ' + err);
            }
        } else {
            console.error('Project not found');
        }
    } else {
        console.error('Config file not found');
    }
}

export {
    setWorkingDirectory
}