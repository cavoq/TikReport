import { readFileSync } from "fs";


export function readJsonFile(filename: string): { [key: string]: any } {
    const fileContent = readFileSync(filename, 'utf8');
    const data = JSON.parse(fileContent);
    return data;
}
