import { JSDOM } from 'jsdom';
import { AutoSpec, MANUFACTURER, Parser } from '../types';
// import Parser2018 from './parser-2018';
import 'jasmine';
const fs = require('fs');
const SupportConfig = require('./config.json');

const resolve = require('path').resolve;

const originaltimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

const years = Object.keys(SupportConfig);
for (let year of years) {
    const models = SupportConfig[year].models;
    const parserModule = SupportConfig[year].parser;

    describe(`Honda ${year} models`, () => {
        let parser: Parser;
        beforeAll((done) => {
            import(`./${parserModule}`).then( wrapper => {
                const Klazz = wrapper.default;
                parser = new Klazz(); 
                done();
            });
        });

        if (Array.isArray(models)) {
            for (let model of models) {
                describe(`Honda ${year} ${model}`, () => {
                    let html: string;

                    beforeAll((done) => {
                        let htmlFile = resolve(`./src/parsers/honda/${year}_${model}.html`);
                        // console.log(htmlFile);
                        fs.readFile(htmlFile, 'utf8', (err, text) => {
                            if (err) {
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
                            parser.parse(html).then(data => { spec = data; done() });
                        });

                        it("Result is not null", () => {
                            expect(spec).toBeTruthy();
                        });

                        it("Result is correct", () => {
                            const answerJson = require(`./${year}_${model}.json`);
                            let answer = JSON.stringify(answerJson);
                            let result = JSON.stringify(spec);
                            expect(answer === result).toBeTruthy();
                        });
                    });
                });
            }
        }
    });
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = originaltimeout;
