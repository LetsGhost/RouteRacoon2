import fs from 'fs'
import path from 'path'
import os from 'os'

function getData(){
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
    const configPath = path.join(routeRacoonPath, 'projects.json');

    if(!fs.existsSync(routeRacoonPath)){
        fs.mkdirSync(routeRacoonPath);
    }

    if(!fs.existsSync(configPath)){
        fs.writeFileSync(configPath, JSON.stringify({
            projects: []
        }));
    }

    if(fs.readFileSync(configPath, 'utf8') === ''){
        fs.writeFileSync(configPath, JSON.stringify({
            projects: []
        }));
    }

    const rawData = fs.readFileSync(configPath, 'utf8');
    const parsedData = JSON.parse(rawData);

    return JSON.stringify(parsedData);
}

function setData(data){
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, 'RouteRacoon');
    const configPath = path.join(routeRacoonPath, 'projects.json');

    fs.writeFileSync(configPath, JSON.stringify(data));
}

export {
    getData,
    setData
}