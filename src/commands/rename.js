import inquirer from "inquirer"
import chalk from "chalk"

import { getData, setData } from "../helper/fsMain.js"

function renameEntry(oldName, newName){
    const data = JSON.parse(getData())

    if(data.projects.find(project => project.name === oldName)){
        data.projects.find(project => project.name === oldName).name = newName
    }

    setData(data)
}

function renameEntryCommand(program){
    program 
    .command("rename")
    .alias("r")
    .description("rename a project")
    .action(() => {
      const items = listAll();
  
      inquirer
      .prompt([
        {
          name: "project",
          type: "list",
          message: "Which project would you like to rename",
          choices: items.length > 0 ? items.map((item) => item.name) : ["No items available"],
        },
        {
          name: "name",
          type: "input",
          message: "What name should the project have?",
          validate: function (value) {
            if (value.length) {
              return true;
            } else {
              return "Route Racoon needs a name for the project!";
            }
          },
        }
      ])
      .then((answers) => {
        if(answers.project === "No items available") {
          console.log(chalk.red("No projects found!"));
          return;
        }
  
        renameEntry(answers.project, answers.name)
      })
    })
}

export {
    renameEntryCommand
}