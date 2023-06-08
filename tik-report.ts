import fs from "fs";

const CONFIG_FILE = "config.json";


function readJsonFile(filename: string): { [key: string]: any } {
  const fileContent = fs.readFileSync(filename, 'utf8');
  const data = JSON.parse(fileContent);
  return data;
}

function readProxyList(file: string) {
  const list = fs.readFileSync(file, "utf8");
  return list.split("\n");
}

export {
  readJsonFile,
  readProxyList,
}
