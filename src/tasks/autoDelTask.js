import chalk from "chalk";

import { setMetadata, getMetadata } from "../helper/fsMain.js";
import { autoDelete } from "../commands/autodel.js";

function autoDeleteTask(){
  try{
    const metadata = JSON.parse(getMetadata());
    const autoDel = metadata.autoDel;
  
    const currentDate = new Date().toISOString().split('T')[0];
    const lastCheckedDate = new Date(autoDel.date).toISOString().split('T')[0];
  
    if(currentDate !== lastCheckedDate) {
      const result = autoDelete();
  
      metadata.autoDel.date = new Date();
  
      setMetadata(metadata);
  
      if(result === undefined || result === 0) {
        console.log(chalk.red("Auto delete task failed!"));
        return;
      } else {
        console.log(chalk.green("Auto delete task completed:"));
        result.forEach((object, index) => {
          console.log(chalk.red(chalk.white((index + 1)) + " " + object));
        });
        return;
      }
    }
  } catch(err) {
    console.log(chalk.red("Error in auto delete task!"));
    console.log(err);
    return;
  }
}

export { autoDeleteTask };