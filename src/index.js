#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";

import { createProject } from "./scripts/createProject.js";
import { setWorkingDirectory } from "./scripts/navigate.js";


const program = new Command();

program.version("0.0.1").description("Route Racoon - your personal navigation assistant!");

program
  .command("n")
  .description("to navigate to a new location")
  .argument("<project>", "project name")
  .action((project) => {
    setWorkingDirectory(project);
  });

program
  .command("c")
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
        const spinner = ora("Route Racoon is building a new project path...").start();

<<<<<<< HEAD

        setTimeout(() => {
          spinner.stop();
=======
        const {success, message} = createProject(answers.name, answers.path)
        
        if (!success) {
          spinner.stop();
          console.log(chalk.red(message));
          return;
        }

        setTimeout(() => {
          spinner.succeed();
>>>>>>> a2889170263cb5e5907bf41614b2c328d8255a91
          console.log(chalk.green("Project " + answers.name + " created!"));
        }, 2000);
      });
  });

  program
    .command("l")
    .description("to list all projects")
    .action(())

program.parse(process.argv);
