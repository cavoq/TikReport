import { readJsonFile } from "./utils";
import puppeteer, { ElementHandle, ScreenshotOptions } from "puppeteer";
import { Browser, Page } from "puppeteer";


const ELEMENTS = readJsonFile('elements/captcha.json');


export async function getCaptchaImage(page: Page): Promise<string> {
    if (!await isElementPresent(page, ELEMENTS["dialog_xpath"])) {
        throw new Error("Captcha dialog not found");
    }
    await page.waitForXPath(ELEMENTS["dialog_xpath"]);
    const captchaImageElement = await page.waitForXPath(ELEMENTS["image_xpath"]);

    const screenshotOptions: ScreenshotOptions = {
        path: 'captures/captcha.png',
        type: 'png',
    };

    await (captchaImageElement as ElementHandle).screenshot(screenshotOptions);
    return screenshotOptions.path;
}

export async function getSlider(page: Page): Promise<ElementHandle> {
    if (!await isElementPresent(page, ELEMENTS["dialog_xpath"])) {
        throw new Error("Captcha dialog not found");
    }
    const sliderElement = await page.waitForXPath(ELEMENTS["slider_xpath"]);
    return sliderElement as ElementHandle<Element>;
}

export async function isElementPresent(page: Page, xpath: string): Promise<boolean> {
    try {
        await page.waitForXPath(xpath, { timeout: 300000 });
        return true;
    } catch (error) {
        return false;
    }
}
