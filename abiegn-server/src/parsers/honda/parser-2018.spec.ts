import { JSDOM } from 'jsdom';
import { AutoSpec, MANUFACTURER, Parser } from '../types';
import Parser2018 from './parser-2018';
import 'jasmine';
const fs = require('fs');
import * as Honda2018Accord from './2018_Honda_Accord.json';

const resolve = require('path').resolve;

const originaltimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

describe("Honda 2018 Accord", () => {
    let html: string; 
    let parser: Parser = new Parser2018();
    
    beforeAll((done) => {
        let htmlFile = resolve('./src/parsers/honda/2018_Honda_Accord.html');
        // console.log(htmlFile);
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
            // parser.event.subscribe(event => console.log(JSON.stringify(event, null, 4)));
            parser.parse(html).then( data => { spec = data; done()} );
        });

        it("Result is not null", () => {
            expect(spec).toBeTruthy();
        });

        it("Result is correct", () => {
            let answer = JSON.stringify(Honda2018Accord);
            let result = JSON.stringify(spec);
            expect(answer === result).toBeTruthy();
        });
    });
});

jasmine.DEFAULT_TIMEOUT_INTERVAL = originaltimeout;
