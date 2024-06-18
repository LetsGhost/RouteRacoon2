import updateNotifier from "update-notifier";

import { getMetadata, setMetadata } from "../helper/fsMain.js";

function checkForUpdates(){
    const metadata = JSON.parse(getMetadata());

    const currentDate = new Date().toISOString().split('T')[0];
    const lastCheckedDate = new Date(metadata.autoDel.date).toISOString().split('T')[0];

    if(currentDate === lastCheckedDate){
        const notifier = updateNotifier({
            pkg: {
                name: "routeraccoon2",
                version: metadata.version
            }
        })
    
        if(notifier.update){
            setMetadata({
                autoDel: {
                    date: new Date()
                },
                version: notifier.update.latest
            });
        }
    
        notifier.notify();
    }
}

export { checkForUpdates };