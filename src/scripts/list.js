import fs from 'fs';

import {getPath} from './fsMain.js';

function listAll(){
    const path = getPath();

    if (fs.existsSync(path)) {
        const rawData = fs.readFileSync(path);
        const config = JSON.parse(rawData);

        let projects = []

        for (let project in config) {
            projects.push({ name: project, path: config[project] });
        }

        return {
            success: true,
            projects
        }
    } else {
        throw new Error('Config file not found');
    }
}

export {
    listAll
}