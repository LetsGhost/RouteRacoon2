#!/usr/bin/env node

import { Command } from "commander";

import { createProjectCommand } from "./commands/createProject.js";
import { navigateCommand } from "./commands/navigate.js";
import { listAllCommand } from "./commands/list.js";
import { deleteEntryCommand } from "./commands/delete.js";
import { renameEntryCommand } from "./commands/rename.js";
import { autoDeleteCommand } from "./commands/autodel.js";

import { autoDeleteTask } from "./tasks/autoDelTask.js";
import { checkForUpdates } from "./tasks/checkUpdatesTask.js";

// Tasks
import { getDate, setDate } from "./helper/metadataDate.js";

const currentDate = new Date().toISOString().split('T')[0];
const lastDate = new Date(getDate());

if(new Date(currentDate).getTime() > lastDate.getTime()){
  autoDeleteTask();
  checkForUpdates();

  //setDate();
}

const program = new Command();

program
  .description("Route Racoon - your personal navigation assistant!")


navigateCommand(program);
createProjectCommand(program);
listAllCommand(program);
deleteEntryCommand(program);
renameEntryCommand(program);
autoDeleteCommand(program);

program.parse(process.argv);
