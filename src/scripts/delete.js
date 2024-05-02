import fs from "fs";

import { getData, setData } from "./fsMain.js";

function deleteEntry(projectName){
    let data = JSON.parse(getData());

    // Check if the project exists
    if (data[projectName]) {
        // Delete the project
        delete data[projectName];
    }

    setData(data);
}

export {
    deleteEntry
}