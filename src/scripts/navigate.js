import fs from 'fs';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';

function setWorkingDirectory(projectName) {
    try{
        const userDirectory = os.homedir();
        const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
        const configPath = path.join(routeRacoonPath, 'projects.json');

        if (fs.existsSync(configPath)) {
            const rawData = fs.readFileSync(configPath);
            const config = JSON.parse(rawData);

            if (config.projects.find(project => project.name === projectName)) {
                // get the project object
                const project = config.projects.find(project => project.name === projectName);

                // Implement tab color
                const command = `wt -w 0 new-tab --title ${projectName} --tabColor ${project.tabColor} -p "Windows Powershell" -d ${project.projectPath}`;
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                });
            } else {
                console.error('Project not found');
            }
        } else {
            console.error('Config file not found');
        }
    } catch (error) {
        console.error(error);
    }
}

export {
    setWorkingDirectory
}