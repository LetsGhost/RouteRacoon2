import fs from 'fs';
import path from 'path';
import os from 'os';
<<<<<<< HEAD
import process from 'process';
=======
import { exec } from 'child_process';
import { stringify } from 'querystring';
>>>>>>> e23f3817f3093785f3d9bcdf9dbbbbe23f1611d3

function setWorkingDirectory(projectName) {
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
    const configPath = path.join(routeRacoonPath, 'config.json');

    if (fs.existsSync(configPath)) {
        const rawData = fs.readFileSync(configPath);
        const config = JSON.parse(rawData);

        if (config[projectName]) {
<<<<<<< HEAD
            process.chdir("C:\\Users\\Ehrling\\RouteRacoon");
=======
            const path = stringify(config[projectName])
             console.log(config[projectName])
            exec(`powershell.exe -File ./src/pw-scripts/changeDir.ps1 ${JSON.stringify(config[projectName])}`, (error, stdout, stderr) => {
                console.log(stdout);
                console.log(stderr)
                if (error) {
                    console.error(`Project not found`);
                    return;
                }

                if(stderr) {
                    console.error("Project not found");
                    return;
                }

            })
>>>>>>> e23f3817f3093785f3d9bcdf9dbbbbe23f1611d3
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