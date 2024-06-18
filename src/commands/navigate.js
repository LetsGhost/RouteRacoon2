import { exec } from "child_process";
import chalk from "chalk";
import inquirer from "inquirer";

import { getData } from "../helper/fsMain.js";
import { listAll } from "./list.js";

function setWorkingDirectory(projectName) {
  try {
    const config = JSON.parse(getData());

    if (config.projects.find((project) => project.name === projectName)) {
      // get the project object
      const project = config.projects.find(
        (project) => project.name === projectName
      );

      if ((project.tabColor = "No color")) {
        const command = `wt -w 0 new-tab --title ${projectName} -p "Windows Powershell" -d ${project.projectPath}`;
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });

        return;
      }

      const command = `wt -w 0 new-tab --title ${projectName} --tabColor ${project.tabColor} -p "Windows Powershell" -d ${project.projectPath}`;
      exec(command, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
      });
    } else {
      console.error("Project not found");
    }
  } catch (error) {
    console.error(error);
  }
}

function navigateCommand(program) {
  program
    .command("navigate")
    .alias("n")
    .description("to navigate to a new location")
    .argument("[project]", "project name")
    .action((project) => {
      if (project === undefined) {
        const items = listAll();

        inquirer
          .prompt([
            {
              name: "project",
              type: "list",
              message: "Where would you like to navigate to?",
              choices:
                items.length > 0
                  ? items.map((item) => item.name)
                  : ["No items available"],
            },
          ])
          .then((answers) => {
            if (answers.project === "No items available") {
              console.log(chalk.red("No projects found!"));
              return;
            }

            setWorkingDirectory(answers.project);
            console.log(
              chalk.green("Navigating to " + answers.project + "...")
            );
          });
      } else {
        setWorkingDirectory(project);
        console.log(chalk.green("Navigating to " + project + "..."));
      }
    });
}

export { 
  navigateCommand
};
