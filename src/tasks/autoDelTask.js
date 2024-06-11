import chalk from "chalk";

import { setMetadata, getMetadata } from "../helper/fsMain.js";
import { autoDelete } from "../commands/autodel.js";

function autoDeleteTask(){
  const metadata = JSON.parse(getMetadata());
  const autoDel = metadata.autoDel;

  const currentDate = new Date().toISOString().split('T')[0];
  const lastCheckedDate = new Date(autoDel.date).toISOString().split('T')[0];

  if(currentDate !== lastCheckedDate) {
    autoDelete();

    metadata.autoDel.date = new Date();

    setMetadata(JSON.stringify(metadata));

    console.log(chalk.green("Auto delete task completed!"));
    return;
  }
}

export { autoDeleteTask };