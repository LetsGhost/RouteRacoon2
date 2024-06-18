import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";

import { projectEntrySchema } from "../schema/projectEntrySchema.js";
import { getData, setData } from "../helper/fsMain.js";

function createProject(projectName, projectPath, tabColor) {
  let config = JSON.parse(getData());

  if (!config.projects.find((project) => project.name === projectName)) {
    const newProject = {
      ...projectEntrySchema,
      name: projectName,
      projectPath: projectPath,
      tabColor: tabColor,
      createdDate: new Date(),
    };
    config.projects.push(newProject);
    setData(config);

    return {
      success: true,
      message: `Project ${projectName} created!`,
    };
  }

  return {
    success: false,
    message: `Project ${projectName} already exists!`,
  };
}

function createProjectCommand(program) {
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
            message:
              "Do you want to use the current terminal path for the new project?",
            default: false,
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
            when: function (answers) {
              return !answers.useCurrentPath;
            },
          },
          {
            name: "tabColor",
            type: "confirm",
            message: "Do you want to set a color for the tab?",
            default: false,
          },
          {
            name: "color",
            type: "input",
            message:
              "What color should the tab have? (Use HEX format e.g. #FF0000)",
            validate: function (value) {
              if (value.length) {
                return true;
              } else {
                return "Route Racoon needs a color for the tab!";
              }
            },
            when: function (answers) {
              return answers.tabColor;
            },
          },
        ])
        .then((answers) => {
          const spinner = ora(
            "Route Racoon is building a new project path..."
          ).start({ color: "yellow" });

          setTimeout(() => {
            spinner.stop({ color: "yellow" });

            if (answers.useCurrentPath) {
              answers.path = process.cwd();
            }

            let tabColor = answers.color;

            if (!answers.tabColor) {
              tabColor = "No color";
            }

            const { success, message } = createProject(
              answers.name,
              answers.path,
              tabColor
            );

            if (!success) {
              spinner.stop({ color: "red" });
              console.log(chalk.red(message));
              return;
            }

            setTimeout(() => {
              spinner.succeed({ color: "green" });

              console.log(chalk.green("Project " + answers.name + " created!"));
            }, 2000);
          }, 2000);
        });
    });
}

export { createProject, createProjectCommand };
