import fs from 'fs';

import {getData} from './fsMain.js';

function listAll(){
    const rawData = getData();
    const data = JSON.parse(rawData);

    let list = [];
    for(const key in data){
        list.push({name: key, path: data[key]});
    }
    return list;
}

export {
    listAll
}