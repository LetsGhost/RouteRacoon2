#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";

import { createProject } from "./scripts/createProject.js";
import { setWorkingDirectory } from "./scripts/navigate.js";
import { listAll } from "./scripts/list.js";
import { deleteEntry } from "./scripts/delete.js";
import { renameEntry } from "./scripts/rename.js";

const program = new Command();

program
  .version("0.0.1")
  .description("Route Racoon - your personal navigation assistant!");

program
  .command("navigate")
  .alias("n")
  .description("to navigate to a new location")
  .argument("<project>", "project name")
  .action((project) => {
    setWorkingDirectory(project);
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
        },
      ])
      .then((answers) => {
        const spinner = ora(
          "Route Racoon is building a new project path..."
        ).start();

        setTimeout(() => {
          spinner.stop();
          const { success, message } = createProject(
            answers.name,
            answers.path
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
          choices: items.map((item) => item.name),
        },
      ])
      .then((answers) => {
        deleteEntry(answers.project);
        console.log(chalk.red("Project " + chalk.white(answers.project) + " deleted!"));
      });
  })

  program 
  .command("rename")
  .alias(r)
  .description("rename a project")
  .action(() => {
    const items = listAll

    inquirer
    .prompt([
      {
        name: "project",
        type: "list",
        message: "Which project would you like to rename",
        choices: items.map((item) => item.name)
      }
    ])
    .then((answers) => {
      const oldName = answers.name
      inquirer
      .prompt([
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
        .then((answers) => {
          renameEntry(oldName, answers.name)
        })
      ])
    })
  })
  

program.parse(process.argv);
