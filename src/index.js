import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import ora from "ora";
import fs from "fs";
import shell from "shelljs";

const program = new Command();

program.version("0.0.1").description("Route Racoon - your personal navigation assistant!");

program
  .command("n")
  .description("to navigate to a new location")
  .action(() => {
    inquirer
      .prompt([
        {
          name: "project",
          type: "input",
          message: "To what project should Route Racoon bring you?",
          validate: function (value) {
            if (value.length) {
              return true;
            } else {
              return "Route Racoon doesn't know where to go without a project name!";
            }
          },
        },
      ])
      .then((answers) => {
        const spinner = ora("Saying hello...").start();

        setTimeout(() => {
          spinner.stop();
          console.log(chalk.green("Hello, " + answers.name + "!"));
        }, 2000);
      });
  });

program
  .command("c")
  .description("to create a new location")
  .action(() => {
    inquirer
      .prompt([
        {
          name: "project",
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
      ])
      .then((answers) => {
        const spinner = ora("Creating a new project...").start();

        

        setTimeout(() => {
          spinner.stop();
          console.log(chalk.green("Project " + answers.project + " created!"));
        }, 2000);
      });
  });

program.parse(process.argv);
