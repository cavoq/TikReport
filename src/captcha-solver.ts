import { readJsonFile } from "./utils";
import puppeteer, { ElementHandle, ScreenshotOptions } from "puppeteer";
import { Browser, Page } from "puppeteer";


const ELEMENTS = readJsonFile('elements/captcha.json');


export async function getCaptchaImage(page: Page): Promise<string> {
    const captchaImageElement = await getCaptchaElement(page, ELEMENTS["image_xpath"]);

    const screenshotOptions: ScreenshotOptions = {
        path: 'captures/captcha.png',
        type: 'png',
    };

    await captchaImageElement.screenshot(screenshotOptions);
    return screenshotOptions.path;
}


export async function getSlider(page: Page): Promise<ElementHandle> {
    return await getCaptchaElement(page, ELEMENTS["slider_xpath"]);
}


export async function getPuzzle(page: Page): Promise<ElementHandle> {
    return await getCaptchaElement(page, ELEMENTS["puzzle_xpath"]);
}


export async function getCaptchaElement(page: Page, xpath: string): Promise<ElementHandle> {
    if (!await isElementPresent(page, ELEMENTS["dialog_xpath"])) {
        throw new Error("Captcha dialog not found");
    }
    const captchaElement = await page.waitForXPath(xpath);
    return captchaElement as ElementHandle;
}

export async function isElementPresent(page: Page, xpath: string): Promise<boolean> {
    try {
        await page.waitForXPath(xpath, { timeout: 300000 });
        return true;
    } catch (error) {
        return false;
    }
}
