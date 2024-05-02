import { getData, setData } from "./fsMain.js"

function renameEntry(oldName, newName){
    const data = JSON.parse(getData())

    if(data[oldName]){
        data[NewName] = data[oldName]
        delete data[oldName]
    }

    setData(data)
}

export {
    renameEntry
}