import {
    getCaptchaImage
} from "../src/captcha-solver";
import { getBrowser } from "../src/tik-report";


describe('TikReport', () => {

    test('getCaptchaImage', async () => {
        const browser = await getBrowser('random');
        const page = await browser.newPage();
        const image = await getCaptchaImage(browser, page);
        expect(image).toBeDefined();
        await browser.close();
    });
});