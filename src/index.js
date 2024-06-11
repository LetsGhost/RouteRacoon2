#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";

import { createProject } from "./commands/createProject.js";
import { setWorkingDirectory } from "./commands/navigate.js";
import { listAll } from "./commands/list.js";
import { deleteEntry } from "./commands/delete.js";
import { renameEntry } from "./commands/rename.js";

const program = new Command();

program
  .version("0.5.0")
  .description("Route Racoon - your personal navigation assistant!");

program
  .command("navigate")
  .alias("n")
  .description("to navigate to a new location")
  .argument("[project]", "project name")
  .action((project) => {
    if(project === undefined) {
      const items = listAll();

      inquirer
      .prompt([
        {
          name: "project",
          type: "list",
          message: "Where would you like to navigate to?",
          choices: items.length > 0 ? items.map((item) => item.name) : ["No items available"],
        },
      ])
      .then((answers) => {
        if(answers.project === "No items available") {
          console.log(chalk.red("No projects found!"));
          return;
        }

        setWorkingDirectory(answers.project);
        console.log(chalk.green("Navigating to " + answers.project + "..."));
      });
    } else {
      setWorkingDirectory(project);
      console.log(chalk.green("Navigating to " + project + "..."));
    }

  });

program
  .command("create")
  .alias("c")
  .description("to create a new location")
  .action(() => {
    inquirer
      .prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of the new project?",
          validate: function (value) {
            if (value.length) {
              return true;
            } else {
              return "Route Racoon needs a name for the new project!";
            }
          },
        },
        {
          name: "useCurrentPath",
          type: "confirm",
          message: "Do you want to use the current terminal path for the new project?",
          default: false
        },
        {
          name: "path",
          type: "input",
          message: "What is the path of the new project?",
          validate: function (value) {
            if (value.length) {
              return true;
            } else {
              return "Route Racoon needs a path for the new project!";
            }
          },
          when: function(answers) {
            return !answers.useCurrentPath;
          }
        },
        {
          name: "tabColor",
          type: "confirm",
          message: "Do you want to set a color for the tab?",
          default: false
        },
        {
          name: "color",
          type: "input",
          message: "What color should the tab have? (Use HEX format e.g. #FF0000)",
          validate: function (value) {
            if (value.length) {
              return true;
            } else {
              return "Route Racoon needs a color for the tab!";
            }
          },
          when: function(answers) {
            return answers.tabColor;
          }
        }
      ])
      .then((answers) => {
        const spinner = ora(
          "Route Racoon is building a new project path..."
        ).start();

        setTimeout(() => {
          spinner.stop();

          if(answers.useCurrentPath) {
            answers.path = process.cwd();
          }

          let tabColor = answers.color;

          if(!answers.tabColor) {
            tabColor = "No color";
          }

          const { success, message } = createProject(
            answers.name,
            answers.path,
            tabColor
          );

          if (!success) {
            spinner.stop();
            console.log(chalk.red(message));
            return;
          }

          setTimeout(() => {
            spinner.succeed();

            console.log(chalk.green("Project " + answers.name + " created!"));
          }, 2000);
        }, 2000);
      });
  });

  program
  .command("list")
  .alias("l")
  .description("to list all projects")
  .action(() => {
    const items = listAll();

    console.log(chalk.yellow("Route Racoon is listing:"))
    items.forEach((item, index) => {
      console.log(chalk.green(`${index + 1} ${chalk.yellow(item.name)}: ${chalk.cyan(item.path)}`));
    });
  });

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
  

program.parse(process.argv);
