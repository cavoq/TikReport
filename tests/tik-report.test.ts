import * as TikReport from "../src/tik-report";


describe('TikReport', () => {

    test('readProxyList', () => {
        const list = TikReport.readProxyList('proxies.txt');
        expect(list).toBeDefined();
        expect(list.length).toBeGreaterThan(0);
    });

    test('isValidProxy', () => {
        expect(TikReport.isValidProxy('')).toBeFalsy();
        expect(TikReport.isValidProxy('192.168.2.1')).toBeFalsy();
        expect(TikReport.isValidProxy(':8080')).toBeFalsy();
        expect(TikReport.isValidProxy('192.168.2.1:8080')).toBeTruthy();
    });

    test('getBrowser', async () => {
        const proxy = '47.252.27.174:18081';
        const browser = await TikReport.getBrowser(proxy);
        expect(browser).toBeDefined();
        await browser.close();
    });
});
