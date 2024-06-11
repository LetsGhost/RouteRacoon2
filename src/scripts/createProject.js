import fs from 'fs';
import path from 'path';
import os from 'os';

import { projectEntrySchema } from '../schema/projectEntrySchema.js';
import { getData, setData } from './fsMain.js';

function createProject(projectName, projectPath, tabColor) {
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
    const configPath = path.join(routeRacoonPath, 'projects.json');

    if (!fs.existsSync(routeRacoonPath)) {
        fs.mkdirSync(routeRacoonPath, { recursive: true });
    }

    let config = JSON.parse(getData());

    if(!config.projects.find(project => project.name === projectName)) {
        const newProject = {
            ...projectEntrySchema,
            name: projectName,
            projectPath: projectPath,
            tabColor: tabColor,
            createdDate: new Date()
        }
        config.projects.push(newProject)
        setData(config);

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