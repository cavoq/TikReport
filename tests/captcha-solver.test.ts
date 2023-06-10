import {
    getCaptchaImage
} from "../src/captcha-solver";
import { getBrowser } from "../src/tik-report";


describe('TikReport', () => {

    test('getCaptchaImage', async () => {
        const browser = await getBrowser('random');
        try {
            const page = await browser.newPage();
            await page.goto(`https://www.tiktok.com/@barello_live/video/7229881406351019291`)
            const image = await getCaptchaImage(page);
            expect(image).toBeDefined();
            await browser.close();
        } catch (error) {
            await browser.close();
            throw error;
        }
    }, 300000);
});