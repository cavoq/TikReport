import { readJsonFile } from "./utils";
import puppeteer from "puppeteer";
import { Browser, Page } from "puppeteer";


const ELEMENTS = readJsonFile('elements/captcha.json');


export async function getCaptchaImage(browser: Browser, page: Page) {
    // Wait for the captcha element to be visible
    await page.waitForXPath(ELEMENTS["captcha"]);
}
