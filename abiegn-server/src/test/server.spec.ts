const Request = require('request');
import 'jasmine';
const rp = require('request-promise');

describe("Server", () => {
    let server: any;

    beforeAll(async () => {
        server =require('../server');
        let ready = server['ready'];
        await ready;
    });

    afterAll(() => {
        server['cleanup']();
        server.close();
    });

    it("Server should be loaded", () => {
        expect(server).toBeTruthy();
    });

    const options = {
        uri: 'http://localhost:4200/nbi/autospecs',
        json: true
    };

    describe("GET /nbi/autospecs", () => {
        it("Should have more than 0 records", async () => {
            const data = await rp(options);
            expect(data.length).toBeGreaterThan(0);
        });
        it("Average roundtrip should be less than 100 ms", async () => {
            const times = 100;
            const startTime = new Date().getTime();

            for (let i = 0; i < times; i++) {
                const data = await rp(options);
            }

            const timeUsed = new Date().getTime() - startTime;
            console.log(`Total time used for ${times} visits: ${timeUsed}`);
            expect(timeUsed / times).toBeLessThan(100);
        });
    });
});