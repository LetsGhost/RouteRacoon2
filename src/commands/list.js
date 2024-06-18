import Table from 'cli-table';

import {getData} from '../helper/fsMain.js';

function listAll(){
    const rawData = JSON.parse(getData());

    let list = [];
    for(const project of rawData.projects){
        let date = project.createdDate.slice(0, 10); // Extracts the date part of the string

        list.push({name: project.name, path: project.projectPath, tabColor: project.tabColor, date: date});
    }

    return list;
}

function listAllCommand(program){
    program
    .command("list")
    .alias("l")
    .description("to list all projects")
    .action(() => {
      const items = listAll();
  
      const tableItems = items.map((item, index) => ([
        index + 1,
        item.name,
        item.path,
        item.tabColor,
        item.date
      ]));
    
      let table = new Table({ head: ["No.", "Name", "Path", "Tab Color", "Date"], style: { head: ["white"] } });
      tableItems.forEach(item => {
        table.push(item);
      });
    
      console.log(table.toString());
    });
}

export {
    listAllCommand
}