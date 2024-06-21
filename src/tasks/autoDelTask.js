import chalk from "chalk";

import { autoDelete } from "../commands/autodel.js";

function autoDeleteTask(){
  try{
    const result = autoDelete();

    if(result) {
      console.log(chalk.red("Auto delete task failed!"));
      return;
    } else {
      console.log(chalk.green("Auto delete task completed:"));
      result.forEach((object, index) => {
        console.log(chalk.red(chalk.white((index + 1)) + " " + object));
      });
      return;
    }
  
  } catch(err) {
    console.log(chalk.red("Error in auto delete task!"));
    console.log(err);
    return;
  }
}

export { autoDeleteTask };