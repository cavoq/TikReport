import * as puppeteer from "puppeteer";
import * as CaptchaSolver from "../src/captcha-solver";
import { getBrowser } from "../src/tik-report";
import { readJsonFile } from "../src/utils";


const ELEMENTS = readJsonFile('elements/captcha.json');


async function setUpBrowser(): Promise<{ browser: puppeteer.Browser, page: puppeteer.Page }> {
    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.goto(`https://www.tiktok.com/@barello_live/video/7229881406351019291`)
    return { browser, page };
}

describe('TikReport', () => {

    test('getCaptchaImage', async () => {
        const { browser, page } = await setUpBrowser();
        const image = await CaptchaSolver.getCaptchaImage(page);
        expect(image).toBeDefined();
        await browser.close();
    }, 300000);

    test('getSlider', async () => {
        const { browser, page } = await setUpBrowser();
        const slider = await CaptchaSolver.getSlider(page);
        expect(slider).toBeDefined();
        await browser.close();
    }, 300000);

    test('isElementPresent', async () => {
        const { browser, page } = await setUpBrowser();
        const isPresent = await CaptchaSolver.isElementPresent(page, ELEMENTS["dialog_xpath"]);
        expect(isPresent).toBeTruthy();
        await browser.close();
    }, 300000);
});