import { readJsonFile } from "../src/utils";


describe('Utils', () => {

    test('readJsonFile', () => {
        const data = readJsonFile('config.json');
        expect(data).toBeDefined();
        expect(data).toHaveProperty('proxies');
    });
});