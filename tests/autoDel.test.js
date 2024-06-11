import fs from "fs";

const testDB = {
  projects: [
    {
      name: "test",
      projectPath: "C:\\Users\\test\\Desktop\\test",
      tabColor: "red",
      createdAt: "2021-07-28T15:00:00.000Z",
    },
    {
      name: "test2",
      projectPath: "C:\\Users\\test\\Desktop\\test2",
      tabColor: "red",
      createdAt: "2021-07-28T15:00:00.000Z",
    },
    {
      name: "test5",
      projectPath: "C:\\Users\\Ehrling\\RouteRacoon",
      tabColor: "red",
      createdAt: "2021-07-28T15:00:00.000Z",
    },
  ]
};

function autoDelete(){
  try{
    const db = testDB;
    const delObjects = [];

    for(let project = db.projects.length - 1; project >= 0; project--){
      let projectObject = db.projects[project];

      if(!fs.existsSync(projectObject.projectPath)){
        db.projects.splice(project, 1);
        delObjects.push(projectObject.name);
      }
    }

    return { delObjects };
  } catch (error) {
    console.error(error);
  }
}


function testAutoDelete() {
  const { delObjects } = autoDelete();
  console.log(delObjects);
}

testAutoDelete();