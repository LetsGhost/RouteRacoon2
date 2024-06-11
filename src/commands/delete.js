import { getData, setData } from "../helper/fsMain.js";

function deleteEntry(projectName){
    let data = JSON.parse(getData());

    // Check if the project exists
    if (data.projects.find(project => project.name === projectName)) {
        data.projects = data.projects.filter(project => project.name !== projectName);
    }

    setData(data);
}

export {
    deleteEntry
}