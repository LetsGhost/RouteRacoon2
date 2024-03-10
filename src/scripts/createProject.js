import fs from 'fs';
import path from 'path';
import os from 'os';

function createProject(projectName, projectPath) {
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
    const configPath = path.join(routeRacoonPath, 'config.json');

    if (!fs.existsSync(routeRacoonPath)) {
        fs.mkdirSync(routeRacoonPath, { recursive: true });
    }

    let config = {};
    if (fs.existsSync(configPath)) {
        const rawData = fs.readFileSync(configPath);
        config = JSON.parse(rawData);
    }

    if(!config[projectName]) {
        config[projectName] = projectPath;
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

        return {
            success: true,
            message: `Project ${projectName} created!`
        }
    }

    return {
        success: false,
        message: `Project ${projectName} already exists!`
    }
}

export {
    createProject
}