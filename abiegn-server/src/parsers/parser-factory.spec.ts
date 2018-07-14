import { AutoSpec, MANUFACTURER } from './types';
import ParserFactory from './parser-factory';
import 'jasmine';

const resolve = require('path').resolve;

describe("Parser Factory", () => {
    describe("Honda 2018 Accord Parser", () => {
        let parsingResult: AutoSpec;
        beforeAll(done => {
            let htmlFile = resolve('./src/parsers/honda/2018_Accord.html');
            // console.log(JSON.stringify(htmlFile, null, 8));
            ParserFactory.parse(htmlFile, MANUFACTURER.HONDA, 2018).subscribe(
                spec => { parsingResult = spec; done(); }
            );
        });

        it("Returns result", () => {
            expect(parsingResult).toBeTruthy();
        });

    });
});
