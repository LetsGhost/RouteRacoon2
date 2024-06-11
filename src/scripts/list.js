import {getData} from './fsMain.js';

function listAll(){
    const rawData = JSON.parse(getData());

    let list = [];
    for(const project of rawData.projects){
        list.push({name: project.name, path: project.projectPath});
    }

    return list;
}

export {
    listAll
}