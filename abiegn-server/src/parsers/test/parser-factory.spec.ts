import { AutoSpec, MANUFACTURER } from '../types';
import ParserFactory from '../parser-factory';
import 'jasmine';

const resolve = require('path').resolve;

describe("Parser Factory", () => {
    describe("Honda 2018 Accord Parser", () => {
        let parsingResult: AutoSpec;
        beforeAll(done => {
            let htmlFile = resolve('./src/parsers/honda/test/data/2018_Accord.html');

            ParserFactory.parse(htmlFile, MANUFACTURER.HONDA, 2018).then(spec => {
                parsingResult = spec; done();
            });
        });

        it("Returns result", () => {
            expect(parsingResult).toBeTruthy();
        });

    });
});
