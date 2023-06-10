import {
    readProxyList,
    isValidProxy,
    getBrowser
} from '../src/tik-report';


describe('TikReport', () => {

    test('readProxyList', () => {
        const list = readProxyList('proxies.txt');
        expect(list).toBeDefined();
        expect(list.length).toBeGreaterThan(0);
    });

    test('isValidProxy', () => {
        expect(isValidProxy('')).toBeFalsy();
        expect(isValidProxy('192.168.2.1')).toBeFalsy();
        expect(isValidProxy(':8080')).toBeFalsy();
        expect(isValidProxy('192.168.2.1:8080')).toBeTruthy();
    });

    test('getBrowser', async () => {
        const proxy = '47.252.27.174:18081';
        const browser = await getBrowser(proxy);
        expect(browser).toBeDefined();
        await browser.close();
    });
});
