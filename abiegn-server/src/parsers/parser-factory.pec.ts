import { AutoSpec, MANUFACTURER } from './types';
import ParserFactory from './parser-factory';
import 'jasmine';

const resolve = require('path').resolve;

describe("Honda-2018-Accord", () => {
    it("Parser", () => {
        let htmlFile = resolve('./src/parsers/honda/2018_Honda_Accord.html');
        // console.log(JSON.stringify(htmlFile, null, 8));
        ParserFactory.parse(htmlFile, MANUFACTURER.HONDA, 2018).subscribe(
            spec => {
                console.log(JSON.stringify(spec, null, 8));
                expect(true).toBe(true);
            }
        );
    });
});
