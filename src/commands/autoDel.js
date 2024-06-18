import fs from 'fs';
import chalk from 'chalk';
import ora from 'ora';

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
    return delObjects;
  } catch (error) {
    console.error(error);
  }
}

function autoDeleteCommand(program){
  program
  .command("autodel")
  .alias("ad")
  .description("checks if an folder still exists and deletes the entry if not")
  .action(() => {
    let spinner = ora("RouteRaccoon is checking the entry's...").start();

    const result = autoDelete();

    if(result === undefined || result.length === 0) {
      spinner.fail(chalk.red("No entries deleted!"), { color: "red" });
      return;
    }

    spinner.succeed(chalk.green("Entries deleted:"), { color: "green" });
    result.forEach((object, index) => {
      console.log(chalk.red(chalk.white((index + 1)) + " " + object));
    });
  })
}

export {
  autoDeleteCommand,
  autoDelete
}