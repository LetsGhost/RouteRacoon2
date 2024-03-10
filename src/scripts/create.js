import fs from 'fs';
import path from 'path';

function createFromPath(projectName, projectPath) {
    const filePath = path.join('C:', 'Program Files', 'RouteRacoon', 'projects.json');

    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.log('File does not exist. Creating it now...');
            fs.writeFile(filePath, '{}', (err) => {
                if (err) throw err;
                console.log('File created successfully.');
            });
        } else {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) throw err;
                const projects = JSON.parse(data);
                projects[projectName] = projectPath;
                fs.writeFile(filePath, JSON.stringify(projects), (err) => {
                    if (err) throw err;
                    console.log('Project added successfully.');
                });
            })
        }
    });
}

export {
    createFromPath,
};