import { exec } from 'child_process';

import { getData } from '../helper/fsMain.js';

function setWorkingDirectory(projectName) {
    try{
        const config = JSON.parse(getData());

        if (config.projects.find(project => project.name === projectName)) {
            // get the project object
            const project = config.projects.find(project => project.name === projectName);

            if(project.tabColor = "No color"){
                const command = `wt -w 0 new-tab --title ${projectName} -p "Windows Powershell" -d ${project.projectPath}`;
                exec(command, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                });

                return;
            }

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
    } catch (error) {
        console.error(error);
    }
}

export {
    setWorkingDirectory
}