import fs from 'fs';
import path from 'path';
import shell from 'shelljs';

function setWorkingDirectory(projectName) {
    const routeRacoonPath = 'C://ProgramFiles/RouteRacoon';
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