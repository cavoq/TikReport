import fs from "fs";
import puppeteer, { Browser } from "puppeteer";


const CONFIG_FILE = "config.json";


function readJsonFile(filename: string): { [key: string]: any } {
  const fileContent = fs.readFileSync(filename, 'utf8');
  const data = JSON.parse(fileContent);
  return data;
}

function readProxyList(file: string): string[] {
  const list = fs.readFileSync(file, "utf8");
  const proxyList = list.split("\n");
  const validProxies: string[] = [];

  for (const proxy of proxyList) {
    if (isValidProxy(proxy)) {
      validProxies.push(proxy);
    }
  }

  return validProxies;
}

function isValidProxy(proxy: string): boolean {
  const [host, port] = proxy.split(":");
  if (!host || !port) {
    return false;
  }
  if (isNaN(Number(port))) {
    return false;
  }
  // Validate IPv4 address
  const ipv4Pattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  if (!ipv4Pattern.test(host)) {
    return false;
  }

  return true;
}

async function getBrowser(proxy: string): Promise<Browser> {
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--proxy-server=${proxy}`
    ],
  });
  return browser;
}


export {
  readJsonFile,
  readProxyList,
  isValidProxy,
  getBrowser,
}
