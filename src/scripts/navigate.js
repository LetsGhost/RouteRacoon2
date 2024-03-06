import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import os from 'os';

function setWorkingDirectory(projectName) {
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
    const configPath = path.join(routeRacoonPath, 'config.json');

    if (fs.existsSync(configPath)) {
        const rawData = fs.readFileSync(configPath);
        const config = JSON.parse(rawData);

        if (config[projectName]) {
            shell.cd(config[projectName]);
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