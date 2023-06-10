import puppeteer from "puppeteer";
import { Browser, Page } from "puppeteer";


async function getImage(browser: Browser, page: Page) {
    const slider = await page.$('.geetest_slider_button');
    if (!slider) {
        throw new Error('Captcha slider not found');
    }
    return slider;
}