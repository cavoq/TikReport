import { readJsonFile } from "./utils";
import puppeteer, { ElementHandle, ScreenshotOptions } from "puppeteer";
import { Browser, Page } from "puppeteer";


const ELEMENTS = readJsonFile('elements/captcha.json');


export async function getCaptchaImage(page: Page): Promise<string> {
    // Dialog needs to be visible for loaded image
    await page.waitForXPath(ELEMENTS["dialog_xpath"]);
    const element = await page.waitForXPath(ELEMENTS["image_xpath"]);

    const screenshotOptions: ScreenshotOptions = {
        path: 'captures/captcha.png',
        type: 'png',
    };

    await (element as ElementHandle).screenshot(screenshotOptions);
    return screenshotOptions.path;
}
