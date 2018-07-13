import { AutoSpec, MANUFACTURER, Parser } from '../types';
import Parser2018 from './parser-2018';
import 'jasmine';
const fs = require('fs');

const resolve = require('path').resolve;

describe("Honda 2018 Accord", () => {
    let html: string; 
    let parser: Parser = new Parser2018();
    
    beforeAll((done) => {
        let htmlFile = resolve('./src/parsers/honda/2018_Honda_Accord.html');
        console.log(htmlFile);
        fs.readFile(htmlFile, 'utf8', (err, text) => {
            if(err) {
                throw new Error(`Error reading file ${htmlFile}: ${err}`);
            }
            html = text;
            done();
        });
    });

    it("Can read the html file", () => {
        expect(html).toBeTruthy();
    });

    describe("Parser", () => {
        let spec: AutoSpec;
        
        beforeAll((done) => {
            parser.parse(html).then( data => { spec = data; done()} );
        });

        it("Result is not null", () => {
            expect(spec).toBeTruthy();
        });
    });
});
