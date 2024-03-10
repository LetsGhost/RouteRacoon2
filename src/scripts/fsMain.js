import fs from 'fs'
import path from 'path'
import os from 'os'

function getPath(){
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
    const configPath = path.join(routeRacoonPath, 'config.json');

    return configPath;
}

export {
    getPath
}