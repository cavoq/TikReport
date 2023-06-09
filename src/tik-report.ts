import fs from "fs";
import puppeteer, { Browser, ElementHandle, Page } from "puppeteer";


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
    ignoreDefaultArgs: ['--enable-automation'],
    headless: false,
    args: [
      '--start-maximized',
      '--disable-infobars',
      '--disable-extensions',
      '--ignore-certificate-errors'
    ],
  });
  return browser;
}

async function reportVideo(browser: Browser, user: string, videoId: string) {
  const page = await browser.newPage();
  await page.goto(`https://www.tiktok.com/@${user}/video/${videoId}`);

  /*const xPathDots = "/html/body/div[1]/div[2]/div[2]/div/div[2]/div[1]/div[1]/div[1]/div[5]/div[2]/div[2]/div[5]/svg"
  const [dots] = await page.$x(xPathDots);
  if (dots) {
    await (dots as ElementHandle<Element>).click();
  } else {
    console.log('Element not found');
  }

  await browser.close();*/
}

async function solveCaptcha(page: Page) {
  
}

async function main() {
  const data = readJsonFile(CONFIG_FILE);
  const proxies = readProxyList(data.proxies);
  const browser = await getBrowser(proxies[0]);
  await reportVideo(browser, data.user, data.videoId);
  /*for (const proxy of proxies) {
    try {
      const browser = await getBrowser(proxy);
      await reportVideo(browser, data.user, data.videoId);
    } catch (error) {
      continue;
    }
  }*/
}


main();


export {
  readJsonFile,
  readProxyList,
  isValidProxy,
  getBrowser,
}
