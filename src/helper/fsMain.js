import fs from 'fs'
import path from 'path'
import os from 'os'

const folder = (process.env.NODE_ENV || "RouteRacoon").trim();

function getData(){
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, folder);
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
    const routeRacoonPath = path.join(userDirectory, folder);
    const configPath = path.join(routeRacoonPath, 'projects.json');

    fs.writeFileSync(configPath, JSON.stringify(data));
}

function getMetadata(){
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, folder);
    const configPath = path.join(routeRacoonPath, 'metadata.json');

    if(!fs.existsSync(routeRacoonPath)){
        fs.mkdirSync(routeRacoonPath);
    }

    if(!fs.existsSync(configPath)){
        fs.writeFileSync(configPath, JSON.stringify({
            autoDel: {
                date: new Date()
            }
        }));
    }

    if(fs.readFileSync(configPath, 'utf8') === ''){
        fs.writeFileSync(configPath, JSON.stringify({
            autoDel: {
                date: new Date()
            }
        }));
    }

    const rawData = fs.readFileSync(configPath, 'utf8');
    const parsedData = JSON.parse(rawData);

    return JSON.stringify(parsedData);
}

function setMetadata(data){
    const userDirectory = os.homedir();
    const routeRacoonPath = path.join(userDirectory, folder);
    const configPath = path.join(routeRacoonPath, 'metadata.json');

    fs.writeFileSync(configPath, JSON.stringify(data));
}

export {
    getData,
    setData,
    getMetadata,
    setMetadata
}