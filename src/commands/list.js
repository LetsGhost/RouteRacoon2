import {getData} from '../helper/fsMain.js';

function listAll(){
    const rawData = JSON.parse(getData());

    let list = [];
    for(const project of rawData.projects){
        let date = project.createdDate.slice(0, 10); // Extracts the date part of the string

        list.push({name: project.name, path: project.projectPath, tabColor: project.tabColor, date: date});
    }

    return list;
}

export {
    listAll
}