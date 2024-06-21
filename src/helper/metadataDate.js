import { getMetadata, setMetadata } from "./fsMain.js";

function getDate(){
  const metadata = JSON.parse(getMetadata());
  return metadata.date;
}

function setDate(){
  const metadata = JSON.parse(getMetadata());
  metadata.date = new Date().toISOString().split('T')[0];

  setMetadata(metadata);
  
  return metadata;
}

export { getDate, setDate };