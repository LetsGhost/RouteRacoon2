import fs from 'fs';

import {getData} from './fsMain.js';

function listAll(){
    const data = getData();

    if(data){
        let list = [];
        console.log(data);
        for(const key in data){
            list.push(key);
        }
        return list;
    } else {
        return [];
    }
}

export {
    listAll
}