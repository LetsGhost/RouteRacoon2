import fs from 'fs';
import path from 'path';
import os from 'os';
import { spawn } from 'child_process';

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
                console.log('New directory: ' + process.cwd());
                const newTerminal = spawn('powershell', ['-Command', 'Start-Process', 'powershell'], { shell: true });
                newTerminal.on('error', (error) => {
                    console.error(`spawn error: ${error}`);
                });
            } catch (err) {
                console.error('chdir: ' + err);
            }
        } else {
            throw new Error ('Project not found');
        }
    } else {
        throw new Error ('No projects found');
    }
}

export {
    setWorkingDirectory
}