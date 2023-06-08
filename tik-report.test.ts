import { readJsonFile, readProxyList } from './tik-report';

describe('TikReport', () => {
    test('readJsonFile', () => {
        const data = readJsonFile('config.json');
        expect(data).toBeDefined();
        expect(data).toHaveProperty('proxies');
    }
    );
    test('readProxyList', () => {
        const list = readProxyList('proxies.txt');
        expect(list).toBeDefined();
        expect(list.length).toBeGreaterThan(0);
    });
});
