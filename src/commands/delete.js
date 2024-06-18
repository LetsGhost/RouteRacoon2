import inquirer from "inquirer";
import chalk from "chalk";

import { getData, setData } from "../helper/fsMain.js";
import { listAll } from "./list.js";

function deleteEntry(projectName){
    let data = JSON.parse(getData());

    // Check if the project exists
    if (data.projects.find(project => project.name === projectName)) {
        data.projects = data.projects.filter(project => project.name !== projectName);
    }

    setData(data);
}

function deleteEntryCommand(program){
  program
  .command("delete")
  .alias("d")
  .description("to delete a project")
  .action(() => {
    const items = listAll();

    inquirer
      .prompt([
        {
          name: "project",
          type: "list",
          message: "Which project would you like to delete?",
          choices: items.length > 0 ? items.map((item) => item.name) : ["No items available"],
        },
      ])
      .then((answers) => {
        if(answers.project === "No items available") {
          console.log(chalk.red("No projects found!"));
          return;
        }

        deleteEntry(answers.project);
        console.log(chalk.red("Project " + chalk.white(answers.project) + " deleted!"));
      });
  })
}

export {
    deleteEntryCommand
}