import updateNotifier from "update-notifier";
import boxen from "boxen";
import chalk from "chalk";

import { getMetadata, setMetadata } from "../helper/fsMain.js";


function checkForUpdates(){
    const metadata = JSON.parse(getMetadata());

    const notifier = updateNotifier({
        pkg: {
            name: "routeraccoon2",
            version: metadata.taskData.updateNotifier.version
        },
        updateCheckInterval: 86400000
    })

    if(!notifier.update) return;

    metadata.taskData.updateNotifier.version = notifier.update.latest;

    setMetadata(metadata);

    console.log(boxen(
        `Hey there is a new version ${chalk.red(notifier.update.latest)}`, 
        { padding: 1, margin: 1, titleAlignment: "center", title: chalk.green("Update available")}
    ));
}

export { checkForUpdates };