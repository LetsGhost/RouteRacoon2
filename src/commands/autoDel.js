import fs from 'fs';

import { getData, setData } from '../helper/fsMain.js';

function autoDelete(){
  try{
    const db = JSON.parse(getData());
    const delObjects = [];

    // Iterate over the array backwards because, there was a bug that would stop the loop when splicing an object.
    for(let project = db.projects.length - 1; project >= 0; project--){
      if(db.projects.hasOwnProperty(project)){

        let projectObject = db.projects[project];

        if(!fs.existsSync(projectObject.projectPath)){
          db.projects.splice(project, 1);
          delObjects.push(projectObject.name);
        }
      }
    }

    setData(db);
    return { delObjects };
  } catch (error) {
    console.error(error);
  }
}

export {
    autoDelete
}