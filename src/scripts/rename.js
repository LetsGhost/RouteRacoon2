import { getData, setData } from "./fsMain.js"

function renameEntry(oldName, newName){
    const data = JSON.parse(getData())

    if(data.projects.find(project => project.name === oldName)){
        data.projects.find(project => project.name === oldName).name = newName
    }

    setData(data)
}

export {
    renameEntry
}